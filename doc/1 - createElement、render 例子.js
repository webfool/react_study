// import React from 'react'
// import ReactDom from 'react-dom'
import React from './myReact/react'
import ReactDom from './myReact/react-dom'

// 函数式组件
function Welcome (props) {
  return React.createElement('span', {
    className: props.className,
    style: props.style
  }, `Welcome: hello ${props.children}`)
}

// 类组件
class Welcome2 extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return React.createElement('span', {
      className: this.props.className,
      style: this.props.style
    }, `Welcome2：hello ${this.props.children}`)
  }
}

const element = React.createElement(Welcome2, {
  className: 'test',
  style: {color: 'red', fontSize: '50px'}
}, 'hw')

console.log('element ->', element)
ReactDom.render(element, document.getElementById('root'))

