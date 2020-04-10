import React from 'react'
import ReactDom from 'react-dom'
import propTypes from 'prop-types'

class VirtualList extends React.Component {
  static propTypes = {
    height: propTypes.number,
    itemSize: propTypes.number,
    items: propTypes.array
  }

  constructor () {
    super()
    this.state = {start: 0}
    this.containerRef = React.createRef()
  }

  render () {
    const {height, items, itemSize} = this.props
    const containerStyle = {height: height, border: '3px solid red'}
    const innerStyle = {height: items.length * itemSize + 'px'}
    const start = this.state.start
    const end = Math.ceil((this.containerRef.current.scrollTop + height) / itemSize)
    const template = this.props.children
    for (let i = start; )

    return <div style={containerStyle} ref={this.containerRef}>
      <div style={innerStyle}>

      </div>
    </div>
  }
}