import React, {Component} from 'react';
import {
    List,
    InputItem,
    TextareaItem,
    WingBlank,
    WhiteSpace,
    Button,
    NavBar
} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {update} from '../../redux/user.redux';
import AvatarSelector from '../../component/AvatarSelector/AvatarSelector';

@connect(
    state => state.user,
    {update}
)

class GeniusInfo extends Component {
    constructor (props) {
        super(props);
        this.state = {
            'title': '',
            'desc': ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(key,val){
        this.setState({
            [key]:val
        });
    }

    render () {
        const pathname = this.props.location.pathname;
        const redirectTo = this.props.redirectTo;
        return (
            <div className="geniusinfo-page-wrapper">
                {redirectTo && redirectTo !== pathname ? <Redirect to={this.props.redirectTo}/> : null}
                <NavBar mode="dark">个人信息</NavBar>
                <AvatarSelector selectAvatar={(imgname) => {
                    this.setState({
                        avatar: imgname
                    })
                }}/>
                <WingBlank>
                    <List>
                        <InputItem onChange={value => {
                            this.handleChange('title', value)
                        }}>求职岗位</InputItem>
                        <TextareaItem
                            onChange={
                                value => {
                                    this.handleChange('desc', value)
                                }
                            }
                            rows={3}
                            autoHeight
                            title="个人简介">
                        </TextareaItem>
                    </List>
                    <WhiteSpace/>
                    <Button
                        onClick={() => {
                            this.props.update(this.state)
                        }}
                        type="primary">保 存</Button>
                </WingBlank>
            </div>
        );
    }
}

export default GeniusInfo;