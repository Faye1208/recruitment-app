// 跟用户相关的全部express接口都放在user.js
const express = require('express');
// 先拆分express.Router，然后在统一引入server.js
const Router = express.Router();

Router.get('/info', function (req, res) {
    // 需要校验用户有没有cookie
    return res.json({code: 0});
});

module.exports = Router;