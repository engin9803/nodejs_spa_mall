const mongoose = require("mongoose");
const goodsSchema = mongoose.Schema({
    goodsId: {
        type : Number,
        require : true,
        unique : true,
    },
    name: {
        type: String,
        require : true,
        unique : true,
    },
    thumbnailUrl: {
        type: String,
    },
    category : {
        type: String,
    },
    price : {
        type: String,
    }
});

module.exports = mongoose.model("Goods", goodsSchema);