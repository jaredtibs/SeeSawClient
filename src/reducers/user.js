const initialState = {
  loading: false,
  isLoggedIn: false,
  username: '',
  avatar: '',
  errors: {count: 0}
};

export default function user(state=initialState, action) {
  switch (action.type) {
    case 'LOGGED_IN':
      return {
        ...state,
        username: action.username,
        loading: false,
        isLoggedIn: true
      };
    case 'LOGGED_OUT':
      return initialState;
    case 'SESSION_FETCHED':
      return {
        ...state,
        isLoggedIn: true,
        username: action.data.username
      };
    case 'LOADING':
      return {
        ...state,
        loading: true
      };
    case 'REGISTER_ERROR':
      return {
        ...state,
        loading: false,
        errors: constructErrorObject(action.errors)
      };
    case 'AVATAR_UPDATED':
      return {
        ...state,
        loading: false,
        avatar: action.avatar
      }
    default:
      return state;
  }
};

function constructErrorObject(errors) {
  if (errors.length > 0) {
    let errorObj = {};
    for(i=0; i < errors.length; i++) {
      let error = errors[i];
      if (error.match(/email/i)) {
        errorObj['email'] = {
          message: "Email already in use"
        }
      } else if (error.match(/username/i)) {
        errorObj['username'] = {
          message: "Username already exists"
        }
      }
    }
    errorObj['count'] = errors.length
    return errorObj
  } else {
    return {};
  }
}
