import { useEffect, useRef } from "react";

// 模拟 componentDidMount
useEffect(callback, [])

// 模拟 componentDidUpdate
const init = useRef(true)
useEffect(() => {
  if (init.current) {
    init.current = false
  } else {
    callback()
  }
})

// 模拟 componentWillUnmount
useEffect(() => callback, [])