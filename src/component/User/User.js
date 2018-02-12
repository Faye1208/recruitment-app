import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Result, List, WhiteSpace, Modal} from 'antd-mobile';
import {Redirect} from 'react-router-dom';
import browserCookie from 'browser-cookies';
import {logoutSubmit} from '../../redux/user.redux';

@connect(
    state => state.user,
    {logoutSubmit}
)

class User extends Component {
    constructor (props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout () {
        const alert = Modal.alert;

        alert('退出', '确认退出应用吗？', [
            {text: '取消', onPress: () => {}},
            {
                text: '确认', onPress: () => {

                // 清除cookie
                browserCookie.erase('userid');

                // 刷新页面
                // window.location.href=window.location.href;

                // 不刷新页面，手动刷新redux里面的数据
                this.props.logoutSubmit();

            }
            }
        ]);
    }

    render () {
        const props = this.props;
        const Item = List.Item;
        const Brief = Item.Brief;
        return props.user ? (
            <div>
                <Result
                    img={<img src={require(`../img/${props.avatar}.png`)} style={{width: 50}} alt=""/>}
                    title={props.user}
                    message={props.type === 'boss' ? props.company : null}
                />

                <List renderHeader={() => '简介'}>
                    <Item multipleLine>
                        {props.title}
                        {props.desc.split('\n').map(k => (<Brief key={k}>{k}</Brief>))}
                        {props.money ? <Brief>薪资:{props.money}</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace/>

                <List>
                    <Item onClick={this.logout}>退出登录</Item>
                </List>
            </div>
        ) : <Redirect to={props.redirectTo}/>;
    }
}

export default User;