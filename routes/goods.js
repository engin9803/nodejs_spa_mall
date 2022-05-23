// express 생성
const express = require("express");
const Goods = require("../schemas/goods");
const Cart = require("../schemas/cart");
// 라우터 생성
const router = express.Router();

router.get("/", (req, res) => {
  res.send("this is root page")
});

// router.get 제품전체조회
//          /api/goods
router.get("/goods", async (req, res) => {
  const { category } = req.query
  // 필터링 기능
  const goods = await Goods.find({ category });
  res.json({
    goods,
  });
});

// router.get 제품상세조회
//          /goods/abcd <= abcd부분이 :goodsId에 접근할 곳
router.get("/goods/:goodsId", async (req, res) => {
  const { goodsId } = req.params;
  // goodsId 가 params(파라미터)로 넘어오는것은 문자열이 되서 숫자형인 Number(goodsId)을 넣어줘야 숫자형끼리 비교해서 가져올 수 있음
  // find는 프로미스 객체 이기때문 await을 써야 하고 await을 쓰기위해선 router.get부분에 async를 사용한다.
  const [detail] = await Goods.find({ goodsId: Number(goodsId) });
  res.json({
    detail,
  });
});
// 장바구니 상품 추가 기능
router.post("/goods/:goodsId/cart", async(req,res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;

  // 장바구니내에 중복검사
  const existsCarts = await Cart.find({ goodsId: Number(goodsId) });
  if (existsCarts.length) {
    return res.status(400).json({ success: false, errorMessage: "이미 장바구니에 들어있는 상품입니다." });
  }
  // 장바구니 상품 추가
  await Cart.create({ goodsId: Number(goodsId), quantity });
  res.json({ success: true });
});
// 장바구니 상품 삭제 기능
router.delete("/goods/:goodsId/cart", async(req,res) => {
  const { goodsId } = req.params;
  
  // 장바구니내에 중복검사
  const existsCarts = await Cart.find({ goodsId: Number(goodsId) });
  if (existsCarts.length) {
    await Cart.deleteOne({ goodsId: Number(goodsId) });
  }

  res.json({ success: true });
});
//장바구니 상품 전체 수정기능 PUT   patch사용시 일부 수정
router.put("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;

  const existsCarts = await Cart.find({ goodsId: Number(goodsId) });

  if (quantity < 1) {
    return res.status(400).json({ success: false, errorMessage: "장바구니 수량이 1미만입니다."});
  }

  if (!existsCarts.length) {
    return res.status(400).json({ success: false, errorMessage: "장바구니에 해당 상품이 없습니다." });
  }
                                                    // $set은 몽고DB에서 사용하는 관행
  await Cart.updateOne({ goodsId: Number(goodsId) }, { $set: { quantity } });

  res.json({ success: true });
})

// router.post 제품생성
router.post("/goods", async (req, res) => {
  const { goodsId, name, thumbnailUrl, category, price } = req.body;

  const goods = await Goods.find({ goodsId });
  // if(goods.) 이면 배열로 넘어오게 되어 if (goods.length) <= 1이면 있고 0이면 없다
  if (goods.length) {
    return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터 입니다." });
  }

  const createdGoods = await Goods.create({ goodsId, name, thumbnailUrl, category, price });

  res.json({ goods });
});

// express 생성
// const express = require("express");
// const Goods = require("../schemas/goods");
// // ../ <= router폴더 안에서 나간다는 의미 이고 /schemas/cart 경로로 가서 파일을 가져오는 기능 
// const Carts = require("../schemas/cart");
// // 라우터 기능 생성
// const router = express.Router();

router.get("/goods/cart", async (req, res) => {
    const carts = await Cart.find();
    // goodsIds goodsId들을 가져와줌
    const goodsIds = carts.map((cart) => cart.goodsId);
    // find({}) 를 사용하면 배열로 변하여 여러개를 찾아줌
    const goods = await Goods.find({ goodsId: goodsIds });

    res.json({
        // carts 라는 키에다가 데이터를 내보냄
        carts: carts.map((cart) => ({
                quantity: cart.quantity,
                goods: goods.find((item) => item.goodsId === cart.goodsId),
                    // item.goodsId === cart.goodsId 아래와 같은 의미
                    // return item.goodsId === cart.goodsId;
                // }),
        })),
    })
});
// 라우터 내보내는 기능
module.exports = router;