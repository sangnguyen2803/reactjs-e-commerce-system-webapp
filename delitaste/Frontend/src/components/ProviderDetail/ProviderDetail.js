import withAuth from "components/HigherOrderComponents(HOC)/withAuth";
import NavBar from "../Commons/Layout/NavBar/NavBar";
import Footer from "../Commons/Layout/Footer/Footer";
import React, { Fragment, useState, useEffect } from "react";
import ToolBar from "../Commons/Layout/Toolbar/Toolbar";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/Commons/Button/Button";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
import {
  faClock,
  faHeart as faHeart2,
  faMapMarkerAlt,
  faStar,
  faCalendarPlus,
  faComment,
} from "@fortawesome/fontawesome-free-solid";
import { faHeart as faHeart1 } from "@fortawesome/fontawesome-free-regular";
import Background from "assets/home_banner.png";
import "./ProviderDetail.scss";
import PDHeader from "components/ProviderDetail/PDHeader/PDHeader";
import PDBody from "components/ProviderDetail/PDBody/PDBody";
import { getProductListAPI } from "store/actions/ProductAction/ProductAction";
function ProviderDetail(props) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const providerInfo = {
    provider_id: 1,
    address:
      "KP.3 Centana, 36 Mai Chi Tho, An Phu Ward,  District 2, Ho Chi Minh City",
    provider_name: "Burger King - Lyon Garibaldi Davinci",
    rating: "4.5",
    rating_total: "59",
    price_range: "3.49€-5.49€",
    cooking_time: "30 - 40 min",
    dietary: "Alergy-friendly",
    provider_photo:
      "https://d1ralsognjng37.cloudfront.net/02f41a01-e3e0-42ff-be63-b65c393270b5.jpeg",
  };

  const upcomingProduct = [
    {
      survey_id: 100001,
      start_at: "2022-03-01 00:00:00",
      expire_at: "2022-04-01 00:00:00",
      product: {
        upcoming_product_id: 100000,
        product_name: "Smoked Salmon Tartine",
        description:
          "Salmon with organic butter, scallion, dill, and a side of herb aioli. [540 Cal.]",
        estimated_price: 15.0,
        release_date: "2022 March 28",
        product_image:
          "https://d1ralsognjng37.cloudfront.net/6b599bdb-8c5d-4d11-ae78-4f87f49c6550.jpeg",
      },
      survey: {
        question: "Are you eager to try this upcoming product?",
        choices: [
          "Absolutely yes! I cannot wait to try this!",
          "It seems good. I am curious about its flavor.",
          "Neutral. I am not sure.",
          "I am not interested.",
          "It is not my thing!",
          "Other",
        ],
      },
    },
    {
      survey_id: 100002,
      start_at: "2022-03-01 00:00:00",
      expire_at: "2022-04-01 00:00:00",
      product: {
        upcoming_product_id: 100000,
        product_name: "Smoked Salmon Tartine",
        description:
          "Salmon with organic butter, scallion, dill, and a side of herb aioli. [540 Cal.]",
        estimated_price: 15.0,
        release_date: "2022 March 28",
        product_image:
          "https://d1ralsognjng37.cloudfront.net/a513ef8a-e005-457d-a8e8-e49d82cf8720.jpeg",
      },
      survey: {
        question: "Are you eager to try this upcoming product?",
        choices: [
          "Absolutely yes! I cannot wait to try this!",
          "It seems good. I am curious about its flavor.",
          "Neutral. I am not sure.",
          "I am not interested.",
          "It is not my thing!",
          "Other",
        ],
      },
    },
  ];
  const [items, setItems] = useState([]);
  useEffect(() => {
    async function fetchingDataAPI() {
      const productList = await props.getProductListAPI(props.match.params?.id);
      setItems([...productList]);
    }
    fetchingDataAPI();
    return () => {
      setItems([]);
    };
  }, []);

  return (
    <Fragment>
      <NavBar fixed={true} />
      <div className="main">
        <PDHeader />
        <PDBody
          products={items}
          upcomingProducts={upcomingProduct}
          setProducts={setItems}
        />
      </div>
      <Footer />
      <ToolBar />
    </Fragment>
  );
}

ProviderDetail.propTypes = {
  user: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  getProductListAPI: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  product: state.ProductReducer,
});

export default withRouter(
  withAuth(connect(mapStateToProps, { getProductListAPI })(ProviderDetail))
);
