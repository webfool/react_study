import React, {} from 'react'
// import React from 'react'
import ReactDOM from 'react-dom'

/**
 * 手写 useState 功能(函数内多次调用 useState):
 * - 多个 useState 调用能取到其对应的值
 * - 修改值能触发重新渲染
 */
let memoizedStates = []
let index = 0
function useState(value) {
  memoizedStates[index] = memoizedStates[index] || value

  const currentIndex = index
  function setState(val) {
    memoizedStates[currentIndex] = val
    render()
  }

  return [memoizedStates[index++], setState]
}

function Counter () {
  const [time, setTime] = useState(1)
  const [name, setName] = useState('hw')

  return <>
    {/* 通过值直接初始化/修改状态 */}
    <button onClick={() => setTime(time + 1)}>counter {time}</button>

    {/* 新旧状态相同时，不触发更新 */}
    <button onClick={() => setName(`hw-${Math.ceil(Math.random() * 100)}`)}>{name}</button>
  </>
}

function render() {
  index = 0 // 此处需要重置 index
  ReactDOM.render(<Counter/>, document.getElementById('root'))
}

render()

