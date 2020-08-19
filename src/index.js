import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import { createStore } from 'redux'

// 返回一个组合函数，它内部从 fns 最后一个往前执行至第一个
function compose(...fns) {
  return fns.reduce((a, b) => (...args) => a(b(...args)))
}

// applyMiddleware 的作用：传入一堆中间件用于装饰 dispatch 方法
function applyMiddleware (...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args)

    let dispatch
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    middlewares = middlewares.map(middleware => middleware(middlewareAPI))
    dispatch = compose(...middlewares)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}

function reducer(state, action) {
  if (action.type === 'add') return state + 1
  if (action.type === 'del') return state - 1
  return state
}

// const store = createStore(reducer, 0)
const logger1 = store => dispatch => action => {
  console.log('before1 ->', store.getState())
  dispatch(action)
  console.log('after1 ->', store.getState())
}

const logger2 = store => dispatch => action => {
  console.log('before2 ->', store.getState())
  dispatch(action)
  console.log('after2 ->', store.getState())
}
const store = applyMiddleware(logger1, logger2)(createStore)(reducer, 0)


class Counter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      num: store.getState()
    }
  }

  componentDidMount() {
    store.subscribe(() => {
      this.setState({
        num: store.getState()
      })
    })
  }

  add = () => {
    store.dispatch({
      type: 'add'
    })
  }

  del = () => {
    store.dispatch({
      type: 'del'
    })
  }

  render() {
    return <>
      <div>{this.state.num}</div>
      <button onClick={this.add}>+</button>
      <button onClick={this.del}>-</button>
    </>
  }

}

ReactDOM.render(<Counter/>, document.getElementById('root'))


