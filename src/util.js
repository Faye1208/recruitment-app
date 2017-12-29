export function getRedirectPath ({type, avatar}) {
    // 根据用户信息 返回跳转地址
    // 根据user.type 分别跳转到boss或者genius页面
    // 根据user.avatar 分别跳转到bossinfo或者genius页面
    let url = (type === 'boss') ? '/boss' : '/genius';
    // 如果有头像，说明用户信息已经完整
    if (!avatar) {
        url += 'info';
    }
    return url;
}

export function getChatId (userId, targetId) {
    return [userId, targetId].sort().join('_');
}