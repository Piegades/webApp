import piegadesService from "../../modules/piegadesService";

/*
export const generateAeroTag = key => (dispatch, getState) => {
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
*/
export const generateAeroTag = (
  additionalInformation,
  geoUri,
  privateKey
) => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({ type: "GENERATING_AERO_TAG" });
    piegadesService
      .createProduct("baggage", additionalInformation, geoUri, privateKey)
      .then(bagaggeAddress => {
        dispatch({
          type: "AERO_TAG_GENERATED",
          baggageAddress: bagaggeAddress
        });
        return resolve(bagaggeAddress);
      });
  });
};
