/**
 * 手写实现 react-promise：该中间件处理 action.payload 为 promise 的情况
 */
function isPromise(obj) {
  return Object.prototype.toString.call(obj) === '[object Promise]'
}
const promiseMiddleware = ({getState, dispatch}) => next => action => {
  return isPromise(action.payload)
    ? action.payload
        .then(result => dispatch({...action, payload: result}))
        .catch(err => {
          dispatch({...action, payload: err, error: true})
          return Promise.reject(err)
        })
    : next(action)
}

export default promiseMiddleware