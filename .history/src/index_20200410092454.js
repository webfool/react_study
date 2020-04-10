import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {bindActionCreators} from 'redux'
import store from './store'
import counterActions from './store/actions/counter'
import VirtualList from './VirtualList'

const bindCounterActions = bindActionCreators(counterActions, store.dispatch)

class Counter extends Component {
  constructor () {
    super()
    this.state = {value: store.getState().counter}
  }

  componentDidMount () {
    this.listener = store.subscribe(() => {
      this.setState({
        value: store.getState().counter
      })
    })
  }

  componentWillUnmount () {
    this.listener()
  }

  render () {
    return <>
      <div>{this.state.value}</div>
      <button onClick={bindCounterActions.add}>+</button>
      <button onClick={bindCounterActions.del}>-</button>
    </>
  }
}


// ReactDOM.render(<Counter></Counter>, document.getElementById('root'))
const Child = (props) => {
  return <div>{props.index} : {props.name}</div>
}

const items = Array.from({length: 1000}).map((item, index) => {
  return {name: 'hw' + index}
})

const props = {items, itemSize: 30, height: 100}

ReactDOM.render(<VirtualList {...props}>
  <Child></Child>
</VirtualList>, document.getElementById('root'))



/**
 * === 核心概念 ===
 * 整个应用应该只有一个 store，且 state 是单向数据流
 * 
 * 【dispatch】：派发 action 修改 state
 * - action 的 type 最好是字符串，因为能序列化，其它属性任意
 * 
 * 【reducer】单个或者通过 combineReducers 绑定多个
 * - state 传入 undefined 时，应返回默认值(combineReducers 会传入 undefined 进行校验，建议采用 es6 的参数默认赋值语法)；永远不返回 undefined
 * - action 可以识别时，操作之后应返回新 state
 * - action 不被识别时，返回原 state
 * 
 * 【subscribe】
 * - subscribe 用来订阅，它的返回值用来解除订阅
 * - dispatch 完成后会直接调用所有 listeners，调用之前会生成事件快照，每个 listener 中添加或删除 listener 不会影响本次 dispatch 的回调列表
 * 
 * 【getState】获取最新的 state
 * 
 * === 工具方法 ===
 * 【bindActionCreators】：为 action creator 或由其组成的对象绑定 dispatch
 * 【combineReducers】: 传入一个对象绑定每个属性的 reducer，生成一个新 reducer。新 reducer 接收 action，传递给每个属性的 reducer 生成新的属性值
 */