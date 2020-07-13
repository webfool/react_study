import React, {useState, useCallback, useMemo, useContext, useEffect, useRef, forwardRef, useImperativeHandle} from 'react'
// import React from 'react'
import ReactDOM from 'react-dom'

/**
 * useRef:
 * - 生成一个 ref 对象
 * - 每次重新渲染时，useRef 都会生成同一个 ref
 * 
 * useImperativeHandle
 * - 对 ref 对象进行赋值
 */

function Child(props, inputRef) {
  const childRef = useRef()

  useImperativeHandle(inputRef, () => {
    return {
      focus() {
        console.log('customize focus!')
        childRef.current.focus()
      },
      input() {
        console.log('customize input!')
      }
    }
  })
  return <input ref={childRef}/>
}

Child = forwardRef(Child)

let oldRef
function Parent () {
  const [time, setTime] = useState(1)

  const inputRef = useRef()
  console.log('inputRef === oldRef', oldRef === inputRef)
  oldRef = inputRef

  function focus() {
    inputRef.current.focus()
  }

  return <>
    <button onClick={() => setTime(time + 1)}>{time}</button>
    <Child ref={inputRef} />
    <button onClick={focus}>focus</button>
    <button onClick={() => inputRef.current.input()}>input</button>
  </>
}

function render() {
  ReactDOM.render(<Parent />, document.getElementById('root'))
}

render()

