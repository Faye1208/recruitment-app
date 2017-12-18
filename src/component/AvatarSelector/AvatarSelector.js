import React, {Component} from 'react';
import {Grid, List, WingBlank, WhiteSpace} from 'antd-mobile';
import PropTypes from 'prop-types';

class AvatarSelector extends Component {
    static proTypes = {
        selectAvatar: PropTypes.func.isRequired
    };

    constructor (props) {
        super(props);
        this.state = {}
    }

    render () {
        const avatarList = 'boy,girl,man,woman,bull,chick,crab,ligion,hippo,koala,lemur,pig,tiger,whale,zebra'.split(',').map(v => ({
            icon: require(`../img/${v}.png`),
            text: v
        }));
        const getHeader = this.state.text ? (
            <div>
                <span>已选择头像</span>
                <img style={{width: 20}} src={this.state.icon} alt=""/>
            </div>
        ) : '请选择头像';
        return (
            <div className="avatar-wrapper">
                <WingBlank>
                    <List renderHeader={() => getHeader}>
                        <Grid
                            data={avatarList}
                            columnNum={5}
                            onClick={element => {
                                this.setState(element);
                                this.props.selectAvatar(element.text)
                            }}
                        />
                    </List>
                </WingBlank>
                <WhiteSpace/>
            </div>
        );
    }
}

export default AvatarSelector;