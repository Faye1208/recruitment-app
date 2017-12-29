// 操作数据库的都认为是一个模型的概念
const mongoose = require('mongoose');
const DB_URL = 'mongodb://127.0.0.1:27017/recruitment';
mongoose.connect(DB_URL, {
    useMongoClient: true
});

// 设计字段
const models = {
    user: {
        'user': {type: String, require: true},
        'pwd': {type: String, require: true},
        // 牛人或者boss
        'type': {type: String, require: true},
        // 头像
        'avatar': {type: String},
        // 简介
        'desc': {type: String},
        // 职位名称
        'title': {type: String},

        // 公司特有的两个字段
        'company': {type: String},
        // 薪酬
        'money': {type: String}
    },
    chat:{
        // 标识两个人的聊天信息
        'chatid':{type: String, require: true},
        // 'from'从哪个用户发出来
        'from': {type: String, require: true},
        // 'to'发给哪个用户
        'to': {type: String, require: true},
        // 信息是否已读，只对'to'的user设置
        'read': {type: Boolean, require: false},
        // 信息的内容
        'content': {type: String, require: true, default: ''},
        // 按照时间先后顺序排列信息
        'create_time': {type: Number, default: new Date().getTime()}
    }
};

// 批量生成模型
for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

// mongoose工具函数库
module.exports = {
    getModel: function (name) {
        return mongoose.model(name)
    }
};