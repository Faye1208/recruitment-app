import React, { Component } from 'react';
import Logo from '../../component/logo/logo';
import { List, InputItem, Radio, WhiteSpace, Button } from 'antd-mobile';


class Register extends Component{
    constructor (props){
        super(props);
        this.state = {
            type: 'genius'
        }
    }
    render(){
        const RadioItem = Radio.RadioItem;
        return (
            <div className="register-container-wrapper">
                <h2>Register page</h2>
                <Logo/>
                <List>
                    <InputItem>用户</InputItem>
                    <InputItem>密码</InputItem>
                    <InputItem>确认密码</InputItem>
                    <WhiteSpace/>
                    <RadioItem checked = {this.state.type === 'genius'}>牛人</RadioItem>
                    <RadioItem checked = {this.state.type === 'boss'}>Boss</RadioItem>
                    <WhiteSpace/>
                    <Button type="primary">注册</Button>
                </List>
            </div>
        );
    }
}

export default Register;