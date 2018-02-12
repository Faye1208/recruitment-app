import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';
import Logo from '../../component/logo/logo';
import {login} from '../../redux/user.redux';
import appForm from '../../component/appForm/appForm';
import '../../index.css';

// 函数式编程的示例代码
// 一、理解函数式编程和装饰器模式
// function hello () {
//      console.log('hello react!');
//   }
//
// hello();
// function WrapperHello (fn) {
//     return function () {
//         console.log('before hello');
//         fn();
//         console.log('after hello');
//     };
// }

// 装饰器模式，一般写法
// hello = WrapperHello(hello);
// hello();

// ------------------------------------------------------


// 二、实现高阶组件
// class Hello extends Component{
//     render(){
//         return (<h3>Hello React!</h3>);
//     }
// }
// 高阶组件
// function WrapHello (Comp) {
//     class WrapComp extends Component{
//         render(){
//             return (
//                 <div>
//                     <p>高阶组件的元素</p>
//                     <Comp {...this.props} />
//                 </div>
//             );
//         }
//     }
//     return WrapComp;
// }
// 把装饰器模式的一般写法
// Hello = WrapHello(Hello);

// ------------------------------------------------------


// 三、使用'@'改写高阶组件
// 高阶组件
// function WrapHello (Comp) {
//     class WrapComp extends Component{
//         render(){
//             return (
//                 <div>
//                     <p>高阶组件的元素</p>
//                     <Comp {...this.props} />
//                 </div>
//             );
//         }
//     }
//     return WrapComp;
// }
//
// @WrapHello
// class Hello extends Component{
//     render(){
//         return (<h3>Hello React!</h3>);
//     }
// }

// ------------------------------------------------------


// 四、实现属性代理的高阶组件，
// 可以在Comp组件里面加一些属性，
// 或者在Comp组件的上下位置添加任意元素，
// 就是重新封装Comp组件
// function WrapHello (Comp) {
//     class WrapComp extends Component{
//         render(){
//             return (
//                 <div>
//                     <p>高阶组件的元素</p>
//                     <Comp name="hi" {...this.props} />
//                     <h3>高阶组件的标题</h3>
//                 </div>
//             );
//         }
//     }
//     return WrapComp;
// }
//
// @WrapHello
// class Hello extends Component{
//     render(){
//         return (<h3>Hello React!</h3>);
//     }
// }

// ------------------------------------------------------
// 五、实现反向继承的高阶组件，
// 把组件内要返回的组件的继承关系从React.Component转到传入的组件
// 改写以后的整个组件与传入组件的关系是继承关系，而不是代理关系
// 从而可以改变返回组件的生命周期，修改渲染逻辑，修改渲染流程
// function WrapHello (Comp) {
//     class WrapComp extends Comp {
//         componentDidMount () {
//             console.log('高阶组件新增的生命周期，加载完成');
//         }
//         render () {
//             return (
//                 <Comp />
//             );
//         }
//     }
//     return WrapComp;
//
// }
//
// @WrapHello
// class Hello extends Component {
//     render () {
//         return (<h3>Hello React!</h3>);
//     }
// }

@connect(
    state => state.user,
    {login}
)

@appForm

class Login extends Component {
    constructor (props) {
        super(props);
        // this.state = {
        //     user: '',
        //     pwd: ''
        // };
        // 用bind的话性能会好一些,也可以直接传入一个箭头函数，但是箭头函数每次加载页面都会生成一个新的函数
        this.register = this.register.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    // handleChange (key, val) {
    //     this.setState({
    //         // key是一个变量，要记得加中括号
    //         [key]: val
    //     });
    // }

    handleLogin () {
        this.props.login(this.props.state);
    }

    register () {
        // console.log(this.props);
        this.props.history.push('/register');
    }

    render () {
        return (
            <div className="login-container-wrapper">
                {/*测试组件*/}
                {/*<Hello/>*/}
                {this.props.redirectTo && this.props.redirectTo !== '/login' ?
                    <Redirect to={this.props.redirectTo}/> : null}
                <Logo/>
                {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
                <WingBlank>
                    <List>
                        <InputItem
                            onChange={v => this.props.handleChange('user', v)}
                        >用户：</InputItem>
                        <InputItem type="password"
                                   onChange={v => this.props.handleChange('pwd', v)}
                        >密码：</InputItem>
                    </List>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.register}>注册</Button>
                </WingBlank>

            </div>
        );
    }
}

export default Login;