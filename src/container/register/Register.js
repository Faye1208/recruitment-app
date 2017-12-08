import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {List, InputItem, Radio, WhiteSpace, WingBlank, Button} from 'antd-mobile';
import Logo from '../../component/logo/logo';
import {register} from "../../redux/user.redux";
import '../../index.css';

@connect(
    state => state.user,
    {register}
)

class Register extends Component {
    constructor (props) {
        super(props);
        this.state = {
            user: '',
            pwd: '',
            repeatpwd: '',
            type: 'genius'
        };
        // 用bind的话性能会好一些,也可以直接传入一个箭头函数，但是箭头函数每次加载页面都会生成一个新的函数
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleChange (key, val) {
        this.setState({
            // key是一个变量，要记得加中括号
            [key]: val
        });
    }

    handleRegister () {
        this.props.register(this.state);
        console.log(this.state);
    }

    render () {
        const RadioItem = Radio.RadioItem;
        console.log(this.props);
        return (
            <div className="register-container-wrapper">
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
                <Logo/>
                {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
                <WingBlank>
                    <List>
                        <InputItem
                            onChange={value => this.handleChange('user', value)}
                        >用户名</InputItem>
                        <InputItem type="password"
                               onChange={value => this.handleChange('pwd', value)}
                        >密码</InputItem>
                        <InputItem type="password"
                               onChange={value => this.handleChange('repeatpwd', value)}
                        >确认密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <List>
                        <RadioItem
                            checked={this.state.type === 'genius'}
                            onChange={() => this.handleChange('type', 'genius')}
                        >牛人</RadioItem>
                        <RadioItem
                            checked={this.state.type === 'boss'}
                            onChange={() => this.handleChange('type', 'boss')}
                        >Boss</RadioItem>
                    </List>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.handleRegister}>注册</Button>
                </WingBlank>
            </div>
        );
    }
}

export default Register;