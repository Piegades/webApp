import { applyMiddleware, createStore, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import localForage from "localforage";

import rootReducer from "./redux/reducers";

// https://stackoverflow.com/questions/45137911/react-native-persist-and-encrypt-user-token-redux-persist-transform-encrypt-er

const config = {
  key: "root",
  storage: localForage
};

const reducer = persistReducer(config, rootReducer);

export default function configureStore() {
  const store = createStore(
    reducer,
    undefined,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension && process.env.NODE_ENV !== "production"
        ? window.devToolsExtension()
        : f => f
    )
  );

  const persistor = persistStore(store);

  return { store, persistor };
}
