import React, {useState, useCallback} from 'react'
// import React, {useState} from 'react'
// import React from 'react'
import ReactDOM from 'react-dom'

/**
 * useCallback：缓存函数及其对应的依赖
 * 因为每次重新渲染时会重新执行组件，生成新的回调函数，但有时并不需要每次都用新回调
 * 
 * useCallback(fn, deps) 相当于 useMemo(() => fn, deps)
 */

/**
  * 手写 useCallback 功能：
  * - 依赖不变时，每次获取都是缓存的 cb；依赖变化时，缓存新 cb
  */
// let memoizedState
// let memoizedDeps
// function useCallback (cb, deps) {
//   if (!memoizedDeps || !deps.every((v, i) => v === memoizedDeps[i])) {
//     memoizedState = cb
//     memoizedDeps = deps
//   }
//   return memoizedState
// }

let beforeCb
function Counter () {
  const [time, setTime] = useState(1)

  const cb = useCallback(() => console.log('cb'), [time])
  console.log('equal =>', cb === beforeCb)
  beforeCb = cb

  return <>
    <button onClick={() => setTime(time + 1)}>{time}</button>
  </>
}

function render() {
  ReactDOM.render(<Counter/>, document.getElementById('root'))
}

render()

