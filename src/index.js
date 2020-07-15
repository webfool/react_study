// import React, {useState, useEffect, useRef} from 'react'
import React, {useState, useRef} from 'react'
import ReactDOM from 'react-dom'

/**
 * useEffect
 * - 第一次渲染一定会执行回调，后续渲染可以通过依赖项控制回调是否执行，如果为空数组，则只会在第一次渲染的时候调用
 * - 回调中可以返回清除副作用的函数，它将会在下次重新执行回调或卸载组件之前被调用
 * - 回调的执行时机是在组件渲染到屏幕之后
 */

/**
 * 手写实现 useEffect:
 * - 调用时，如果依赖变化，则在渲染完之后重新执行回调
 * - 重新执行回调之前需要清除之前缓存的副作用
 */
let memoizedStates = []
let index = 0

function useEffect(fn, deps) {
  const current = memoizedStates[index]
  if (!current || !current.deps || !deps || !deps.every((v, i) => v === current.deps[i])) {
    const currentIndex = index
    setTimeout(() => {
      current && current.unEffect && current.unEffect()
      const unEffect = fn()
      memoizedStates[currentIndex] = {deps, unEffect}
    })
  }
  index++
}

function Parent () {
  const [visible, setVisible] = useState(true)

  function hidden() {
    setVisible(false)
    const states = memoizedStates.slice(0)
    index = 0
    memoizedStates = []
    states.forEach(item => item && item.unEffect && item.unEffect())
  }
  return <>
    {visible && <Child />}
    <button onClick={hidden}>隐藏</button>
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
      return () => {console.log('cancel')}
    }
  })

  // 此处模拟 componentWillUnmount
  useEffect(() => {
    return () => {
      console.log('componentWillUnmount')
    }
  }, [])

  return <button onClick={() => {index = 0; setTime(time + 1)}}>{time}</button>
}

function render() {
  ReactDOM.render(<Parent/>, document.getElementById('root'))
}

render()

