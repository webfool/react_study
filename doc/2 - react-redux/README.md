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
