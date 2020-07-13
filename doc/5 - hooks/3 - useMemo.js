import React, {useState, useCallback, useMemo} from 'react'
// import React from 'react'
import ReactDOM from 'react-dom'

/**
 * useMemo
 * 是什么：缓存函数返回值
 * 为什么需要：每次渲染都会重新触发函数组件执行，对于复杂计算会影响性能
 */
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

