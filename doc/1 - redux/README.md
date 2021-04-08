redux
- 一个 store 由四部分组成：dispatch reducer state subscribe
- 通过 applyMiddleware 利用洋葱模型装饰 dispatch
- 通过 combineReducer 可以组合 reducer
- react-redux 负责将 redux 传递给组件，并订阅 redux 变化

正常 redux 只能传递 action 为纯对象
- redux-thunk 用于兼容 action 为函数的情况
- redux-promise 用于兼容 action.payload 为 promise 的情况

#### bindActionCreators 方法
通常的顺序是，通过 actionCreator 生成一个 action，再调用 dispatch(action) 触发 store 更新。但通常组件内部不关注 dispatch 方法，组件内部希望调用方法之后，直接生成 action 并 dispatch。所以 bindActionCreators 就是用来给这些 actionCreators 绑上自动 dispatch 的功能。

语法：
```js
bindActionCreators(actionCreators, dispatch)
```
其中 actionCreators 可以是对象或者函数，如果是对象，则是对象对每个属性函数进行 dispatch 的绑定；如果是函数则直接绑定该函数，再返回
```js
// 对象形式的 actionsCreators
const actionCreators = {
  add: (number) => {
    return {type: 'add', payload: number}
  },
  del: (number) => {
    return {type: 'del', payload: number}
  }
}
bindActionCreators(actionsCreators, dispatch)

// 函数形式的 actionCreator
const actionCreator = (number) => {
  return {type: 'mul', payload: number}
}

bindActionCreators(actionsCreators, dispatch)
```