const mnid = require("mnid");
import RestClient from "another-rest-client";
import walleter from "../../modules/walletService";

const api = new RestClient("http://localhost:4000");

api.res({ users: ["signup", "login"] });
api.conf({ contentType: "application/json" });

export const signup = (email, password) => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({ type: "CREATING_USER", email });
    return walleter.newWallet(password).then(keystore => {
      api.users.signup
        .post({
          email,
          password,
          keystore
        })
        .then(user => {
          if (user.result === "The user ever exist") {
            dispatch({
              type: "SIGN_UP_FAILED",
              message: "The user is ever existing"
            });
            return resolve("SIGN_UP_FAILED");
          } else {
            dispatch({
              type: "SIGN_UP_SUCCESS",
              _id: user.data._id,
              email,
              keystore
            });
            return resolve("SIGN_UP_SUCCESS");
          }
        });
    });
  });
};

export const login = userProfile => dispatch => {
  return new Promise((resolve, reject) => {
    console.log(userProfile);
    const rinkebyID = mnid.decode(userProfile.address);
    userProfile.rinkebyID = rinkebyID;
    dispatch({ type: "LOGIN_SUCCESS", userProfile });
  });
};

export const logout = data => ({
  type: "LOGOUT",
  data
});
