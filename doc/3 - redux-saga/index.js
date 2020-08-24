import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Provider, connect} from 'react-redux'

import store from './store'
import counterActions from './store/actions/counter'

const Counter = connect(({counter}) => ({counter}), counterActions)(
  class extends Component {
    render() {
      return <>
        <div>{this.props.counter}</div>
        <button onClick={this.props.add}>+</button>
        <button onClick={this.props.del}>-</button>
        <button onClick={this.props.cancel}>cancel</button>
      </>
    }
  }
)

ReactDOM.render(<Provider store={store}>
  <Counter />
</Provider>, document.getElementById('root'))


