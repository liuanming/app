var express = require("express");
var router = express.Router();
var Goods = require('./../models/goodslists');

//获取商品列表
router.get("/goodslist", function (req, res) {
    Goods.find({}, function (err, doc) {
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
                result: doc
            })
        }
    })
});

//获取详情商品数据
router.get("/goodsinfo", function (req, res) {
    var id = req.param("id");

    Goods.findOne({id: id}, function (err, doc) {
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
                result: doc
            })
        }
    })
});
module.exports = router;