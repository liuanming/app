var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var picturesSchema = new Schema({
    "id": Number,
    "title": String,
    "img_url": [
        {
            "id": Number,
            "src": String
        }
    ]
});

module.exports = mongoose.model("Picture", picturesSchema);