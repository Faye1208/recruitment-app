import axios from 'axios';

// action
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';

const initState = {
    isAuth: false,
    msg: null,
    user: '',
    pwd: '',
    type: ''
};

// reducer
export function user (state = initState, action) {
    console.log(state);
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {...state, msg: '', isAuth: true, ...action.payload};
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

export function register ({user,pwd,repeatpwd,type}) {
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