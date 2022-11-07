const AuthReducers = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        currentUser: null,
        isLoading: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        currentUser: action.payload,
        isLoading: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        currentUser: null,
        isLoading: false,
        error: true,
      };
    case "LOGOUT":
      return {
        currentUser: null,
        isLoading: false,
        error: false,
      };
    default:
      return state;
  }
};

export default AuthReducers;
