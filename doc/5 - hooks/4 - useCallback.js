import React, {useState, useCallback} from 'react'
// import React from 'react'
import ReactDOM from 'react-dom'

/**
 * useCallback
 * 是什么：缓存回调函数
 * 为什么需要：每次重新渲染时会重新执行函数，生成的回调都是新的，但有时不需要每次都用新回调
 * 
 * useCallback(fn, deps) 相当于 useMemo(() => fn, deps)
 */
let beforeCb
function Counter () {
  const cb = useCallback(() => console.log('cb'), [Math.random()])
  console.log('equal =>', cb === beforeCb)
  beforeCb = cb

  const [time, setTime] = useState(1)
  return <>
    <button onClick={() => setTime(time + 1)}>{time}</button>
  </>
}

function render() {
  ReactDOM.render(<Counter/>, document.getElementById('root'))
}

render()

