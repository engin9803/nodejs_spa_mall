const express = require("express");
const connect = require("./schemas");
const app = express();
const port = 3000;

connect();

const goodsRouter = require("./routes/goods");
// const cartsRoter = require("./routes/carts")

const requestMiddleware = (req, res, next) => {
    console.log("Request URL:", req.originalUrl, " - ", new Date());
    next();
}

app.use(express.static("static"));
app.use(express.json());
app.use(express.urlencoded());
app.use(requestMiddleware);
// /api가 맞게 되면 미들웨어 goodsRouter, cartsRouter를 불러오고 배열 인덱스 순서대로 출력
app.use("/api", [goodsRouter]);

app.get("/", (req, res) => {
    res.send("Hello World@@@@");
});

app.listen(port, () => {
    console.log(port, "포트로 서버가 커졌어요!")
});
