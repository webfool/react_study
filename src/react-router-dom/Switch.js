/**
 * Switch 组件：
 * - 子组件只能是 <Route> 或者 <Redirect>，且只会渲染第一个匹配的
 * - <Route> 取 path 属性，<Redirect> 取 from 属性。如果路径属性为空，那么直接匹配
 */
import React, { Component } from 'react';
import pathToRegexp from 'path-to-regexp'
import RouterContext from './context'
import Route from './Route'
import Redirect from './Redirect';

class Switch extends Component {
  static contextType = RouterContext

  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() {
    const currentPath = this.context.location.pathname
    let {children} = this.props
    children = Array.isArray(children) ? children : [children]

    for(let i = 0; i < children.length; i++) {
      const child = children[i]
      const type = child.type
      if (type !== Route && type !== Redirect) continue // 只能是 Route 或者 Redirect 组件

      // Route 取 path 属性，Redirect 取 from 属性
      const path = child.props[type === Route ? 'path' : 'from']
      if (!path) return child // 如果为空，直接匹配

      const {exact = false} = child.props
      const reg = pathToRegexp(path, [], {end: exact})
      if (reg.test(currentPath)) return child
    }

    return null
  }
}

export default Switch;