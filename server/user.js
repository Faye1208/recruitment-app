// 跟用户相关的全部express接口都放在user.js
const express = require('express');
// 先拆分express.Router，然后在统一引入server.js
const Router = express.Router();
// 引入model
const model = require('./model');
const User = model.getModel('user');
const utils = require('utility');
// 定义一个统一的查询条件，把不想显示的字段过滤掉其中'__v'是文档的版本号
const _filter = {'pwd': 0, '__v': 0};

// 调试列表
Router.get('/list', function (request, response) {
    // User.remove({} ,function (err,doc) {});
    User.find({}, function (err, doc) {
        return response.json(doc);
    })
});

Router.post('/login', function (request, response) {
    const {user, pwd} = request.body;
    // 添加一个{pwd: 0}的对象，返回的查询数据就不会显示pwd
    User.findOne({user, pwd: md5Pwd(pwd)}, _filter, function (err, doc) {
        if (!doc) {
            return response.json({code: 1, msg: '用户名或密码错误'});
        }
        // 写入cookie，定义一个usrid的cookie
        response.cookie('userid', doc._id);
        return response.json({code: 0, data: doc});
    })
});

Router.post('/register', function (request, response) {
    // if(!request.body){
    //     return res.sendStatus(400);
    // }
    console.log(request.body);
    const {user, pwd, type} = request.body;
    // 先查找一下数据库是否存在这个用户
    User.findOne({user}, function (err, doc) {
        // 如果存在就返回用户名已被使用
        if (doc) {
            return response.json({code: 1, msg: '用户名已被使用'});
        }
        // 如果找不到就创建这个用户数据
        // User.create({user, pwd: md5Pwd(pwd), type}, function (err, doc) {
        //     if (err) {
        //         return response.json({code: 1, msg: '后端出错'})
        //     }
        //     // code:0表示用户登录成功
        //     return response.json({code: 0});
        // });
        // 换一个创建数据的方法，create()方法是在创建数据以后才具有id的，所以无法拿到id
        const userModel = new User({user, pwd: md5Pwd(pwd), type});
        userModel.save(function (err, doc) {
            if (err) {
                return response.json({code: 1, msg: '后端出错'})
            }
            const {user, type, _id} = doc;
            response.cookie('useid', _id);
            return response.json({code: 0, data: {user}});

        });
    });
});

Router.get('/info', function (request, response) {
    // 需要校验用户有没有cookie，读取cookie
    const {userid} = request.cookies;
    if (!userid) {
        return res.json({code: 1});
    }
    // 或者使用findById()
    User.findOne({_id: userid}, _filter, function (err, doc) {
        if (err) {
            return response.json({code: 1, msg: '后端出错了'})
        }
        if (doc) {
            return response.json({code: 0, data: doc})
        }
    });
});

// 密码加密
function md5Pwd (pwd) {
    // salt也可以使用随机函数生成一堆随机字符串
    const salt = 'recruitment_app_678459320133@#$%!^&*&^%%$##*&@';
    return utils.md5(utils.md5(pwd + salt));
}

module.exports = Router;