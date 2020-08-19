redux
- 一个 store 由四部分组成：dispatch reducer state subscribe
- 通过 applyMiddleware 利用洋葱模型装饰 dispatch
- 通过 combineReducer 可以组合 reducer
- react-redux 负责将 redux 传递给组件，并订阅 redux 变化

正常 redux 只能传递 action 为纯对象
- redux-thunk 用于兼容 action 为函数的情况
- redux-promise 用于兼容 action.payload 为 promise 的情况