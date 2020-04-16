import React, {Component} from 'react'
import {connect} from 'react-redux'
import counterActions from './store/actions/counter'

class Counter extends Component {
  render () {
    return <>
      <div>
        {this.props.num}
      </div>
      <button onClick={this.props.add}>+</button>
      <button onClick={this.props.del}>-</button>
    </>
  }
}

export default connect(state => state.counter, counterActions)(Counter)

