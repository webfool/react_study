import {ADD, DEL} from '../actionTypes/counter'

export default function (state = {num: 0}, action) {
  const num = state.num

  switch (action.type) {
    case ADD:
      return {num: num + 5}
    case DEL:
      return {num: num - 5}
    default:
      return state
  }
}