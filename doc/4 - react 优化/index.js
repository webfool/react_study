import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import VirtualList from './VirtualList'

// 生成随机颜色
function getRandomColor () {
  const rand = Math.floor((Math.random() * 0xFFFFFF)).toString(16).toUpperCase()
  if (rand.length === 6) return '#' + rand
  return getRandomColor()
}

const Child = (props) => {
  return <div style={{background: getRandomColor()}}>{props.index} : {props.name}</div>
}

// 造数据
const items = Array.from({length: 1000}).map((item, index) => {
  return {name: 'hw' + index}
})
const props = {items, itemSize: 30, height: 100}

// 渲染
ReactDOM.render(<VirtualList {...props}>
  {(p) => <Child {...p}></Child>}
</VirtualList>, document.getElementById('root'))