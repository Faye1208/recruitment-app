// 操作数据库的都认为是一个模型的概念
const mongoose = require('mongoose');
const DB_URL = 'mongodb://127.0.0.1:27017/recruitment';
mongoose.connect(DB_URL, {
    useMongoClient: true
});

// 设计字段
// 创建模型
const models = {
    user: {
        'user': {type: String, require: true},
        'pwd': {type:String,require:true},
        // 牛人或者boss
        'type':{type:String,require:true},
        // 头像
        'avatar':{type:String},
        // 简介
        'desc':{type:String},
        // 职位名称
        'title':{type:String},

        // 公司特有的两个字段
        'company':{type:String},
        // 薪酬
        'money':{type:String}
    },
    chat: {}
};
// mongoose.model()

// 批量生成模型
for(let m in models){
    mongoose.model(m, new mongoose.Schema(models[m]))
}

// mongoose 工具函数库
module.exports = {
    getModel:function (name) {
        return mongoose.model(name)
    }
};