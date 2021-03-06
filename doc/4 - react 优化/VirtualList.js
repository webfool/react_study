import React from 'react'
import propTypes from 'prop-types'

/**
 * 虚拟滚动组件
 * 设计目的：只渲染可视区内的元素
 * 设计思路：
 * - 滚动条：添加一个div，使其高度等于原来所有元素都渲染时的高度，从而渲染出滚动条
 * - 可视元素：监听父 div 的滚动，通过 scrollTop 算出当前应该被显示的元素
 * - 位置：筛选出的元素计算它相对父元素的绝对位置，使其它显示在可视区内
 */
class VirtualList extends React.Component {
  static propTypes = {
    height: propTypes.number,
    itemSize: propTypes.number,
    items: propTypes.array
  }

  constructor() {
    super()
    this.state = { start: 0 }
    this.containerRef = React.createRef()
  }

  scroll = () => {
    this.setState({
      start: Math.ceil(this.containerRef.current.scrollTop / this.props.itemSize) - 1
    })
  }

  render() {
    const { height, items, itemSize } = this.props
    const containerStyle = { height: height, border: '3px solid red', overflow: 'auto' }
    const innerStyle = { height: items.length * itemSize + 'px', position: 'relative' }
    const start = this.state.start
    const scrollTop = this.containerRef.current ? this.containerRef.current.scrollTop : 0
    const end = Math.ceil((scrollTop + height) / itemSize) - 1
    const template = this.props.children
    const children = []
    for (let i = start; i <= end; i++) {
      children.push(
        <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: i * itemSize }}>{template({ index: i, data: items[i] })}</div>)
    }

    return <div style={containerStyle} ref={this.containerRef} onScroll={this.scroll}>
      <div style={innerStyle}>
        {children}
      </div>
    </div>
  }
}

export default VirtualList