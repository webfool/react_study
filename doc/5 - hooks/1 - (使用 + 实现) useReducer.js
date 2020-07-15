import React, {useState, useCallback, useMemo, useReducer} from 'react'
// import React, {useState, useCallback, useMemo} from 'react'
// import React from 'react'
import ReactDOM from 'react-dom'

/**
 * useReducer：用于状态管理，包含3个要素：
 * - 状态
 * - reducer: 接受旧状态和 action，返回新状态
 * - dispatch：接收 action，并传给当前传入函数的 reducer
 */

/**
 * 手写 useReducer：
 * - 每次调用都能返回最新的状态值；且返回的 dispatch 依赖最新的 reducer 
 */

// let memoizedState
// function useReducer(reducer, initialArg, init) {

//   function dispatch(action) {
//     memoizedState = reducer(memoizedState, action)
//     render()
//   }

//   memoizedState = memoizedState || (typeof init === 'function' ? init(initialArg) : initialArg)
//   return [memoizedState, dispatch]
// }


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
  console.log('state ->', state)

  return <>
    <button onClick={() => dispatch({type: 'add'})}>{state.number}</button>
    <button onClick={() => dispatch({type: 'dec'})}>{state.number}</button>
  </>
}

function render() {
  ReactDOM.render(<Counter/>, document.getElementById('root'))
}

render()

