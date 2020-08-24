/**
 * Link 组件：
 * - to 属性可以是：字符串、对象、函数
 * - 允许传递其它属性到 a 标签
 */
import React, { Component } from 'react';
import RouterContext from './context'

class Link extends Component {
  static contextType = RouterContext

  render() {
    const {to, ...other} = this.props
    const push = this.context.history.push
    return <a onClick={() => push(to)} {...other}>{this.props.children}</a>
  }
}

export default Link;