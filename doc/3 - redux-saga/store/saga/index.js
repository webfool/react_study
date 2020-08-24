// import {take, fork, takeEvery, call, cps, put, delay, all, cancel} from 'redux-saga/effects'
// eslint-disable-next-line
import {take, fork, takeEvery, call, cps, put, delay, all, cancel} from '../../my-redux-saga/effects'
import * as TYPES from '../actionTypes'

/**
 * take、takeEvery、fork、call、cps、put、delay、all
 * 
 * takeEvery、fork 不阻塞，其它均会阻塞
 */

// function* testIterator() {
//   yield take(TYPES.COUNTER_ADD)
//   console.log('test iterator first')

//   yield take(TYPES.COUNTER_DEL)
//   console.log('test iterator second')
// }

// function* testIterator2() {
//   yield take(TYPES.COUNTER_ADD)
//   console.log('test2 iterator first')

//   yield take(TYPES.COUNTER_DEL)
//   console.log('test2 iterator second')

//   yield take(TYPES.COUNTER_DEL)
//   console.log('test2 iterator third')
// }

function* rootSaga() {
  // 监听 action 的 type
  // yield take(TYPES.COUNTER_ADD)
  // console.log('after add')

  // 嵌套遍历器
  // yield testIterator()
  // console.log('after iterator')

  // 导出 promise
  // yield new Promise((resolve) => {
  //   setTimeout(resolve, 3000)
  // })
  // console.log('after promise')

  // fork 新增一个进程
  // yield fork(function* () {
  //   yield take(TYPES.COUNTER_ADD)
  //   console.log('fork')
  // })

  // yield takeEvery(TYPES.COUNTER_ADD, function*() {
  //   console.log('takeEvery')
  // })

  // yield call(function (v1, v2) {
  //   console.log('call v1 ->', v1)
  //   console.log('call v2 ->', v2)
  // }, 1, 2)

  // next 采用 callback 的方式传入
  // yield cps(function (v3, v4, next) {
  //   console.log('cps v3 ->', v3)
  //   console.log('cps v4 ->', v4)
  //   setTimeout(next, 2000)
  // }, 3, 4)

  // 向 store 派发 action
  // yield put({type: TYPES.COUNTER_DEL})

  // 延迟执行
  // yield delay(2000)

  // yield all([
  //   testIterator(),
  //   testIterator2()
  // ])

  const task = yield fork(function *() {
    while(true) {
      yield delay(1000)
      yield put({type: TYPES.COUNTER_ADD})
    }
  })

  yield take(TYPES.COUNTER_CANCEL)
  yield cancel(task)
  console.log('root finish')
}

export default rootSaga

