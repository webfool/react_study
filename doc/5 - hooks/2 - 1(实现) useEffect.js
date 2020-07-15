// import React, {useState, useEffect, useRef} from 'react'
import React, {useState, useRef} from 'react'
import ReactDOM from 'react-dom'

/**
 * 手写实现 useEffect:
 * - 调用时，如果依赖变化，则在渲染完之后重新执行回调
 * - 重新执行回调之前需要清除之前缓存的副作用
 * - 组件注销时，清除所有副作用
 */
let memoizedStates = []
let index = 0

function useEffect(fn, deps) {
  const current = memoizedStates[index]
  if (!current || !current.deps || !deps || !deps.every((v, i) => v === current.deps[i])) {
    const currentIndex = index

    // setTimeout 模拟页面渲染之后
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

    // 模拟注销组件时，清除所有副作用
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

