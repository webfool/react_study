import * as TYPES from '../actionTypes'

export default {
  add: function () {
    return {type: TYPES.COUNTER_ADD}
  },
  del: function () {
    return {type: TYPES.COUNTER_DEL}
  },
  cancel: function () {
    return {type: TYPES.COUNTER_CANCEL}
  }
}