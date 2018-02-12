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

class BossInfo extends Component {
    constructor (props) {
        super(props);
        this.state = {
            'title':'',
            'money':'',
            'company':'',
            'desc':''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (key, val) {
        this.setState({
            [key]: val
        });
    }

    render () {
        const pathname = this.props.location.pathname;
        const redirectTo = this.props.redirectTo;
        return (
            <div className="bossinfo-page-wrapper">
                {redirectTo && redirectTo !== pathname ? <Redirect to={this.props.redirectTo}/> : null}
                <NavBar mode="dark">个人信息</NavBar>
                <div className="header-space">
                    <AvatarSelector
                        selectAvatar={(imgname) => {
                            this.setState({
                                avatar: imgname
                            })
                        }}
                    />
                    <WingBlank>
                        <List>
                            <InputItem onChange={value => {
                                this.handleChange('title', value)
                            }}>招聘职位</InputItem>
                            <InputItem onChange={value => {
                                this.handleChange('company', value)
                            }}>公司名称</InputItem>
                            <InputItem onChange={value => {
                                this.handleChange('money', value)
                            }}>职位薪资</InputItem>
                            <TextareaItem
                                onChange={
                                    value => {
                                        this.handleChange('desc', value)
                                    }
                                }
                                rows={3}
                                autoHeight
                                title="职位简介">
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
            </div>
        );
    }
}

export default BossInfo;