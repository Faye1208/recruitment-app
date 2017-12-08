import React, {Component} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadData } from '../../redux/user.redux';

@withRouter

// connect要写在withRouter后面
@connect(
    null,
    { loadData }
)

class AuthRoute extends Component {
    componentDidMount () {
        // 目前正处于登录或者注册页面的不需要登录信息
        const publicList = ['/login', '/register'];
        // 获取当前url
        const pathname = this.props.location.pathname;
        if (publicList.indexOf(pathname) > -1){
            return null;
        }
        // 存放到user.redux.js
        // 需要从后端获取用户信息，才决定怎么跳转页面
        axios.get('/user/info')
            .then(res => {
                if (res.status === 200) {
                    if (res.data.code === 0) {
                        // 有登录信息的
                        this.props.loadData(res.data.data);
                    } else {
                        this.props.history.push('/login');
                        console.log(this.props);
                    }
                    console.log(res.data);
                }
            });
        //  判断用户状态，是否已经登录
        //  判断现在的url地址，在login页面则不需要跳转，在用户中心需要跳转

        //  判断用户身份是牛人还是boss
        //  用户是否完善了个人信息
    }

    render () {
        return null;
    }
}

export default AuthRoute;