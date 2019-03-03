var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var newsinfoSchema = new Schema({
    "id": Number,
    "title": String,
    "click": Number,
    "add_time": String,
    "content": String,
    "comment": [
        {
            "user_name": String,
            "add_time": String,
            "content": String
        }
    ]
});

module.exports = mongoose.model("Newsinfo", newsinfoSchema);