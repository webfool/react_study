
// 实现 redux-thunk：该中间件处理 action 为 function 的情况
function createThunkMiddleware(extraArgument) {
  return ({getState, dispatch}) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument)
    }
    return next(action)
  }
}
const thunk = createThunkMiddleware()
thunk.withExtraArgument = createThunkMiddleware
export default thunk

