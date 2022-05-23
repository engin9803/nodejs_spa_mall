// // express 생성
// const express = require("express");
// const Goods = require("../schemas/goods");
// // ../ <= router폴더 안에서 나간다는 의미 이고 /schemas/cart 경로로 가서 파일을 가져오는 기능 
// const Carts = require("../schemas/cart");
// // 라우터 기능 생성
// const router = express.Router();

// router.get("/goods/carts", async (req, res) => {
//     const carts = await Carts.find();
//     // goodsIds goodsId들을 가져와줌
//     const goodsIds = carts.map((cart) => cart.goodsId);
//     // find({}) 를 사용하면 배열로 변하여 여러개를 찾아줌
//     const goods = await Goods.find({ goodsId: goodsIds });

//     res.json({
//         // carts 라는 키에다가 데이터를 내보냄
//         carts: carts.map((cart) => ({
//                 quantity: cart.quantity,
//                 goods: goods.find((item) => item.goodsId === cart.goodsId),
//                     // item.goodsId === cart.goodsId 아래와 같은 의미
//                     // return item.goodsId === cart.goodsId;
//                 // }),
//         })),
//     })
// });
// // 라우터 내보내는 기능
// module.exports = router;