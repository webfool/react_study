import * as types from '../actionTypes/counter'

export default {
  add: function () {
    return {type: types.ADD}
  },
  del: function () {
    return {type: types.DEL}
  }
}