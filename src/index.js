import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import { createStore, bindActionCreators } from 'redux'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'

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

const logger1 = store => dispatch => action => {
  console.log('before1 ->', store.getState())
  const result = dispatch(action)
  console.log('after1 ->', store.getState())

  return result
}

const store = applyMiddleware(thunk, promiseMiddleware, logger1)(createStore)(reducer, 0)


const actions = bindActionCreators({
  add() {
    return {type: 'add'}
  },
  del() {
    return {type: 'del'}
  },
  asyncAdd() {
    return (dispatch) => {
      setTimeout(() => {
        dispatch({
          type: 'add'
        })
      }, 1000)
    }
  },
  promiseAdd() {
    return {
      type: 'add',
      payload: new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(1)
        }, 1000)
      })
    }
  }

}, store.dispatch)

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

  render() {
    return <>
      <div>{this.state.num}</div>
      <button onClick={actions.add}>+</button>
      <button onClick={actions.del}>-</button>
      <button onClick={actions.asyncAdd}>异步+</button>
      <button onClick={actions.promiseAdd}>promise +</button>
    </>
  }

}

ReactDOM.render(<Counter/>, document.getElementById('root'))


