export default function createSagaMiddleware() {
  function sagaMiddleware({getState, dispatch}) {

    function createChannel() {
      const listener = {}

      function subscribe(actionType, cb) {
        // listener[actionType] = cb
        listener[actionType] = listener[actionType] || []
        listener[actionType].push(cb)
      }

      function publish(actionType) {
        if (listener[actionType]) {
          // 此处需要先缓存，再删除，再执行。
          // 因为直接执行时，即调用 next()，但如果 next 中又监听了相同的 actionType，那么会在之后被 delete，这样便是有问题的
          const tem = listener[actionType]
          delete listener[actionType]
          // tem()
          tem.forEach(next => next())
        }
      }

      return {subscribe, publish}
    }

    const {subscribe, publish} = createChannel()

    function run (generator, callback) {
      const it = typeof generator === 'function' ? generator() : generator

      function next(action) {
        const {value: effect, done} = it.next(action)

        if (!done) {
          if (typeof effect[Symbol.iterator] === 'function') { // 兼容 yield 的是遍历器的情况
            run(effect, next)
          } else if (Object.prototype.toString.call(effect) === '[object Promise]') {
            effect.then(next)
          } else {
            switch(effect.type) {
              case 'TAKE':
                subscribe(effect.actionType, next)
                break;
              case 'FORK':
                const task = effect.task()
                run(task)
                next(task)
                break;
              case 'CANCEL':
                effect.task.return()
                next()
                break;
              case 'CALL':
                Promise.resolve(effect.fn(...effect.args)).then(next)
                break;
              case 'CPS':
                effect.fn(...effect.args, next)
                break;
              case 'PUT':
                dispatch(effect.action)
                next()
                break;
              case 'ALL':
                const times = function (next, total) {
                  let count = 0
                  return () => {
                    count++
                    if (total === count) next()
                  }
                }

                const done = times(next, effect.fns.length)
                effect.fns.forEach(fn => run(fn, done))
                break;
              default:
                break;
            }
          }
        } else {
          callback && callback()
        }
      }
      
      next()
    }

    sagaMiddleware.run = run

    return (next) => (action) => {
      publish(action.type)
      next(action)
    }
  }

  return sagaMiddleware
}