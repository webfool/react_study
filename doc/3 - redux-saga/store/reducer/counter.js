import * as TYPES from '../actionTypes'

export default function (state = 0, action) {
  switch (action.type) {
    case TYPES.COUNTER_ADD:
      return state + 1
    case TYPES.COUNTER_DEL:
      return state - 1
    default:
      return state
  }
}