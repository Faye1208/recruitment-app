// 操作数据库的都认为是一个模型的概念
const mongoose = require('mongoose');
const DB_URL = 'mongodb://127.0.0.1:27017/recruitment';
mongoose.connect(DB_URL, {
    useMongoClient: true
});