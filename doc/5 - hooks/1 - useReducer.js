import React, {useState, useCallback, useMemo, useReducer} from 'react'
// import React from 'react'
import ReactDOM from 'react-dom'

/**
 * useReducer：用于状态管理，包含3个要素：
 * - 状态
 * - reducer: 接受旧状态和 action，返回新状态
 * - dispatch：接收 action，并传给 reducer
 */
function reducer(state, action) {
  switch(action.type) {
    case 'add':
      return {number: state.number + 1}
    case 'dec':
      return {number: state.number - 1}
    default:
      return state
  }
}

function Counter () {
  const initialState = 1
  function init(state) {
    return {number: state}
  }

  const [state, dispatch] = useReducer(reducer, initialState, init)

  return <>
    <button onClick={() => dispatch({type: 'add'})}>{state.number}</button>
  </>
}

function render() {
  ReactDOM.render(<Counter/>, document.getElementById('root'))
}

render()

