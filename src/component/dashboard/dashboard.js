import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavBar} from 'antd-mobile';
import {Route, Switch} from 'react-router-dom';
import NavLinkBar from '../navlink/navlink';
import Boss from '../../component/boss/boss';
import Genius from '../../component/genius/genius';
import User from '../User/User';
import Msg from '../msg/msg';
import {getMsgList, receiveMsg} from "../../redux/chat.redux";

@connect(
    state => state,
    {getMsgList, receiveMsg}
)

class DashBoard extends Component {
    componentDidMount () {
        if (!this.props.chat.chatmsg.length) {
            // console.log('dashboard page loaded:',this.props.chat.chatmsg.length);
            this.props.getMsgList();
            this.props.receiveMsg();
        }
    }

    componentWillMount () {
    }

    render () {
        const {pathname} = this.props.location;
        const user = this.props.user;
        const navList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'boss',
                title: '牛人列表',
                component: Boss,
                hide: user.type === 'genius'
            },
            {
                path: '/genius',
                text: 'boss',
                icon: 'job',
                title: 'Boss列表',
                component: Genius,
                hide: user.type === 'boss'
            },
            {
                path: '/msg',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg
            },
            {
                path: '/me',
                text: '我',
                icon: 'user',
                title: '个人中心',
                component: User
            }
        ];
        const navItem = navList.find(v => v.path === pathname);
        return (
            <div className="dashboard-wrapper">
                <NavBar mode="dark"
                        className="fixed-header"
                >
                    {navItem.title}
                </NavBar>
                <div className="header-space">
                    <div className="content">
                        <Switch>
                            {navList.map(v => (
                                <Route key={v.path} path={v.path} component={v.component}/>
                            ))}
                        </Switch>
                    </div>
                    <NavLinkBar data={navList}/>
                </div>

            </div>
        );

    }
}

export default DashBoard;