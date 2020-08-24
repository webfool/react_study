import {createStore, applyMiddleware} from 'redux'
import reducer from './reducer'
// import createSagaMiddleware from 'redux-saga' 
import createSagaMiddleware from '../my-redux-saga'

import rootSaga from './saga'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

export default store