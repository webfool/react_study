import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import Counter from './Counter'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {title: '计数器标题'}
  }
  render () {
    return <Counter title={this.state.title}></Counter>
  }
}

ReactDOM.render(<Provider store={store}>
  <App/>
</Provider>, document.getElementById('root'))

/**
 * react-redux 的目的：将组件内获取 state、监听 store、action绑定 dispatch 抽象出来
 * 1、实现组件内直接使用 state 的属性并同步 state 的更新
 * 2、可以直接派发 action
 */

