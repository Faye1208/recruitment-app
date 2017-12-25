import React, {Component} from 'react';
import io from 'socket.io-client';
import {List, InputItem} from 'antd-mobile';

/*
 * 由于目前的前端端口与后端socket.io的端口之间
 * 存在跨域问题所以需要手动连接,
 * 如果解决了跨域问题io后面就可以不接参数了，
 * 下面的socket为当前的 socket
 */
const socket = io('ws://localhost:9093');

class Chat extends Component {
    constructor (props) {
        super(props);
        this.state = {
            text: '',
            msg: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount () {
        socket.on('receive-msg', (data) => {
            this.setState({
                msg: [...this.state.msg, data.text]
            })
        });
    }

    handleChange (v) {
        this.setState({
            text: v
        })
    }

    handleSubmit () {
        console.log(this.state);
        socket.emit('sendmsg', {text: this.state.text});
        this.setState({
            text: ''
        });
    }

    render () {
        console.log(this.props);
        return (
            <div>
                {this.state.msg.map(v=>{
                    return <p key={v}>{v}</p>
                })}
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={this.handleChange}
                            extra={<span onClick={this.handleSubmit}>发送</span>}
                        >
                        </InputItem>
                    </List>
                </div>
            </div>
        );
    }
}

export default Chat;