import { Fragment, useState, useRef, useEffect } from "react";
import { Provider } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import store from "store";
//components
import RouteWithSubRoutes from "components/Commons/RouteWithSubRoutes";
import { routes } from "config/routes";
//common screen
import HomeScreen from "./HomeScreen/HomeScreen";
import UserSignInScreen from "./UserAdmissionScreen/UserSignInScreen";
import UserRegistrationScreen from "./UserAdmissionScreen/UserRegistrationScreen";
import MerchantRegistrationScreen from "./MerchantRegistrationScreen/MerchantRegistrationScreen";
import SignContractScreen from "./MerchantRegistrationScreen/SignContractScreen/SignContractScreen";
import MerchantFormScreen from "./MerchantRegistrationScreen/MerchantFormScreen";
//merchant registration form screen
import ServiceInfoForm from "components/MerchantRegistration/Forms/DetailMerchantForm/ServiceInfoForm";
import RegisteredRepresentativeForm from "components/MerchantRegistration/Forms/DetailMerchantForm/RegisteredRepresentativeForm";
import BusinessUnitForm from "components/MerchantRegistration/Forms/DetailMerchantForm/BusinessUnitForm";
import ProductDetailForm from "components/MerchantRegistration/Forms/DetailMerchantForm/ProductDetailForm";
import BankInfoForm from "components/MerchantRegistration/Forms/DetailMerchantForm/BankInfoForm";

import DialogBox from "components/Commons/Overlay/DialogBox/DialogBox";
import MerchantDashboardScreen from "./MerchantDashboardScreen/MerchantDashboardScreen";

const history = createBrowserHistory();

/*const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:4000");
    console.log(socketRef.current.on("firstEvent", (msg) => console.log(msg)));
  }, []); */

function RootScreen(props) {
  return (
    <Fragment>
      <Provider store={store}>
        <Router history={history}>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/home" component={HomeScreen} />
          <Route exact path="/sign-up" component={UserRegistrationScreen} />
          <Route exact path="/sign-in" component={UserSignInScreen} />
          <Route
            exact
            path="/merchant-registration"
            component={MerchantRegistrationScreen}
          />
          <Route
            exact
            path="/merchant-sign-contract"
            component={SignContractScreen}
          />
          <Route exact path="/merchant-registration/:id/service">
            <MerchantFormScreen>
              <ServiceInfoForm />
            </MerchantFormScreen>
          </Route>
          <Route exact path="/merchant-registration/:id/representative">
            <MerchantFormScreen>
              <RegisteredRepresentativeForm />
            </MerchantFormScreen>
          </Route>
          <Route exact path="/merchant-registration/:id/business-unit">
            <MerchantFormScreen>
              <BusinessUnitForm />
            </MerchantFormScreen>
          </Route>
          <Route exact path="/merchant-registration/:id/product-detail">
            <MerchantFormScreen>
              <ProductDetailForm />
            </MerchantFormScreen>
          </Route>
          <Route exact path="/merchant-registration/:id/bank">
            <MerchantFormScreen>
              <BankInfoForm />
            </MerchantFormScreen>
          </Route>
          <Route
            path="/merchant-dashboard"
            component={MerchantDashboardScreen}
          />

          <Route exact path="/:lang(en|vi)/" component={HomeScreen} />
          <Route exact path="/:lang(en|vi)/home" component={HomeScreen} />
          <Route
            exact
            path="/:lang(en|vi)/sign-in"
            component={UserSignInScreen}
          />
          <Route
            exact
            path="/:lang(en|vi)/sign-up"
            component={UserRegistrationScreen}
          />
          <Route
            exact
            path="/:lang(en|vi)/merchant-registration"
            component={MerchantRegistrationScreen}
          />
        </Router>
        <DialogBox />
      </Provider>
    </Fragment>
  );
}

export default RootScreen;
