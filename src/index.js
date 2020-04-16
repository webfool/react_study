import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {bindActionCreators} from 'redux'
import store from './store'
import counterActions from './store/actions/counter'
// import VirtualList from '../doc/react优化/VirtualList'

const bindCounterActions = bindActionCreators(counterActions, store.dispatch)

class Counter extends Component {
  constructor () {
    super()
    this.state = {value: store.getState().counter}
  }

  componentDidMount () {
    this.listener = store.subscribe(() => {
      this.setState({
        value: store.getState().counter
      })
    })
  }

  componentWillUnmount () {
    this.listener()
  }

  render () {
    return <>
      <div>{this.state.value}</div>
      <button onClick={bindCounterActions.add}>+</button>
      <button onClick={bindCounterActions.del}>-</button>
    </>
  }
}


ReactDOM.render(<Counter></Counter>, document.getElementById('root'))
// function getRandomColor () {
//   const rand = Math.floor((Math.random() * 0xFFFFFF)).toString(16).toUpperCase()
//   if (rand.length === 6) return '#' + rand
//   return getRandomColor()
// }

// const Child = (props) => {
//   return <div style={{background: getRandomColor()}}>{props.index} : {props.name}</div>
// }

// const items = Array.from({length: 1000}).map((item, index) => {
//   return {name: 'hw' + index}
// })

// const props = {items, itemSize: 30, height: 100}

// ReactDOM.render(<VirtualList {...props}>
//   {(p) => <Child {...p}></Child>}
// </VirtualList>, document.getElementById('root'))

