import {createStore} from 'redux'
import reducer from './reducer'
import applyMiddleware from '../applyMiddleware'
import {logger1, logger2} from './middlewares/logger'

// const store = createStore(reducer)
const store = applyMiddleware(logger1, logger2)(createStore)(reducer)
export default store