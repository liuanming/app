var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var lbtSchema = new Schema({
    "img_url": String,
});

module.exports = mongoose.model("Lunbotu", lbtSchema);