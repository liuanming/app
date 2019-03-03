var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var goodslistsSchema = new Schema({
    "id": Number,
    "title": String,
    "sell_price": Number,
    "market_price": Number,
    "stock_quantity": Number,
    "img_url": String,
    "productNum": String,
    "checked": String,
    "images": [
        {
            "src": String
        }
    ],
    "details": [
        {
            "id": Number,
            "title": String,
            "add_time": String,
            "goods_no": String,
            "sell_price": Number,
            "market_price": Number,
            "stock_quantity": Number
        }
    ]
});

module.exports = mongoose.model("Goodslist", goodslistsSchema);