import React, {useState, useContext} from 'react'
// import React, {useState} from 'react'
// import React from 'react'
import ReactDOM from 'react-dom'

/**
 * useContext：读取和订阅 context 的变化。
 * 等同于：static contextType = MyContext 或者 <MyContext.Consumer>
 */

/**
 * 手写实现 useContext：
 * - 直接返回 context._currentValue 值即可
 */
// function useContext(context) {
//   return context._currentValue
// }

const MyContext = React.createContext()
function Parent () {
  const [state, setState] = useState(1)
  return <MyContext.Provider value={state}>
      <Child></Child>
      <button onClick={() => setState(state + 1)}>+</button>
  </MyContext.Provider>
}

function Child () {
  const value = useContext(MyContext)
  return <div>{value}</div>
}

function render() {
  ReactDOM.render(<Parent/>, document.getElementById('root'))
}

render()

