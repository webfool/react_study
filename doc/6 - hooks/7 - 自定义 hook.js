import React, {useState, useEffect, useRef} from 'react'
// import React from 'react'
import ReactDOM from 'react-dom'


/**
 * 自定义 hook：
 * - 名称以 use 开头
 * - 重用的是状态逻辑，所以每次使用，其状态和副作用是完全隔离的
 */
function useLogger() {
  const [value, setValue] = useState(0)

  function setWithLogger(newVal) {
    console.log('logger new value ->', newVal)
    console.log('logger old value ->', value)
    setValue(newVal)
  }

  return [value, setWithLogger]
}

function Child1 () {
  const [value, setValue] = useLogger()
  return <>
    <button onClick={() => setValue(value + 1)}>{value}</button>
  </>
}

function Child2 () {
  const [value, setValue] = useLogger()
  return <>
    <button onClick={() => setValue(value + 1)}>{value}</button>
  </>
}

function render() {
  ReactDOM.render(<>
    <Child1 />
    <Child2 />
  </>, document.getElementById('root'))
}

render()

