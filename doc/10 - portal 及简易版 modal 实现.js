import React from 'react'
import ReactDom from 'react-dom'
import './myStyle.css'

// 目标：1、Portals 的使用 2、手写模态框

class Modal extends React.Component {
  render() {
    return ReactDom.createPortal(<>
      <div className="modal-container">
        <div className="modal-content">
          {this.props.children}
        </div>
      </div>
    </>, document.getElementById('modal'))
  }
}

const ModalContext = React.createContext()
class GrandParent extends React.Component {
  constructor() {
    super()
    this.state = { title: 'grandParent' }
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({
        title: 'new GrandParent'
      })
    }, 2000)
  }

  click = () => {
    console.log('grandParent click')
  }

  render() {
    return <div onClick={this.click}>
      <ModalContext.Provider value={this.state.title}>
        <Parent />
      </ModalContext.Provider>
    </div>
  }
}

function Parent() {
  return <Child></Child>
}
class Child extends React.Component {
  static contextType = ModalContext

  constructor(props) {
    super(props)
    this.state = { showModal: false }
  }

  toggle = () => {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  click = () => {
    console.log('child click')
  }

  render() {
    const comp = this.state.showModal
      ? <Modal>
        <div>我的祖父标题是: {this.context}</div>
        <div>这是a</div>
        <div>这是b</div>
        <button onClick={this.toggle}>关闭</button>
      </Modal>
      : <span>这是普通的</span>

    return <>
      <div onClick={this.click}>
        <button onClick={this.toggle}>切换</button>
        {comp}
      </div>
    </>
  }
}

ReactDom.render(<GrandParent></GrandParent>, document.getElementById('root'))
/**
 * 总结:
 * 1、ReactDom.createPortal(element, dom) 可为其它 dom 插入元素
 * 2、插入的元素的事件冒泡即包含dom树上的冒泡，也包括 react 树上的冒泡
 * 3、context 依旧可以控制通过 portal 生成的元素
 */

