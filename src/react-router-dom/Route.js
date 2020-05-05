import React, { Component } from 'react';
import RouterContext from './context'
import pathToReg from 'path-to-regexp'

/**
 * Route 组件
 * - 支持组件 component 传参或 this.props.children
 * - 如果 path 为空，则直接匹配
 */
class Route extends Component {
  static contextType = RouterContext

  render() {
    const currentPath = this.context.location.pathname
    const {path, component: Comp, exact = false} = this.props

    // 以下条件通过：1、path 为空 2、当前路径匹配 path
    if (!path) {
      if (this.props.children) return this.props.children
      if (Comp) return <Comp {...this.context}></Comp>
      return null
    } else {
      const keys = []
      const reg = pathToReg(path, keys, {end: exact})
      const result = currentPath.match(reg)
      if (!result) return null

      // 如果传递children，则直接调用
      if (this.props.children) return this.props.children

      if (Comp) {
        // 否则需要将匹配的数据往下传
        const [url, ...values] = result
        const names = keys.map(item => item.name)
        const params = names.reduce((memo, key, index) => {
          memo[key] = values[index]
          return memo
        }, {})

        const match = {
          path,
          url: currentPath,
          isExact: url === currentPath,
          params
        }

        const props = {
          ...this.context,
          match
        }

        return <Comp {...props}></Comp>
      }

      // 既没有传 children，也没有传 component
      return null
    }
  }
}

export default Route;