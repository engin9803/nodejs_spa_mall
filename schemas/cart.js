const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
    goodsId: {
        type: Number,
        required : true,
        unique : true
    },
    quantity:{
        type : Number,
        required : true
    }
});
// module.exports 라우터폴더안에 carts.js에서 불러오기 위해 사용 const Carts = require("../schemas/cart");
module.exports = mongoose.model("Cart", cartSchema);