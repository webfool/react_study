import React from 'react'
import ReactDom from 'react-dom'

// 目标：1、React.PureComponent 和 React.memo 的使用  2、React.PureComponent 和 React.memo 的实现 3、应用场景


// === 手写 React.PureComponent 和 React.memo ： 开始 ===
// 对象浅比较
// Object.is 中，NaN 会被判断为相同，+0 和 -0 会被判断为不同
function shallowEqual(oldObj, newObj) {
  if (Object.is(oldObj, newObj)) return true

  if (typeof oldObj !== 'object' || oldObj === null || typeof newObj !== 'object' || newObj === null) return false

  const oldKeys = Object.keys(oldObj)
  const newKeys = Object.keys(newObj)

  if (oldKeys.length !== newKeys.length) return false

  for (let key of oldKeys) {
    if (!newObj.hasOwnProperty(key) || oldObj[key] !== newObj[key]) return false
  }
  return true
}

// 类继承会继承静态属性和原型属性，同时会先通过父类生成实例对象

// 类组件继承该组件后，只有 props 或 state 变化时才进行重新渲染
class PureComponent extends React.Component {
  constructor(props) {
    super(props)
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(nextProps, this.props) || !shallowEqual(nextState, this.state)
  }
}

// 将函数组件封装成 props 改变时再重新渲染
function memo (Component) {
  return class extends React.Component {
    constructor(props) {
      super(props)
    }

    shouldComponentUpdate (nextProps) {
      return !shallowEqual(nextProps, this.props)
    }

    render () {
      return <Component {...this.props}></Component>
    }
  }
}

// === 手写 React.PureComponent 和 React.memo： 结束 ===


class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = { title: '计算器1' }
  }

  changeTitle = () => {
    this.setState({
      title: `计算器 ${Math.round(Math.random() * 100)}`
    })
  }

  changeSameTitle = () => {
    this.setState({
      title: this.state.title
    })
  }

  render() {
    console.log('counter render')
    return <>
      <button onClick={this.changeTitle}>改标题</button>
      <button onClick={this.changeSameTitle}>改相同标题</button>
      <SubCounter title={this.state.title}></SubCounter>
      <SubCounter1 title={this.state.title}></SubCounter1>
    </>
  }
}

class SubCounter extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { num: 0 }
  }

  add = () => {
    this.setState({
      num: this.state.num + 1
    })
  }

  addSame = () => {
    this.setState({
      num: this.state.num
    })
  }

  render() {
    console.log('subCounter render')
    return <>
      <div>{this.props.title}</div>
      <div>{this.state.num}</div>
      <button onClick={this.add}>加一</button>
      <button onClick={this.addSame}>加0</button>
    </>
  }
}

const SubCounter1 = memo(function (props) {
  console.log('render function component')
  return <div>函数式组件：{props.title}</div>
})


ReactDom.render(<Counter></Counter>, document.getElementById('root'))
/**
 * 总结:
 * 当 props 或者 state 浅比较没变化时，不会重新 render
 * 【React.PureComponent】
 * - 类组件的新旧 state、props 浅比较发生改变时，才重新执行 render
 * - 实现思路：生成一个继承了 React.Component 且含有 shouldComponent 的类，在 shouldComponent 中通过浅比较 props 和 state 决定是否渲染
 * 
 * 【React.memo】
 * - 函数组件新旧 props 浅比较发生改变时，才重新执行 render
 * - 实现思路：在函数组件外层包一层 类组件，由类组件的 shouldComponent 控制
 */

