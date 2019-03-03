var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var usersSchema = new Schema({
    "userId": String,
    "userName": String,
    "userPwd": Number,
    "user_img": String,
    "cartList": [
        {
            "id": Number,
            "title": String,
            "sell_price": Number,
            "stock_quantity": Number,
            "img_url": String,
            "productNum": String,
            "checked": String
        }
    ]
});

module.exports = mongoose.model("User", usersSchema);