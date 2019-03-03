var express = require("express");
var router = express.Router();
var News = require("./../models/news");
var NewsInfo = require("./../models/newsinfo");
var Commens = require("./../models/commens");
require("./../util/util");


// 获取新闻页面数据
router.get("/newslist", function (req, res) {
    News.find(function (err, doc) {
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

//获取详情新闻页面数据
router.get("/newsinfo", function (req, res) {
    var id = req.param("id");
    if (id) {
        News.findOne({id: id}, function (err, doc) {
            if (err) {
                res.json({
                    status: "1",
                    msg: err.message,
                    result: ""
                })
            } else {
                NewsInfo.findOne({id: doc.id}, function (errinfo, docinfo) {
                    if (errinfo) {
                        res.json({
                            status: "1",
                            msg: errinfo.message,
                            result: ""
                        })
                    } else {
                        var result = {};
                        result.id = docinfo.id;
                        result.title = doc.title;
                        result.click = doc.click;
                        result.add_time = doc.add_time;
                        result.content = docinfo.content;
                        res.json({
                            status: "0",
                            msg: "",
                            result: result
                        })
                    }
                })
            }
        })
    } else {
        res.json({
            status: "10001",
            msg: "没有此条新闻"
        })
    }


});

//获取评论数据
router.get("/comment", function (req, res) {
    var createDate = new Date().Format("yyyy-MM-dd");
    var id = req.param("id");

    let page = parseInt(req.param("page"));
    let skip = (page - 1) * 8;
    let params = {
        id: id
    };
    Commens.find(params).skip(skip).limit(8).exec({}, function (err, doc) {
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

//发表评论
// router.post("/publishcomment", function (req, res, next) {
//     var comment = req.body.comment;
//     var Id = parseInt(req.body.Id);
//
//     var createDate = new Date().Format("yyyy-MM-dd hh:mm:ss");
//
//     Commens.save({
//         id: Id,
//         user_name: "匿名用户",
//         add_time: createDate,
//         content: comment
//     }, function (err, doc) {
//         if (err) {
//             res.json({
//                 status: "1",
//                 msg: "",
//                 result: ""
//             })
//         } else {
//             res.json({
//                 status: "0",
//                 msg: "",
//                 result: doc
//             })
//         }
//     })
//
// });


module.exports = router;