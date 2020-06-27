import React from 'react'
import ReactDom from 'react-dom'

// 目标：1、HOC 的使用  2、多层嵌套的 HOC

function logger (Component) {
  return class extends React.Component {
    componentWillMount () {
      this.startTime = Date.now()
    }

    componentDidMount () {
      console.log('render Time ->', Date.now() - this.startTime, 'ms')
    }
    render () {
      return <Component {...this.props}></Component>
    }
  }
}

class UserName extends React.Component {
  constructor (props) {
    super(props)
    this.state = {name: ''}
  }

  static getDerivedStateFromProps (props, {preProps}) {
    if (!preProps || props.value !== preProps.value) {
      return {
        name: props.value,
        preProps: props
      }
    }
    return null
  }

  change = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  render () {
    return <input type="text" value={this.state.name} onChange={this.change}/>
  }
}

function localNameWrapper (Component, key) {
  return class extends React.Component {
    constructor (props) {
      super(props)
      this.state = {value: ''}
    }

    static getDerivedStateFromProps (props, {preProps}) {
      if (!preProps || props.value !== preProps.value) {
        return {
          value: props.value,
          preProps: props
        }
      }
      return null
    }

    componentDidMount () {
      this.setState({
        value: localStorage.getItem(key)
      })
    }

    render () {
      return <Component {...this.props} value={this.state.value}/>
    }
  }
}

function ajaxWrapper (Component) {
  return class extends React.Component {
    constructor (props) {
      super(props)
      this.state = {value: ''}
    }

    componentDidMount () {
      setTimeout(() => {
        this.setState({
          value: 'fromAjax'
        })
      }, 2000)
    }
    render () {
      return <Component {...this.props} value={this.state.value}/>
    }
  }
}


const LastName = ajaxWrapper(localNameWrapper(UserName, 'name'))

ReactDom.render(<LastName />, document.getElementById('root'))
/**
 * 总结: 
 * 高阶组件（hoc) 指传入一个组件，再返回一个组件。通常是在传入组件的渲染前后做一些装饰处理。
 * hoc多层嵌套将会使代码变得复杂。
 */

