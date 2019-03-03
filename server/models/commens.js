var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commensSchema = new Schema({
    "id": Number,
    "user": String,
    "add_time": String,
    "content": String
});

module.exports = mongoose.model("Commen", commensSchema);