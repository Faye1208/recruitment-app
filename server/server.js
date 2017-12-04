const express = require('express');
// 引入分路由
const userRouter = require('./user');
const app = express();

// app.use开启中间件，如果中间件是路由：
// 第一个参数定义一个url前缀(字符串类型),
// 第二个参数传入的路由作为第一个参数的子路由
// 因此，访问localhost:9093/user/info,即可看见userRouter返回的信息
app.use('/user', userRouter);
app.listen(9093, function () {
    console.log("server port at 9093");
});