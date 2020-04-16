/**
 * 【mapStateToProps】：修改 store 时，通过 mapStateToProps 添加 store 属性到组件
 * 
 * 【函数触发】
 * - 仓库每次变化时执行，如果 state 的引用变化，则所有连接 store 的函数都会执行
 * 
 * 【接收参数和返回值】
 * - 最多接收2个参数：state 树、传给组件的 props；返回值作为组件的 props
 * - 函数接收2个参数时，组件props变化会重新执行函数
 * 
 * 
 * 【函数优化】
 * - 可将复杂的计算放在 reducer 或者 render 中
 * - 输入不变时，通过记忆函数进行优化
 * - 函数应该是纯函数和同步函数
 * - 不订阅 store 变化，将函数置为 null 或者 undefined
 */
