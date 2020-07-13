import React, {useState} from 'react'
// import React from 'react'
import ReactDOM from 'react-dom'

/**
 * useState：用于状态管理（将状态同步到渲染），它包含2个因素：
 * - 状态
 * - 初始化/修改状态：修改状态时会触发重新渲染
 * 
 * 等同于 class 组件的状态管理功能(state、和 setState)。
 * 
 * 应用：函数式组件内的状态管理
 * 使用方式：初始化/修改值时，可以直接传入值，也可以传入方法
 * 
 * 底层通过 useReducer 实现：useState(state) 相当于 useReducer((oldState, newState) => newState, state)
 */

 // 手写 useState 功能
// let memoizedState
// function useState(initialState) {
//   memoizedState = memoizedState || initialState

//   function setState(newState) {
//     memoizedState = newState
//     render()
//   }
//   return [memoizedState, setState]
// }

function Counter () {
  console.log('render')
  const [time, setTime] = useState(1)
  const [time2, setTime2] = useState(() => 2)
  const [name, setName] = useState('hw')

  return <>
    {/* 通过值直接初始化/修改状态 */}
    <button onClick={() => setTime(time + 1)}>counter {time}</button>

    {/* 通过函数初始化/修改状态 */}
    <button onClick={() => setTime2((val) => val + 1)}>counter {time2}</button>

    {/* 新旧状态相同时，不触发更新 */}
    <div style={{cursor: 'pointer'}} onClick={() => setName((name) => `${name}`)}>{name}</div>
  </>
}

function render() {
  ReactDOM.render(<Counter/>, document.getElementById('root'))
}

render()

