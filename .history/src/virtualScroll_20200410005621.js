import React from 'react'
import ReactDom from 'react-dom'
import propTypes from 'prop-types'

class VirtualList extends React.Component {
  static propTypes = {
    height: propTypes.number,
    itemSize: propTypes.number,
    items: propTypes.array
  }

  render () {
    const containerStyle = {height: this.props.height, border: '3px solid red'}
    return <div style={containerStyle}>
      <div style={{height: this.items.length * this.itemSize}}>
        
      </div>
    </div>
  }
}