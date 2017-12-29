import React, {Component} from 'react';
// import io from 'socket.io-client';
import {List, InputItem, NavBar} from 'antd-mobile';
import {connect} from 'react-redux';
import {getMsgList, sendMsg, receiveMsg} from "../../redux/chat.redux";

/*
 * 由于目前的前端端口与后端socket.io的端口之间
 * 存在跨域问题所以需要手动连接,
 * 如果解决了跨域问题io后面就可以不接参数了，
 * 下面的socket为当前的 socket
 */

// const socket = io('ws://localhost:9093');

@connect(
    state => state,
    {getMsgList, sendMsg, receiveMsg}
)

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
        // socket.on('receive-msg', (data) => {
        //     this.setState({
        //         msg: [...this.state.msg, data.text]
        //     });
        // });

        /*
         * 避免刷新页面的时候，聊天记录没有了，
         * 因此需要在Chat组件渲染以后调用一下以下函数
         */
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList();
            this.props.receiveMsg();
        }
    }

    handleChange (v) {
        this.setState({
            text: v
        })
    }

    handleSubmit () {
        // console.log(this.state);
        // socket.emit('sendmsg', {text: this.state.text});
        // this.setState({text: ''});
        const from = this.props.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
        this.props.sendMsg({from, to, msg});
        this.setState({text: ''});

    }

    render () {
        console.log(this.props);
        const user = this.props.match.params.user;
        const Item = List.Item;
        return (
            <div id='chat-page'>
                <NavBar mode="dark">
                    {user}
                </NavBar>

                {this.props.chat.chatmsg.map(v => {
                    return v.from === user ? (
                        <List key={v._id}>
                            <Item
                            >{v.content}</Item>
                        </List>
                    ) : (
                        <List key={v._id}>
                            <Item
                                extra={'avatar'}
                                className="chat-me"
                            >{v.content}</Item>

                        </List>
                    )
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