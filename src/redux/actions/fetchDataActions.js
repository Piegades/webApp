import "whatwg-fetch";
import dater from "../../modules/dataService";

export const newBiologicalInformations = data => ({
  type: "NEW_BIOLOGICAL_INFORMATIONS",
  data
});

export const newIllnessesHistory = data => ({
  type: "NEW_ILLNESSES_HISTORY",
  data
});

export const newData = data => dispatch => {
  if (data.key === "biologicalInformations") {
    dispatch(newBiologicalInformations(data));
  } else if (data.key === "illnessesHistory") {
    dispatch(newIllnessesHistory(data));
  }

  return {
    type: "NEW_DATA",
    data
  };
};

export const requestData = key => ({
  type: "DATA_REQUEST",
  isFetching: true,
  key
});

export const receiveData = data => ({
  type: "DATA_SUCCESS",
  isFetching: false,
  data
});

export const receiveDataError = message => ({
  type: "DATA_ERROR",
  isFetching: false,
  message
});

export const fetchData = key => (dispatch, getState) => {
  dispatch(requestData(key));

  const address = getState().user.specificNetworkAddress.address;

  return new Promise((resolve, reject) => {
    dater
      .get(key, address)
      .then(responseData => {
        console.log(responseData);
        dispatch(newData(responseData));
        dispatch(receiveData(responseData));
        resolve(responseData);
      })
      .catch(message => {
        dispatch(receiveDataError(message));
        reject(new Error(message));
      });
  });
};
