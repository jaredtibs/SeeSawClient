import {combineReducers} from 'redux'
import user from  '../reducers/user'
import location from '../reducers/location'
import feed from '../reducers/feed'
import routes from '../reducers/routes'

const rootReducer = combineReducers({
  user,
  location,
  feed,
  routes
})

export default rootReducer
