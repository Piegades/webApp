const user = (
  state = {
    uportID: null,
    avatar: null,
    country: null,
    name: null,
    phone: null,
    publicToken: null,
    pushToken: null
  },
  action
) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        uportID: action.userProfile.address,
        avatar: action.userProfile.avatar,
        country: action.userProfile.avatar,
        name: action.userProfile.avatar,
        phone: action.userProfile.phone,
        rinkebyID: action.userProfile.rinkebyID,
        publicToken: action.userProfile.publicToken,
        pushToken: action.userProfile.pushToken
      };
    case "SIGN_UP_SUCCESS":
      return {
        ...state,
        id: action._id,
        email: action.email,
        keystore: action.keystore,
        specificNetworkAddress: action.specificNetworkAddress
      };
    case "LOGOUT":
      return {
        ...state,
        uportID: null,
        avatar: null,
        country: null,
        name: null,
        phone: null,
        publicToken: null,
        pushToken: null
      };
    default:
      return state;
  }
};

export default user;
