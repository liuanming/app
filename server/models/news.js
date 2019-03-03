var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var newsSchema = new Schema({
    "id": Number,
    "title": String,
    "add_time": String,
    "zhaiyao": String,
    "click": Number,
    "img_url": String
});

module.exports = mongoose.model("New", newsSchema);