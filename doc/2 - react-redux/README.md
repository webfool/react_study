react-redux 的作用：
- 传递给组件所需要的 store 中的数据
- 传递给组件 dispatch action 的方法
- 监听 store 变化并触发组件更新

对于 store 的初始化等依旧是由 redux 负责

### mapStateToProps
> 修改 store 时，通过 mapStateToProps 添加 store 属性到组件

#### 触发
- 仓库变化时，如果 state 的引用变化，则所有 mapStateToProps 都会执行

#### 接收参数和返回值
- 最多接收2个参数：state 树、传给组件的 props；返回值作为组件的 props
- 函数接收2个参数时，组件props变化会重新执行函数

#### 优化
- 函数计算要快，可采用记忆函数或者将复杂计算放在 reducer 或者 render 中
- 函数应该是纯函数和同步函数
- 不订阅 store 变化，将函数置为 null 或者 undefined


### mapDispatchToProps
组件内部一般不关注 dispatch 方法，只希望调用某个方法即可生成 action 并派发，所以通过 connect 的第二个参数 mapDispatchToProps 为组件生成派发 action 的方法。

如果设置了 mapDispatchToProps，则子组件不会再拿到 dispatch 方法，除非手动传递；如果没有设置，则子组件能拿到 dispatch 方法。

mapDispatchToProps 支持两种格式：
- 函数
```js
function AddActionCreator(number) {
  return {type: 'add', payload: number}
}

// 函数格式接收两个参数：dispatch 方法、调用组件传递的 props
// 函数需返回一个对象，对象的每一个值都是一个生成 action 并 dispatch 的函数。对象会合并之前传递给组件的 props 作为最终的 props 传递给内部组件
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    add: (number) => dispatch(AddActionCreator(number))
  }
}

// 由于 redux 的 bindActionCreators 方法为 actionCreator 绑定 dispatch 功能，所以上面又可以写成
import {bindActionCreators} from 'redux'
const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({
    add: (number) => AddActionCreator(number)
  }, dispatch)
}
```

- 对象
```js
// 如果直接传入一个对象，那么内部会调用 bindActionCreators，使返回对象的每一项的值都绑定了 dispatch
const mapDispatchToProps = {
  add: (number) => AddActionCreator(number)
}
```