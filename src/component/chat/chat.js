import React, {Component} from 'react';
// import io from 'socket.io-client';
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile';
import {connect} from 'react-redux';
import {getMsgList, sendMsg, receiveMsg, readMsg} from "../../redux/chat.redux";
import {user} from "../../redux/user.redux";
import {getChatId} from "../../util";

/*
 * 由于目前的前端端口与后端socket.io的端口之间
 * 存在跨域问题所以需要手动连接,
 * 如果解决了跨域问题io后面就可以不接参数了，
 * 下面的socket为当前的 socket
 */

// const socket = io('ws://localhost:9093');

@connect(
    state => state,
    {getMsgList, sendMsg, receiveMsg, readMsg}
)

class Chat extends Component {
    constructor (props) {
        super(props);
        this.state = {
            text: '',
            msg: [],
            shoeEmoji: false
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
        if (!this.props.chat.chatmsg.length) {
            console.log('chat page loaded!');
            this.props.getMsgList();
            this.props.receiveMsg();
        }
        // const to = this.props.match.params.user;
        // this.props.getMsgList();
        // this.props.receiveMsg();
        // this.props.readMsg(to);

    }

    componentWillUnmount () {
        // console.log('unmount');
        const to = this.props.match.params.user;
        this.props.readMsg(to);
    }

    // 修复antd的Grid组件一加载只显示以后的bug
    fixCarousel () {
        setTimeout(function () {
            window.dispatchEvent(new Event('resize'))
        }, 0);
    }

    handleChange (v) {
        this.setState({
            text: v
        })
    }

    handleSubmit (e) {
        console.log("send msg");
        // socket.emit('sendmsg', {text: this.state.text});
        // this.setState({text: ''});
        const from = this.props.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
        this.props.sendMsg({from, to, msg});
        this.setState({text: ''});

    }

    render () {
        // console.log(this.props);
        const touser = this.props.match.params.user;
        const Item = List.Item;
        const users = this.props.chat.users;
        const chatid = getChatId(touser, this.props.user._id);
        // 过滤后的信息
        const chatmsg = this.props.chat.chatmsg;
        let chatmsgs = chatmsg.filter((v) => v.chatid === chatid );
        const emoji = '😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 ☺ 🙂  🤗 🤩 🤔 🤨 😐 😑 😶 🙄 😏 😣 😥 😮  🤐 😯 😪 😫 😴 😌 😛 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 ☹ 🙁 😖 😞 😟 😤 😢 😭 😦 😧 😨 😩 🤯 😬 😳 🤪 😵 😡 😠 🤬 😷 🤒 🤕 🤢 🤮 🤧 😇 🤠 🤡 🤥 🤫 🤭 🧐 🤓 😈 👿 👹 👺 💀 👻 👽 🤖 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👶 👦 👧 👨 👩 👴 👵 👨‍⚕️  👩‍ 👨‍🎓 👩‍🎓 👨‍⚖️ 👩‍⚖️ 👨‍🌾  👩‍🌾 👨‍🍳 👩‍🍳 👨‍🔧 👩‍🔧 👨‍🏭  👩‍🏭 👨‍💼 👩‍💼 👨‍🔬 👩‍🔬 👨‍💻 👩‍💻 👨👩‍🎤 👨‍🎨 👩‍🎨 👨‍✈️  👩‍✈️ 👨‍🚀 👩‍🚀 👨‍🚒 👩‍🚒 👮 👮‍♂️ 👮‍♀️ 🕵 🕵️‍♂️ 🕵️‍♀️ 💂 💂‍♂️  💂‍♀️  👷 👷‍♂️ 👷‍♀️ 🤴 👸 👳 👳‍♂️ 👳‍♀️ 👲 🧕 🧔 👱 👱‍♂️ 👱‍♀️ 🤵 👰 🤰 🤱 👼 🎅 🤶 🧙‍♀️ 🧙‍♂️ 🧚‍♀️ 🧚‍♂️ 🧛‍♀️ 🧛‍♂️ 🧜‍♀️ 🧜‍♂️ 🧝‍♀️ 🧝‍♂️ 🧞‍♀️ 🧞‍♂️ 🧟‍♀️ 🧟‍♂️ 🙍 🙍‍♂️ 🙍‍♀️ 🙎 🙎‍♂️ 🙎‍♀️ 🙅 🙅‍♂️ 🙅‍♀️ 🙆 🙆‍♂️ 🙆‍♀️ 💁 💁‍♂️ 💁‍♀️ 🙋 🙋‍♂️ 🙋‍♀️ 🙇 🙇‍♂️ 🙇‍♀️ 🤦‍♂️ 🤦‍♀️ 🤷 🤷‍♂️ 🤷‍♀️ 💆 💆‍♂️ 💆‍♀️ 💇 💇‍♂️ 💇‍♀️ 🚶 🚶‍♂️ 🚶‍♀️ 🏃 🏃‍♂️ 🏃‍♀️ 💃 🕺 👯 👯‍♂️ 👯‍♀️ 🧖‍♀️ 🧖‍♂️ 🕴 🗣 👤 👥 👫 👬 👭 💏 👨‍❤️‍💋‍👨 👩‍❤️‍💋‍👩 💑 👨‍❤️‍👨 👩‍❤️‍👩 👪 👨‍👩‍👦 👨‍👩‍👧 👨‍👩‍👧‍👦 👨‍👩‍👦‍👦 👨‍👩‍👧‍👧 👨‍👨‍👦 👨‍👨‍👧 👨‍👨‍👧‍👦 👨‍👨‍👦‍👦 👨‍👨‍👧‍👧 👩‍👩‍👦 👩‍👩‍👧 👩‍👩‍👧‍👦 👩‍👩‍👦‍👦 👩‍👩‍👧‍👧 👨‍👦 👨‍👦‍👦 👨‍👧 👨‍👧‍👦 👨‍👧‍👧 👩‍👦 👩‍👦‍👦 👩‍👧 👩‍👧‍👦 👩👧‍👧 🤳 💪 👈 👉 ☝ 👆 🖕 👇 ✌ 🤞 🖖 🤘 🖐 ✋ 👌 👍 👎 ✊ 👊 🤛 🤜 🤚 👋 🤟 ✍ 👏 👐 🙌 🤲 🙏 🤝 💅 👂 👃 👣 👀 👁 🧠 👅 👄 💋 👓 🕶 👔 👕 👖 🧣 🧤 🧥 🧦 👗 👘 👙 👚 👛 👜 👝 🎒 👞 👟 👠 👡 👢 👑 👒 🎩 🎓 🧢 ⛑ 💄 💍 🌂 ☂ 💼'
            .split(' ')
            .filter(v => v)
            .map(v => ({text: v}));
        // 防止数据还没加载完的时候引起错误
        if (!users[touser]) {
            return null;
        }
        console.log(this.props);
        return (
            <div id='chat-page'>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => {
                        this.props.history.goBack();
                    }}
                >
                    {users[touser].name}
                </NavBar>

                {/*将this.props.chat.chatmsg(所有的信息)改为过滤后的信息chatmsgs*/}
                {chatmsgs.map(v => {
                    const avatar = require(`../img/${users[v.from].avatar}.png`);
                    return v.from === touser ? (
                        <List key={v._id}>
                            <Item
                                thumb={avatar}
                            >{v.content}</Item>
                        </List>
                    ) : (
                        <List key={v._id}>
                            <Item
                                extra={<img src={avatar}/>}
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
                            extra={
                                <div>
                                    <span
                                        style={{marginRight: 15}}
                                        onClick={() => {
                                            this.setState({showEmoji: !this.state.showEmoji});
                                            this.fixCarousel();
                                        }}
                                    >🤣</span>
                                    <span onClick={this.handleSubmit}>发送</span>
                                </div>
                            }
                        >
                        </InputItem>
                    </List>
                    {this.state.showEmoji && <Grid
                        data={emoji}
                        columnNum={9}
                        carouselMaxRow={4}
                        isCarousel={true}
                        onClick={(el) => {
                            // console.log(el);
                            this.setState({
                                text: this.state.text + el.text
                            })
                        }}
                    />
                    }
                </div>
            </div>
        );
    }
}

export default Chat;