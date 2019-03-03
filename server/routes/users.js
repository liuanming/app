var express = require("express");
var router = express.Router();
var User = require("./../models/users");
var Goods = require('./../models/goodslists');

//登录
router.post("/login", function (req, res) {
    var param = {
        userName: req.body.userName,
        userPwd: req.body.userPwd
    };

    User.findOne(param, function (err, doc) {
        if (err) {
            res.json({
                status: "1",
                msg: err.message,
                result: ""
            })
        } else {
            if (!doc) {
                res.json({
                    status: "100",
                    msg: "用户或密码错误",
                    result: ""
                })
            } else {
                res.cookie()
                req.session.user = doc;
                req.session.userId = doc.userId;
                res.json({
                    status: "0",
                    msg: "",
                    result: req.session.user
                })
            }
        }
    })

});

//退出
router.post("/logout", function (req, res) {
    req.session.user = null;
    req.session.userId = null;
    res.json({
        status: "0",
        msg: "",
        result: ""
    })
});

//拦截登录
router.post("/checklogin", function (req, res) {
    if (req.session.user) {
        res.json({
            status: "0",
            msg: "登录状态",
            result: req.session.user
        })
    } else {
        res.json({
            status: "1",
            msg: "未登录",
            result: ""
        })
    }
});


//加入购物车
router.post("/addcart", function (req, res) {
    var userId = req.session.userId;
    var goodsid = req.body.id;
    var num = parseInt(req.body.num);

    User.findOne({userId: userId}, function (usererr, userdoc) {
        if (usererr) {
            res.json({
                status: "1",
                msg: usererr.message,
                result: ""
            })
        } else {
            if (userdoc) {
                var goodsitem = "";
                userdoc.cartList.forEach(function (item) {
                    if (item.id == goodsid) {
                        goodsitem = item;
                        item.productNum = parseInt(item.productNum) + num
                    }
                });
                if (goodsitem) {
                    userdoc.save(function (err, doc) {
                        if (err) {
                            res.json({
                                status: "1",
                                msg: err.message,
                                result: ""
                            })
                        } else {
                            res.json({
                                status: "0",
                                mgs: "添加成功"
                            })
                        }
                    })
                } else {
                    Goods.findOne({id: goodsid}, function (goodserr, goodsdoc) {
                        if (goodserr) {
                            res.json({
                                status: "1",
                                msg: goodserr.message,
                                result: ""
                            })
                        } else {
                            var arr = {
                                id: goodsdoc.id,
                                title: goodsdoc.title,
                                sell_price: goodsdoc.sell_price,
                                stock_quantity: goodsdoc.stock_quantity,
                                img_url: goodsdoc.img_url,
                                productNum: 1,
                                checked: 1
                            };
                            userdoc.cartList.push(arr);
                            userdoc.save(function (err2, doc2) {
                                if (err2) {
                                    res.json({
                                        status: "1",
                                        msg: err2.message
                                    })
                                } else {
                                    res.json({
                                        status: "0",
                                        msg: "",
                                        result: ""
                                    })
                                }
                            })

                        }
                    })
                }
            } else {
                res.json({
                    status: "10003",
                    msg: "发生错误。。",
                    result: ""
                })
            }
        }
    })
});


//获取购物车列表数据
router.post("/cartlist", function (req, res) {
    var userId = req.session.userId;

    User.findOne({userId: userId}, function (err, doc) {
        if (err) {
            res.json({
                status: "1",
                msg: "",
                result: ""
            })
        } else {
            res.json({
                status: "0",
                msg: "",
                result: doc.cartList
            })
        }
    })
});


//购物车商品数量的改变
router.post("/cartchange", function (req, res) {
    var userId = req.session.userId;
    var id = req.body.id;
    var leix = req.body.leix;

    User.findOne({userId: userId}, function (err, doc) {
        if (err) {
            res.json({
                status: "1",
                msg: err.message,
                result: ""
            })
        } else {
            if (leix == "reduce") {
                doc.cartList.forEach(function (item) {
                    if (item.id == id) {
                        item.productNum--
                    }
                });
            } else {
                doc.cartList.forEach(function (item) {
                    if (item.id == id) {
                        item.productNum++
                    }
                });
            }
            doc.save(function (err1, doc1) {
                if (err1) {
                    res.jso({
                        status: "1",
                        msg: err1.message,
                        result: ""
                    })
                } else {
                    var number = 0;
                    var xuannumber = 0;
                    var he = 0;
                    doc1.cartList.forEach(item => {
                        number += parseInt(item.productNum)
                    });
                    doc1.cartList.forEach(item => {
                        if (item.checked == "1") {
                            xuannumber += parseInt(item.productNum);
                            he += parseInt(item.sell_price) * parseInt(item.productNum)
                        }
                    });
                    res.json({
                        status: "0",
                        msg: "",
                        result: {
                            number: number,
                            xuannumber: xuannumber,
                            he: he
                        }
                    })
                }
            })
        }
    })

});

//购物车选中状态情况
router.post("/carcheck", function (req, res) {
    var userId = req.session.userId;
    var id = req.body.id;

    User.findOne({userId: userId}, function (err, doc) {
        if (err) {
            res.json({
                status: "1",
                msg: err.message,
                result: ""
            })
        } else {
            doc.cartList.forEach(item => {
                if (item.id == id) {
                    if (item.checked == 1) {
                        item.checked = 0
                    } else {
                        item.checked = 1
                    }
                }
            });
            doc.save(function (err1, doc1) {
                if (err1) {
                    res.json({
                        status: "1",
                        msg: err1.message,
                        result: ""
                    })
                } else {
                    var xuannumber = 0;
                    var he = 0;
                    doc1.cartList.forEach(item => {
                        if (item.checked == "1") {
                            xuannumber += parseInt(item.productNum);
                            he += parseInt(item.sell_price) * parseInt(item.productNum)
                        }
                    });
                    res.json({
                        status: "0",
                        msg: "",
                        result: {
                            xuannumber: xuannumber,
                            he: he
                        }
                    })
                }
            })
        }

    })
});

//删除购物车
router.post("/deletecart", function (req, res) {
    var userId = req.session.userId;
    var id = req.body.id;

    User.update({userId: userId}, {$pull: {'cartList': {'id': id}}}, function (err, doc) {
        if (err) {
            res.json({
                status: "1",
                msg: err.message,
                result: ""
            })
        } else {
            res.json({
                status: "0",
                msg: "",
                result: ""
            })
        }
    })
});
module.exports = router;