// import React, {useState, useCallback, useMemo} from 'react'
import React, {useState, useCallback} from 'react'
// import React from 'react'
import ReactDOM from 'react-dom'

/**
 * useMemo
 * 是什么：缓存函数返回值
 * 为什么需要：每次渲染都会重新触发函数组件执行，对于复杂计算会影响性能
 */

/**
  * 手写 useMemo 功能：
  * - 每次调用时，依赖项不变，返回之前缓存的值；依赖项变化，重新执行方法，并缓存返回值
  */

let memoizedState
let memoizedDeps
function useMemo(fn, deps) {
  if (!memoizedDeps || !deps.every((v, i) => v === memoizedDeps[i])) {
    memorizedState = fn()
    memoizedDeps = deps
  }

  return memoizedState
}

function Counter () {
  const value = useMemo(() => {
    console.log('cb')
    return 'abc'
  }, [1])

  console.log('value ->', value)
  const [time, setTime] = useState(1)
  return <>
    <button onClick={() => setTime(time + 1)}>{time}</button>
  </>
}

function render() {
  ReactDOM.render(<Counter/>, document.getElementById('root'))
}

render()

