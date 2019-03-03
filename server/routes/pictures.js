var express = require("express");
var router = express.Router();
var Pictures = require("./../models/pictures");

//获取图片标题
router.get("/picturestitle", function (req, res) {
    Pictures.find({}, function (err, doc) {
        if (err) {
            res.json({
                status: "1",
                msg: err.message,
                result: ""
            })
        } else {
            var result = [];
            doc.forEach(item => {
                var arr = {
                    title: item.title,
                    id: item.id
                };
                result.push(arr)
            });
            res.json({
                status: "0",
                msg: "",
                result: result
            })
        }

    })
});

//获取图片
router.get("/pictureslist", function (req, res) {
    var id = parseInt(req.param("id"));
    console.log(id);

    if (id == 0) {
        Pictures.find({}, function (err1, doc1) {
            if (err1) {
                res.json({
                    status: "1",
                    msg: err1.message,
                    result: ""
                })
            } else {
                var arr = [];
                var image = [];
                doc1.forEach(function (item) {
                    image = item.img_url;
                    arr = arr.concat(image);
                });

                res.json({
                    status: "0",
                    msg: "",
                    result: arr
                })
            }
        })
    } else {
        Pictures.findOne({id: id}, function (err2, doc2) {
            if (err2) {
                res.json({
                    status: "1",
                    msg: err2.message,
                    result: ""
                })
            } else {
                res.json({
                    status: "0",
                    msg: "",
                    result: doc2.img_url
                })
            }
        })
    }


});
module.exports = router;