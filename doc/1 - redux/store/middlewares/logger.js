export const logger1 = store => dispatch => action => {
  console.log('before1 ->', store.getState())
  dispatch(action)
  console.log('after1 ->', store.getState())
}

export const logger2 = store => dispatch => action => {
  console.log('before2 ->', store.getState())
  dispatch(action)
  console.log('after2 ->', store.getState())
}