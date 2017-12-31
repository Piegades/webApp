import uuid from "uuid";
import { showNotification, hideNotification } from "./notificationsActions";
import { newData } from "./fetchDataActions";

import dater from "../../modules/dataService";
import crypto from "../../modules/cryptoService";

export const saveDataRequest = () => ({
  type: "SAVE_REQUEST",
  isSending: true
});

export const saveDataSuccess = () => ({
  type: "SAVE_SUCCESS",
  isSending: false
});

export const saveDataError = message => ({
  type: "SAVE_ERROR",
  isSending: false,
  message
});

export const getPublicKey = publicKey => ({
  type: "PUBLIC_KEY",
  publicKey
});

export const showSpinner = () => dispatch => {
  dispatch(saveDataRequest());
};

export const saveData = (key, unencryptedData) => (dispatch, getState) => {
  const address = getState().user.specificNetworkAddress.address;
  const privateKey = getState().user.keystore.privateKey;
  crypto.privateKeyToPublicEncKey(privateKey).then(publicKey => {
    const encrpytedData = crypto
      .encrypt(privateKey, publicKey, unencryptedData)
      .then(encryptedData => {
        const encapsuledData = {
          address,
          key,
          time: new Date(),
          id: uuid.v4(),
          data: encryptedData
        };
        dater
          .set(key, address, encapsuledData)
          .then(() => {
            dispatch(saveDataSuccess());
            dispatch(newData(encapsuledData));
            dispatch(showNotification("sentOk"));
            setTimeout(() => {
              dispatch(hideNotification("sentOk"));
            }, 5000);
          })
          .catch(message => {
            dispatch(saveDataError(message));
          });
      });
  });
};
