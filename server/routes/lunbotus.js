var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var lunbotus = require("./../models/lunbotus");
mongoose.connect("mongodb://127.0.0.1:27017/myapp");
/* GET home page. */
router.get('/list', function (req, res, next) {
    lunbotus.find(function (err, doc) {
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
