const mongoose = require("mongoose");

const connect = () => {                                //, ignoreUndefined: true undefined를 무시하라 
    mongoose.connect("mongodb://localhost:27017/spa_mall", { ignoreUndefined: true }).catch((err) => {
        console.error(err);
    });
};

// mongoose.connect.on("error", err => {
//     console.error("몽고디비 연결 에러", err);
// });
module.exports = connect;