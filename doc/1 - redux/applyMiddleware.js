// 返回一个组合函数，它内部从 fns 最后一个往前执行至第一个
function compose(...fns) {
  return fns.reduce((a, b) => (...args) => a(b(...args)))
}

// applyMiddleware 的作用：传入一堆中间件用于装饰 dispatch 方法
export default function applyMiddleware (...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args)

    let dispatch
    const middlewareAPI = { // 只允许中间件内部调用 getState 和最终装饰之后的 dispatch
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    middlewares = middlewares.map(middleware => middleware(middlewareAPI))
    dispatch = compose(...middlewares)(store.dispatch) // 核心：洋葱模型，所有中间件从后到前装饰 dispatch

    return {
      ...store,
      dispatch
    }
  }
}