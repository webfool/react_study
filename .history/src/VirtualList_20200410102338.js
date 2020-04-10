import React from 'react'
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
        template({ index: i, data: items[i] }))
    }

    return <div style={containerStyle} ref={this.containerRef} onScroll={this.scroll}>
      <div style={innerStyle}>
        {children}
      </div>
    </div>
  }
}

export default VirtualList