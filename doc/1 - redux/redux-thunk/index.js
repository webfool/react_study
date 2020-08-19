
// 实现 redux-thunk
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

