import React from 'react'
import ReactDom from 'react-dom'

const TextContext = React.createContext()

class GrandParent extends React.Component{
  render() {
    return <TextContext.Provider value={{name: '111'}}>
      <Child1></Child1>
      <Parent></Parent>
    </TextContext.Provider>
  }
}

function Child1() {
  return <TextContext.Consumer>
    {
      ({name}) => {
        return <div>in Child1 -> {name}</div>
      }
    }
  </TextContext.Consumer>
}

function Parent() {
  return <TextContext.Provider value={{name: '222'}}>
    <Child2></Child2>
  </TextContext.Provider>
}

function Child2() {
  return <TextContext.Consumer>
    {({name}) => {
      return <div>in Child2 -> {name}</div>
    }}
  </TextContext.Consumer>
}

ReactDom.render(<GrandParent></GrandParent>, document.getElementById('root'))

