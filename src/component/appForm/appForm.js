import React from 'react';

export default function appForm (Comp) {
    return class WrapperComp extends React.Component {
        constructor (props){
            super(props);
            this.state = {};
            this.handleChange = this.handleChange.bind(this);
        }

        handleChange (key, val) {
            // console.log(key,val);
            this.setState({
                // key是一个变量，要记得加中括号
                [key]: val
            });
        }

        render () {
            // 把所用WrapperComp组件的属性都传给Comp叫属性穿透
            return <Comp {...this.props} handleChange = {this.handleChange} state = {this.state} />
        }
    }
}