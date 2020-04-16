import React, {Component} from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
  render () {
    return <span>app</span>
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))

/**
 * react-redux 的目的：将组件内获取 state、监听 store、action绑定 dispatch 抽象出来
 * 1、实现组件内直接使用 state 的属性并同步 state 的更新
 * 2、可以直接派发 action
 */

