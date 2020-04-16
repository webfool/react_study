import {ADD, DEL} from '../actionTypes/counter'

export default function (state = 10, action) {
  switch (action.type) {
    case ADD:
      return state + 5
    case DEL:
      return state - 5
    default:
      return state
  }
}