import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'

import userReducer from './reducers/userReducers'

const rootReducer = combineReducers({
    userReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))