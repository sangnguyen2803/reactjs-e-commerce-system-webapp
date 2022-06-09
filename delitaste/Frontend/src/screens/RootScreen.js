import { Fragment, useState, useRef, useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import axios from "axios";
//components
import RouteWithSubRoutes from "components/Commons/RouteWithSubRoutes";
import { routes } from "config/routes";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//common screen
import HomeScreen from "./HomeScreen/HomeScreen";
import UserSignInScreen from "./UserAdmissionScreen/UserSignInScreen";
import UserRegistrationScreen from "./UserAdmissionScreen/UserRegistrationScreen";
import ProfileScreen from "./ProfileScreen/ProfileScreen";
import MerchantRegistrationScreen from "./MerchantRegistrationScreen/MerchantRegistrationScreen";
import SignContractScreen from "./MerchantRegistrationScreen/SignContractScreen/SignContractScreen";
import MerchantFormScreen from "./MerchantRegistrationScreen/MerchantFormScreen";
import ProviderDetailScreen from "./ProviderDetailScreen/ProviderDetailScreen";
//merchant registration form screen
import ServiceInfoForm from "components/MerchantRegistration/Forms/DetailMerchantForm/ServiceInfoForm";
import RegisteredRepresentativeForm from "components/MerchantRegistration/Forms/DetailMerchantForm/RegisteredRepresentativeForm";
import BusinessUnitForm from "components/MerchantRegistration/Forms/DetailMerchantForm/BusinessUnitForm";
import ProductDetailForm from "components/MerchantRegistration/Forms/DetailMerchantForm/ProductDetailForm";
import BankInfoForm from "components/MerchantRegistration/Forms/DetailMerchantForm/BankInfoForm";
import MerchantDashboardScreen from "./MerchantDashboardScreen/MerchantDashboardScreen";
import OrderCheckoutScreen from "./OrderCheckoutScreen/OrderCheckoutScreen";
import OrderTrackingScreen from "./OrderTrackingScreen/OrderTrackingScreen";
import SearchScreen from "./SearchScreen/SearchScreen";
import { setCurrentLocation } from "store/actions/UserAction/UserAction";
import ShipperScreen from "./ShipperScreen/ShipperScreen";
const history = createBrowserHistory();

function RootScreen(props) {
  const getPosition = () => {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej);
    });
  };
  useEffect(() => {
    async function getUserLocation() {
      var position = await getPosition();
      const { latitude, longitude } = position.coords;
      const endpoint = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=6d74076cb237412e9abb06e88020a7a5`;
      let res = await axios.get(endpoint);
      var address = "";
      if (res.data) {
        address = res.data?.features[0]?.properties?.formatted || "";
      }
      props.setCurrentLocation(latitude, longitude, address);
    }
    getUserLocation();
  }, []);
  return (
    <Fragment>
      <Router history={history}>
        <Route exact path="/" component={HomeScreen} />
        <Route exact path="/home" component={HomeScreen} />
        <Route exact path="/sign-up" component={UserRegistrationScreen} />
        <Route exact path="/sign-in" component={UserSignInScreen} />
        <Route exact path="/search" component={SearchScreen} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/shipper-simulator" component={ShipperScreen} />
        <Route
          exact
          path="/provider-detail/:id"
          component={ProviderDetailScreen}
        />
        <Route
          exact
          path="/order-checkout/:uid"
          component={OrderCheckoutScreen}
        />
        <Route
          exact
          path="/order-tracking/:order_code"
          component={OrderTrackingScreen}
        />
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
        <Route path="/merchant-dashboard" component={MerchantDashboardScreen} />

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
    </Fragment>
  );
}
RootScreen.propTypes = {
  user: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  setCurrentLocation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  product: state.ProductReducer,
});
export default connect(mapStateToProps, { setCurrentLocation })(RootScreen);
