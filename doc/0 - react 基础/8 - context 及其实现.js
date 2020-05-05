import React from 'react'
import ReactDom from 'react-dom'

// 目标：1、新版 context 的使用  2、新版 context 的实现 3、旧版 context 的使用
function createContext() {
  class Provider extends React.Component {
    static value;
    constructor(props) {
      super(props)
      this.state = {}
    }

    static getDerivedStateFromProps(props, state) {
      Provider.value = props.value
      return null
    }

    render() {
      return this.props.children
    }
  }

  class Consumer extends React.Component {
    render () {
      return this.props.children(Provider.value)
    }
  }

  return {
    Provider,
    Consumer
  }
}

// const ThemeContext = React.createContext({ name: 'qs', age: 18 })
const ThemeContext = createContext()

class GrandParent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { title: 'hhh', me: { name: 'hw', age: 25 } }
  }

  add = () => {
    this.setState({
      me: { name: 'liu', age: 26 }
    })
  }

  changeTitle = () => {
    this.setState({
      title: 'eeeee'
    })
  }

  render() {
    const { me } = this.state
    return <>
      <div>{this.state.title}</div>
      <button onClick={this.changeTitle}>改标题</button>
      <br />

      <button onClick={this.add}>改一下</button>
      <div>GrandParent: </div>
      <ThemeContext.Provider value={me}>
        <Parent></Parent>
      </ThemeContext.Provider>
    </>
  }
}

class Parent extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <>
      <div>Parent: </div>
      <Child1></Child1>
    </>
  }
}
class Child1 extends React.Component {
  // static contextType = ThemeContext // 原生react下，contextType 的值会赋值给实例化对象的 context 属性
  static myContext = ThemeContext

  render() {
    this.context = Child1.myContext.Provider.value

    return <>
      <div>Child1: </div>
      <div>{this.context.name}</div>
      <Child2></Child2>
    </>
  }
}

class Child2 extends React.Component {
  render() {
    return <ThemeContext.Consumer>
      {
        value => {
          return <>
            <div>Child2：</div>
            <div>{value.age}</div>
          </>
        }
      }
    </ThemeContext.Consumer>
  }
}

ReactDom.render(<GrandParent></GrandParent>, document.getElementById('root'))
/**
 * 总结:
 * 
 * === 新版 context 的使用 ===
 * - 通过 React.createContext 生成 context，context 的 Provider 用来注入值，Provider 下的子组件或者 Consumer 用来消费值
 * - 类组件通过 static contextType 消费；函数组件通过 Consumer 进行消费
 * - 如果需要修改注入的值，需通过注入修改方法，调用其进行修改
 *
 * === 新版 createContext 的实现思路（返回的对象 {Provider, Consumer}）===
 * 【Provider】：
 * - 为了使子组件生成的每个实例都能通过 Context 生成 this.context 属性，那么应该将 Context 作为子组件的静态属性；
 * - 为了使 Context 变化时，能够使子组件更新，需要使子组件被一个组件包裹，即 Provider 得是一个组件
 * 
 * 【Consumer】:
 * - Consumer 是个组件，且传递给组件的内容应该是个 renderProps
 * 
 * 
 * 
 * === 旧版 context 的使用 ===
 */

