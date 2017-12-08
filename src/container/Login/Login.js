import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';
import Logo from '../../component/logo/logo';
import {login} from '../../redux/user.redux';
import '../../index.css';

@connect(
    state => state.user,
    {login}
)

class Login extends Component {
    constructor (props) {
        super(props);
        this.state = {
            user: '',
            pwd: ''
        };
        // 用bind的话性能会好一些,也可以直接传入一个箭头函数，但是箭头函数每次加载页面都会生成一个新的函数
        this.register = this.register.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleChange (key, val) {
        this.setState({
            // key是一个变量，要记得加中括号
            [key]: val
        });
    }

    handleLogin(){
        this.props.login(this.state);
    }

    register () {
        console.log(this.props);
        this.props.history.push('/register');
    }

    render () {
        return (
            <div className="login-container-wrapper">
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
                <Logo/>
                {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
                <WingBlank>
                    <List>
                        <InputItem
                            onChange = {v => this.handleChange('user', v)}
                        >用户：</InputItem>
                        <InputItem type="password"
                            onChange = {v => this.handleChange('pwd', v)}
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