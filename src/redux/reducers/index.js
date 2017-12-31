import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";
import user from "./userReducer";
import data, { dataSaver } from "./dataReducer";
import flightAware from "./flightAwareReducer";
import notifications from "./notificationsReducer";

const appReducer = combineReducers({
  user,
  dataSaver,
  data,
  flightAware,
  notifications,
  routing: routerReducer
});

/*   Clears the store state on logout    */
const rootReducer = (state, action) => {
  if (action.type === "LOGOUT_SUCCESS") {
    const { routing } = state;
    state = { routing };
  }

  return appReducer(state, action);
};

export default rootReducer;
