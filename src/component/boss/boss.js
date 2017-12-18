import React, {Component} from 'react';
import {Card, WhiteSpace, WingBlank} from 'antd-mobile';
import {connect} from 'react-redux';
import {getUserList} from "../../redux/chatuser.redux";
import UserCard from '../usercard/usercard';

@connect(
    state => state.chatuser,
    {getUserList}
)

class Boss extends Component {
    componentDidMount () {
        this.props.getUserList('genius');
    }

    render () {
        console.log(this.state);
        console.log(this.props);
        return (
            <UserCard userlist={this.props.userlist}/>
        );
    }
}

export default Boss;