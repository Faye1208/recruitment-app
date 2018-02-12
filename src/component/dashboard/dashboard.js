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
                text: 'Genius',
                icon: 'boss',
                title: 'Genius',
                component: Boss,
                hide: user.type === 'genius'
            },
            {
                path: '/genius',
                text: 'boss',
                icon: 'job',
                title: 'Boss',
                component: Genius,
                hide: user.type === 'boss'
            },
            {
                path: '/msg',
                text: 'Message',
                icon: 'msg',
                title: 'Message',
                component: Msg
            },
            {
                path: '/me',
                text: 'Me',
                icon: 'user',
                title: 'Personal Center',
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