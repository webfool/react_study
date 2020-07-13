import React, {useState, useCallback, useMemo, useContext, useEffect, useRef} from 'react'
// import React from 'react'
import ReactDOM from 'react-dom'

/**
 * useEffect
 * - 第一次渲染一定会执行回调，后续渲染可以通过依赖项控制回调是否执行，如果为空数组，则只会在第一次渲染的时候调用
 * - 回调中可以返回清除副作用的函数，它将会在下次重新执行回调或卸载组件之前被调用
 * - 回调的执行时机是在组件渲染到屏幕之后
 */

function Parent () {
  const [visible, setVisible] = useState(true)

  return <>
    {visible && <Child />}
    <button onClick={() => setVisible(false)}>隐藏</button>
  </>
}

function Child () {
  const [time, setTime] = useState(1)

  // 此处模拟 componentDidMount
  useEffect(() => {
    console.log('componentDidMount')
  }, [])

  // 此处模拟 componentDidUpdate
  const mounted = useRef()
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    } else {
      console.log('componentDidUpdate')
    }
  })

  // 此处模拟 componentWillUnmount
  useEffect(() => {
    return () => {
      console.log('componentWillUnmount')
    }
  }, [])

  return <button onClick={() => setTime(time + 1)}>{time}</button>
}

function render() {
  ReactDOM.render(<Parent/>, document.getElementById('root'))
}

render()

