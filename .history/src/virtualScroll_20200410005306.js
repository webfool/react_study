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
    return <div style={{height: this.props.height}}>
      
    </div>
  }
}