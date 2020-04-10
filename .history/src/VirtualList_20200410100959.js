import React from 'react'
import ReactDom from 'react-dom'
import propTypes from 'prop-types'

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
    console.log('scroll')
    this.setState({
      start: Math.ceil(this.containerRef.current.scrollTop / this.itemSize) - 1
    })
  }

  render() {
    const { height, items, itemSize } = this.props
    const containerStyle = { height: height, border: '3px solid red', overflow: 'auto' }
    const innerStyle = { height: items.length * itemSize + 'px', position: 'relative' }
    const start = this.state.start
    const scrollTop = this.containerRef.current ? this.containerRef.current.scrollTop : 0
    console.log('scrollTop ->', scrollTop)
    const end = Math.ceil((scrollTop + height) / itemSize) - 1
    const template = this.props.children
    const children = []
    for (let i = start; i <= end; i++) {
      children.push(
        <div key={i} style={{ position: 'absolute', left: 0, top: i * itemSize }}>{template({ index: i, data: items[i] })}</div>)
    }

    return <div style={containerStyle} ref={this.containerRef} onScroll={this.scroll}>
      <div style={innerStyle}>
        {children}
      </div>
    </div>
  }
}

export default VirtualList