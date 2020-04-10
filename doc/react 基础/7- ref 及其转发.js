import React from 'react'
import ReactDom from 'react-dom'
// import React from './myReact/react'
// import ReactDom from './myReact/react-dom'

// 目标：1、ref的3种设置方式 2、函数组件的 ref 转发

class Counter extends React.Component {
  constructor (props) {
    super(props)

    // 设置默认 state
    this.span = React.createRef()
    this.child = React.createRef()
    this.child2 = React.createRef()
  }

  getRef = () => {
    console.log('span ->', this.span)
    console.log('child ->', this.child)
    console.log('child2 ->', this.child2)
  }

  render () {
    return <>
      <span ref={this.span}>{1}</span>
      <Child ref={this.child}></Child>
      <Child2 ref={this.child2}></Child2>
      <button onClick={this.getRef}>获取Ref</button>
    </>
  }
}

class Child extends React.Component {
  constructor (props) {
    super(props)
    this.state = {name: 'child'}
  }
  render () {
    return <h1>child</h1>
  }
}

// 通过 forwardRef 转发 ref
const Child2 = React.forwardRef((props, ref) => {
  return <h1 ref={ref}>child2</h1>
})

ReactDom.render(<Counter></Counter>, document.getElementById('root'))

/**
 * 总结:
 * 
 * 类组件或者dom都可以设置 ref属性，渲染之后会将组件实例或者 dom 元素通过 ref 存储起来（函数式组件不支持 ref）
 * ref 的值可以设置为三种：
 * 1、【字符串】，存到 this.refs[字符串]
 * 2、【函数】，将组件实例或者 dom 元素传入函数
 * 3、【通过 React.createRef() 生成的对象】，组件实例会存到对象的 current 属性中
 * 
 * 函数组件默认不能定义 ref，即使定义了 props 也拿不到，需要通过 React.forwardRef 转发
 */

