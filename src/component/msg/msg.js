import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, Badge} from 'antd-mobile';

// import {withRouter} from

@connect(
    state => state
)

class Msg extends Component {
    componentDidMount () {
        // 刷新页面
        // window.location.href = window.location.href;
    }

    getLast (arr) {
        return arr[arr.length - 1];
    }

    render () {
        // 按照聊天用户(chatid)分组，每两个用户的聊天都是有一个单独的分组(页)
        const msgGroup = {};
        this.props.chat.chatmsg.forEach(v => {
            msgGroup[v.chatid] = msgGroup[v.chatid] || [];
            msgGroup[v.chatid].push(v);
        });
        const Item = List.Item;
        const Brief = Item.Brief;
        const chatList = Object.values(msgGroup).sort((a, b) => {
            const a_last = this.getLast(a).create_time;
            const b_last = this.getLast(b).create_time;
            return b_last - a_last;
        });
        const users = this.props.chat.users;
        const userid = this.props.user._id;
        console.log(this.props);
        console.log("msgGroup:", msgGroup);
        console.log('chatlist:', chatList);
        return (
            <div>
                {chatList.filter(v => v[0].from === userid || v[0].to === userid).map(v => {
                    console.log(v);
                    const lastItem = this.getLast(v);
                    const targetId = v[0].from === userid ? v[0].to : v[0].from;
                    const unreadNum = v.filter(v => !v.read && v.to === userid).length;
                    console.log(lastItem);
                    if (!users[targetId]) {
                        return null;
                    }
                    return (
                        <List key={lastItem._id}>
                            <Item
                                extra={<Badge text={unreadNum}/>}
                                thumb={require(`../img/${users[targetId].avatar}.png`)}
                                arrow="horizontal"
                                onClick={() => {
                                    this.props.history.push(`/chat/${targetId}`);
                                }}
                            >
                                <Brief>{users[targetId].name}</Brief>
                                {lastItem.content}
                            </Item>
                        </List>
                    )
                })}
            </div>
        );

    }
}

// function mapStateToProps (state) {
//     return state;
// }
//
// Msg = connect(
//     mapStateToProps
// )(Msg);

export default Msg