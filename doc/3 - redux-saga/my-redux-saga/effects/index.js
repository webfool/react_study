export function take (actionType) {
  return {
    type: 'TAKE',
    actionType
  }
}

export function fork(task) {
  return {
    type: 'FORK',
    task
  }
}

export function takeEvery(actionType, task) {
  return fork(function* () {
    while(true) {
      yield take(actionType)
      yield task()
    }
  })
}

export function call(fn, ...args) {
  return {
    type: 'CALL',
    fn,
    args
  }
}

export function cps(fn, ...args) {
  return {
    type: 'CPS',
    fn,
    args
  }
}

export function put(action) {
  return {
    type: 'PUT',
    action
  }
}

export function innerDelay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
  })
}

export function delay(ms) {
  return {
    type: 'CALL',
    fn: innerDelay,
    args: [ms]
  }
}

export function all(fns) {
  return {
    type: 'ALL',
    fns
  }
}

export function cancel(task) {
  return {
    type: 'CANCEL',
    task
  }
}