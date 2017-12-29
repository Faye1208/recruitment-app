import axios from 'axios';
import io from 'socket.io-client';

const socket = io('ws://localhost:9093');

// 获取聊天列表
const MSG_LIST = 'MSG_LIST';
// 读取信息
const MSG_RECV = 'MSG_RECV';
// 标识已读
const MST_READ = 'MST_READ';

const initState = {
    chatmsg: [],
    users: {},
    unread: 0
};

export function chat (state = initState, action) {
    switch (action.type) {
        case MSG_LIST:
            console.log(action.payload);
            return {
                ...state,
                users: action.payload.users,
                chatmsg: action.payload.msgs,
                unread: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userid).length
            };
        case MSG_RECV:
            const n = action.payload.to === action.userid ? 1: 0;
            return {
                ...state,
                chatmsg: [...state.chatmsg,
                    action.payload],
                unread: state.unread + n
            };
        // case MST_READ:
        default:
            return state;
    }
}

function msgList (msgs, users, userid) {
    return {type: MSG_LIST, payload: {msgs, users, userid}}
}

function msgRecv (msg,userid) {
    return {userid, type: MSG_RECV, payload: msg}
}

export function receiveMsg () {
    return (dispatch, getState) => {
        socket.on('receivemsg', function (data) {
            console.log('receivemsg:', data);
            const userid = getState().user._id;
            dispatch(msgRecv(data, userid));
        });
    }
}

export function sendMsg ({from, to, msg}) {
    console.log({from, to, msg});
    return dispatch => {
        socket.emit('sendmsg', {from, to, msg});
    }
}

export function getMsgList () {
    /*
     * getState 可以获取应用的所有state,
     * 因此可以在需要使用其它地方的数据的时候使用该参数
     */
    return (dispatch, getState) => {
        axios.get('/user/getmsglist')
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    console.log('getState', getState());
                    const userid = getState().user._id
                    dispatch(msgList(res.data.msgs, res.data.users, userid));
                }
            });
    }
}