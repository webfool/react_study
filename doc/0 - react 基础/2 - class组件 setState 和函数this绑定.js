import React from 'react'
import ReactDom from 'react-dom'
// import React from './myReact/react'
// import ReactDom from './myReact/react-dom'

// 目标：state 的使用；setState 的异步更新；函数的this绑定

class Counter extends React.Component {
  constructor (props) {
    super(props)

    // 设置默认 state
    this.state = {num: 1}
  }

  // 类方法直接用 = 号赋值，则会定义在实例对象上，否则是定义在原型上
  add = () => {
    //   this.setState({num: this.state.num + 1})

    // 多次设置 this.setState(updater, cb)，先依次执行完 updater，再依次执行 cb
    this.setState(function (state, props) {
      return {num: state.num + props.step}
    }, () => {
      console.log('num ->', this.state.num) // 5
    })

    this.setState(function (state, props) {
      return {num: state.num + props.step}
    }, () => {
      console.log('num ->', this.state.num) // 5
    })
  }

  render () {
    return <>
      <span>{this.state.num}</span>
      <button onClick={this.add}>+</button>
    </>
  }
}

ReactDom.render(<Counter step={2}></Counter>, document.getElementById('root'))

/**
 * 总结:
 * 
 * 【函数this绑定的方式有4种】：推荐使用前2种，因为后2种每次 render 都会生成新的函数
 * 1、类定义方法时，通过 = 号赋值箭头函数（最推荐）
 * 2、在 constructor 内通过 this.add = this.add.bind(this)
 * 3、render 中添加回调时：onClick={this.add.bind(this)}
 * 4、render 中添加回调时：onClick={() => this.add()}
 * 
 * 【setState】
 * 1、异步更新
 * 2、setState 的所有回调会在所有异步更新之后执行
 */

