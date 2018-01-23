import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, Badge} from 'antd-mobile';

@connect(
    state => state
)

class Msg extends Component {
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

        // 分组以后取出属性值得到一个新的数组然后在根据每项的最后一条消息的创建时间排序
        const chatList = Object.values(msgGroup).sort((a, b) => {
            const a_last = this.getLast(a).create_time;
            const b_last = this.getLast(b).create_time;
            return b_last - a_last;
        });
        const Item = List.Item;
        const Brief = Item.Brief;

        // 取出聊天用户数据，以便后面可以读取聊天对象的个人资料
        const users = this.props.chat.users;
        // 取出当前用户的id
        const userid = this.props.user._id;
        // console.log("msgGroup:", msgGroup);
        // console.log('chatlist:', chatList);
        return (
            <div>
                {chatList.filter(v => v[0].from === userid || v[0].to === userid).map(v => {
                    // console.log(v);
                    const lastItem = this.getLast(v);
                    const targetId = v[0].from === userid ? v[0].to : v[0].from;
                    const unreadNum = v.filter(item => !item.read && item.to === userid).length;
                    // console.log(lastItem);
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