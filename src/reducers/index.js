import {combineReducers} from 'redux'
import user from  '../reducers/user'
import location from '../reducers/location'
import feed from '../reducers/feed'
import notifications from '../reducers/notifications'
import share from '../reducers/share'
import routes from '../reducers/routes'

const rootReducer = combineReducers({
  user,
  location,
  feed,
  notifications,
  share,
  routes
})

export default rootReducer
