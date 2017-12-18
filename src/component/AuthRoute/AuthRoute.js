import React, {Component} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadData } from '../../redux/user.redux';

@withRouter

// connect要写在withRouter后面
//  不需要state时，可以将其设置为null
@connect(
    null,
    { loadData }
)

class AuthRoute extends Component {
    componentDidMount () {
        //  判断现在的url地址，如果正处于登录或者注册页面不需要登录信息即可访问
        const publicList = ['/login', '/register'];
        // 获取当前url
        const pathname = this.props.location.pathname;
        if (publicList.indexOf(pathname) > -1){
            return null;
        }

        // 判断用户状态，是否已经登录，需要从后端获取用户信息，才决定怎么跳转页面
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
                    // res.data保存了后端返回(响应)的内容，即后端response.json()函数里面的内容
                    console.log(res.data);
                }

            });

        //  判断用户身份是牛人还是boss
        //  用户是否完善了个人信息
    }

    render () {
        return (<h3>跳转页面</h3>);
    }
}

export default AuthRoute;