import axios from 'axios';
import {getRedirectPath} from "../util";

// action
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOAD_DATA = 'LOAD_DATA';
const initState = {
    redirectTo: '',
    isAuth: false,
    msg: '',
    user: '',
    type: ''
};

// reducer
export function user (state = initState, action) {
    console.log(state);
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {...state, msg: '', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload};
        case LOGIN_SUCCESS:
            return {...state, msg: '', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload};
        case LOAD_DATA:
            return {...state, ...action.payload};
        case ERROR_MSG:
            return {...state, isAuth: false, msg: action.msg};
        default:
            return state;
    }
}


function registerSuccess (data) {
    return {type: REGISTER_SUCCESS, payload: data}
}

function errorMsg (msg) {
    // 返回的对象里面的msg:msg如果需要简写为msg，必须放在对象的开头
    return {msg, type: ERROR_MSG};
}

function loginSuccess (data) {
    return {type: LOGIN_SUCCESS, payload: data};
}

export function loadData (userinfo) {
    return {type: LOAD_DATA, payload: userinfo}
}

export function register ({user, pwd, repeatpwd, type}) {
    // 判断用户输入的信息是否合法
    if (!user || !pwd || !type) {
        return errorMsg('请输入用户名和密码');
    }
    if (pwd !== repeatpwd) {
        return errorMsg('两次密码必须一致');
    }
    // 需要安装body-parser
    return dispatch => {
        axios.post('/user/register', {user, pwd, type})
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(registerSuccess({user, pwd, type}));
                } else {
                    dispatch(errorMsg(res.data.msg));
                }
            });
    };

}

export function login ({user, pwd}) {
    if (!user || !pwd) {
        return errorMsg('必须输入用户名和密码')
    }
    return dispatch => {
        axios.post('/user/login', {user, pwd})
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    // response.data是后端返回的所用内容，其中这些内容里面有个data的属性专门存储查询数据库以后得到的用户信息
                    dispatch(loginSuccess(res.data.data));
                    console.log(res.data);
                } else {
                    dispatch(errorMsg(res.data.msg));
                }
            });
    };

}
