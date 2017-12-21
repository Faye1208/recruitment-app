import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, WingBlank} from 'antd-mobile';

class UserCard extends Component {
    static propTypes = {
        userlist: PropTypes.array.isRequired
    };

    render () {
        const Header = Card.Header;
        const Body = Card.Body;
        return (
            <WingBlank>
                {this.props.userlist.map(v => (
                    v.avatar ? (
                        <Card key={v._id}>
                            <Header
                                title={v.user}
                                thumb={require(`../img/${v.avatar}.png`)}
                                extra={<span>{v.title}</span>}
                            />
                            <Body>
                                {v.type==='boss'?<div>公司:{v.company}</div>:null}

                                <div>{
                                    v.desc.split('\n').map(d => (
                                        <div key={d}>{d}</div>
                                    ))}
                                </div>
                                {v.type==='boss'?<div>薪资:{v.money}</div>:null}
                            </Body>
                        </Card>
                    ) : null
                ))}
            </WingBlank>
        );
    }
}

export default UserCard;