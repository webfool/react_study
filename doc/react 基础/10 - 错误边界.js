import React from 'react'
import ReactDom from 'react-dom'

// 目标：定义错误边界，并测试触发错误边界

class ErrorBoundary extends React.Component { // 错误边界必须是 class 组件
  constructor () {
    super()
    this.state = {hasError: false}
  }

  static getDerivedStateFromError (error) { // 此处用来降级ui
    return {
      hasError: true
    }
  }

  componentDidCatch (error, info) { // 此处用来记录错误
    console.log('error ->', error)
    console.log('info ->', info)
  }

  render () {
    return <>
      {
        this.state.hasError ? <span>错误发生了</span> : this.props.children
      }
    </>
  }
}

class Child extends React.Component {
  componentDidMount () {
    null.toString()
    
  }

  render () {
    return <>
      <span>这是 child</span>
    </>
  }
}


ReactDom.render(<ErrorBoundary>
  <Child></Child>
</ErrorBoundary>, document.getElementById('root'))
/**
 * 总结:
 * 通过 getDerivedStateFromError 降级 ui，通过 componentDidCatch 记录错误
 */

