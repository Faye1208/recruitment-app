import axios from 'axios';
import io from 'socket.io-client';

const socket = io('ws://localhost:9093');

// 获取聊天列表
const MSG_LIST = 'MSG_LIST';
// 读取信息
const MSG_RECV = 'MSG_RECV';
// 标识已读
const MSG_READ = 'MSG_READ';

const initState = {
    chatmsg: [],
    users: {},
    unread: 0
};

export function chat (state = initState, action) {
    switch (action.type) {
        case MSG_LIST:
            //console.log(action.payload);
            return {
                ...state,
                users: action.payload.users,
                chatmsg: action.payload.msgs,
                unread: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userid).length
            };
        case MSG_RECV:
            const n = action.payload.to === action.userid ? 1 : 0;
            return {
                ...state,
                chatmsg: [...state.chatmsg, action.payload],
                unread: state.unread + n
            };
        case MSG_READ:
            const {from} = action.payload;
            // console.log(num);
            return {
                ...state,
                chatmsg: state.chatmsg.map(v => ({...v, read: from === v.from ? true : v.read})),
                unread: state.unread - action.payload.num
            };
        default:
            return state;
    }
}

function msgList (msgs, users, userid) {
    return {type: MSG_LIST, payload: {msgs, users, userid}}
}

function msgRecv (msg, userid) {
    return {userid, type: MSG_RECV, payload: msg}
}

function msgRead ({userid, from, num}) {
    return {type: MSG_READ, payload: {from, userid, num}}
}

export function readMsg (from) {
    return (dispatch, getState) => {
        axios.post('/user/readmsg', {from})
            .then(res => {
                const userid = getState().user._id;
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(msgRead({userid, from, num: res.data.num}));
                }
            });
    }
}

export function receiveMsg () {
    return (dispatch, getState) => {
        socket.on('receive-msg', function (data) {
            const userid = getState().user._id;
            dispatch(msgRecv(data, userid));
        });
    }
}

export function sendMsg ({from, to, msg}) {
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
                    // console.log('getState', getState());
                    const userid = getState().user._id
                    dispatch(msgList(res.data.msgs, res.data.users, userid));
                }
            });
    }
}