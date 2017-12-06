// 跟用户相关的全部express接口都放在user.js
const express = require('express');
// 先拆分express.Router，然后在统一引入server.js
const Router = express.Router();
// 引入model
const model = require('./model');
const User = model.getModel('user');

// 调试列表
Router.get('/list', function (request, response) {
    User.find({}, function (err, doc) {
        return response.json(doc);
    })
});

Router.post('/register', function (request, response) {
    if(!request.body){
        return res.sendStatus(400);
    }
    console.log(request.body);
    const { user, pwd, type } = request.body;
    // 先查找一下数据库是否存在这个用户
    User.findOne({user}, function (err, doc) {
        // 如果存在就返回用户名已被使用
        if (doc) {
            return response.json({code: 1, msg: '用户名已被使用'});
        }
        // 如果找不到就创建这个用户数据
        User.create({user, pwd, type}, function (err, doc) {
            if (err) {
                return response.json({code: 1, msg: '后端出错'})
            }
            // code:0表示用户登录成功
            return response.json({code: 0});
        });
    });
});

Router.get('/info', function (req, res) {
    // 需要校验用户有没有cookie
    return res.json({code: 0});
});

module.exports = Router;