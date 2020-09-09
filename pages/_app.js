
import { combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import '../styles/globals.css'
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import thunkMiddleware from 'redux-thunk'
import { appWithRedux } from 'next-redux'
import reports from '../reducers/reports'
const reducer = combineReducers({reports})

/* Redux connection to reports reducer and thunk usage*/
const enhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

export default appWithRedux(reducer, enhancer)
