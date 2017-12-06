import React, {Component} from 'react';
import {connect} from 'react-redux';
import Logo from '../../component/logo/logo';
import {List, InputItem, Radio, WhiteSpace, Button} from 'antd-mobile';
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
        // 用bind的话性能会好一些,也可以直接传入一个箭头函数
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
                <h2>Register page</h2>
                <Logo/>
                {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
                <List>
                    <InputItem
                        onChange={v => this.handleChange('user', v)}
                    >用户名</InputItem>
                    <InputItem type="password"
                               onChange={v => this.handleChange('pwd', v)}
                    >密码</InputItem>
                    <InputItem type="password"
                               onChange={v => this.handleChange('repeatpwd', v)}
                    >确认密码</InputItem>
                    <WhiteSpace/>
                    <RadioItem
                        checked={this.state.type === 'genius'}
                        onChange={() => this.handleChange('type', 'genius')}
                    >牛人</RadioItem>
                    <RadioItem
                        checked={this.state.type === 'boss'}
                        onChange={() => this.handleChange('type', 'boss')}
                    >Boss</RadioItem>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.handleRegister}>注册</Button>
                </List>
            </div>
        );
    }
}

export default Register;