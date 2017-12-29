const express = require('express');
// 使用请求体解析中间件
const bodyParser = require('body-parser');
// 中间件，可以使用cookie
const cookieParser = require('cookie-parser');
// 引入分路由
const userRouter = require('./user');
// 创建express实例app
const app = express();
// 使用中间件bodyParser，从而可以解析post传过来的json参数
app.use(bodyParser.json());
// 使用中间件cookieParser，从而可以解析cookie
app.use(cookieParser());
/*
 * app.use开启中间件，如果中间件是路由：
 * 第一个参数定义一个url前缀(字符串类型),
 * 第二个参数传入的路由作为第一个参数的子路由
 * 因此，访问localhost:9093/user/info,即可看见userRouter返回的信息
 */
app.use('/user', userRouter);

// 引入第三方库socket.io,如果socket.io只是单独存在，这么写即可
// const io = require('socket.io');

// work with express
/*
 * socket.io需要和express配合，
 * 就需要把socket.io的接口和http的接口相互统一起来
 */
// http是默认自带的
const server = require('http').Server(app);
const io = require('socket.io')(server);
const Model = require('./model');
const Chat = Model.getModel('chat');
// Chat.remove({},function (err,doc) {
//
// });

/*
 * 监听连接成功以后执行一个callback，
 * callback中的参数socket是一个当前连接，而io是一个全局的连接
 */
io.on('connection', function (socket) {
    // 连接成功的调试信息
    console.log('user login');
    // 监听sendmsg,data为接收的数据
    socket.on('sendmsg', function (data) {
        console.log(data);
        const {from, to, msg} = data;
        const chatid = [from, to].sort().join('_');
        Chat.create({chatid, from, to, content: msg}, function (err, doc) {
            io.emit('receivemsg', Object.assign({}, doc._doc));
        });
        // io.emit('receive-msg', data);
    });
});

// 把app.listen()改为server.listen()
// app.listen(9093, function () {
//     console.log("server port at 9093");
// });

server.listen(9093, function () {
    console.log("server port at 9093");
});