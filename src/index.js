import React from "react";
import ReactDOM from "react-dom";

/* Routing / Redux / store imports */
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";

// Styles
import "font-awesome/css/font-awesome.min.css";
import "simple-line-icons/css/simple-line-icons.css";
import "../scss/style.scss";
// Temp fix for reactstrap
import "../scss/core/_dropdown-menu-right.scss";

// Containers
import Full from "./containers/Full/";

// Views
import Login from "./views/Pages/Login/";
import Register from "./views/Pages/Register/";
import Page404 from "./views/Pages/Page404/";
import Page500 from "./views/Pages/Page500/";

import DashBoard from "./views/Dashboard/Dashboard";

import PrivateRoute from "./components/PrivateRoute";

// Store
import configureStore from "./store";
const { store, persistor } = configureStore();

import "./modules/dataService";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={"Loading..."}>
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" exact component={Full} />
            {/*<Route path="/about" component={About} />*/}
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/dashboard" component={Full} />
            {/*<App>
              <Switch>
                <PrivateRoute path="/myinfo" component={Informations} />
                <PrivateRoute path="/chat" component={Chat} />
              </Switch>
            </App>*/}
            <Route component={Page404} />
          </Switch>
        </div>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
