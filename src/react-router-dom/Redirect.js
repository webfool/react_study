import React, { Component } from 'react';
import RouterContext from './context'
import pathToReg from 'path-to-regexp'

/**
 * Redirect 组件
 * - to 属性需支持：字符串、对象
 * - 支持 from 属性，且 from 支持参数
 */
class Redirect extends Component {
  static contextType = RouterContext

  render() {
    const {from, exact = false} = this.props
    const pathname = this.context.location.pathname

    if (!from || pathToReg(from, [], {end: exact}).test(pathname)) {
      this.context.history.push(this.props.to)
    }
    
    return null
  }
}

export default Redirect;