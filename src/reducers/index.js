import {combineReducers} from 'redux'
import user from  '../reducers/user'
import location from '../reducers/location'
import feed from '../reducers/feed'
import notifications from '../reducers/notifications'
import search from '../reducers/search'
import routes from '../reducers/routes'

const rootReducer = combineReducers({
  user,
  location,
  feed,
  notifications,
  search,
  routes
})

export default rootReducer
