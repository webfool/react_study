import React from 'react'
import ReactDom from 'react-dom'

// 目标：1、新旧生命周期的顺序  2、不同生命周期接收的参数  3、不同生命周期应该做什么

class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = { name: 'hw', num: 1 }
  }

  change = () => {
    this.setState({
      name: 'liu'
    })
  }
  render() {
    return <>
      <button onClick={this.change}>改变</button><span>{this.state.num}</span>
      <br />
      <SubCounter2 name={this.state.name}></SubCounter2>
    </>
  }
}

// 旧生命周期组件
class SubCounter extends React.Component {
  constructor(props) {
    super(props)
    this.state = { num: 1 }
    console.log('constructor')
  }

  componentWillMount() {
    console.log('componentWillMount')
  }

  componentDidMount() {
    console.log('componentDidMount')
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps')
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate')
    return true
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate')
  }

  componentDidUpdate(prevProps, preState, snapshot) {
    console.log('componentDidUpdate')
  }


  change = () => {
    this.setState({
      num: 2
    })
  }

  render() {
    console.log('render')
    return <>
      <span>子组件：{this.state.num}</span>
      <br />
      <button onClick={this.change}>修改state</button>
    </>
  }

}

// 新生命周期组件
class SubCounter2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = { name: props.name }
    console.log('constructor')
  }

  static getDerivedStateFromProps(props, {preProps}) {
    // 传入的 props 和 state 是组件最新的状态
    if (!preProps || preProps.name !== props.name) {
      return {
        preProps: props,
        name: props.name
      }
    }

    return null
  }

  componentDidMount() {
    console.log('componentDidMount')
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate')
    return true
  }

  // === 更新时：render this.state/this.props都是新的，所以之后的生命周期的传参都是更新前的数据 ===

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate')
    return null
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate')
  }

  change = () => {
    this.setState({
      name: Math.random().toFixed(2) + 'hhh'
    })
  }

  render() {
    console.log('render')
    return <>
      <span>{this.state.name}</span>
      <br />
      <button onClick={this.change}>修改状态</button>
    </>
  }
}


ReactDom.render(<Counter></Counter>, document.getElementById('root'))
/**
 * 总结:
 * 1、
 * 旧版生命周期顺序：
 * - 创建阶段：constructor【初始化state和方法】 -> componentWillMount【没啥用】 -> render -> componentDidMount【数据请求、订阅、操作dom】
 * - 更新阶段：componentWillReceiveProps【同步修改state】 -> shouldComponentUpdate【优化：确定组件是否更新】 -> componentWillUpdate【存储更新前的 dom 或者其它数据】 -> render -> componentDidUpdate 【数据请求、订阅、操作dom】
 * 
 * 旧版生命周期顺序
 * - 创建阶段：constructor【初始化state和方法】 -> getDerivedStateFromProps【派生 state】 -> render -> componentDidMount【数据请求、订阅、操作dom】
 * - 更新阶段：getDerivedStateFromProps 【派生state】 -> shouldComponentUpdate【优化：确定组件是否更新】-> render -> getSnapshotBeforeUpdate【获取更新前的快照信息】 -> componentDidUpdate 【数据请求、订阅、操作dom】
 * 
 * 2、传参：render 之后 this.props/this.state 都是最新的，所以传参进来的都是旧数据
 * - 旧版生命周期中，componentWillUpdate 在 render 之前触发，所以只有 componentDidUpdate 传入的参数是旧数据，其它都是新数据
 * - 新版生命周期中，getSnapshotBeforeUpdate 在 render 之后触发，所以 getSnapshotBeforeUpdate 和 componentDidUpdate 传入的参数是旧数据，其它是新数据
 * ,
 * 3、props 控制 state 的一些方案：
 * - 完全受控组件
 * - 带key重新渲染
 * - getDerivedStateFromProps 派生
 * - 子组件通过 ref 暴露重置 state 的方法
 */

