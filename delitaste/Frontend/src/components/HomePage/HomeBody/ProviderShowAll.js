import "./HomeBody.scss";
import { Fragment, useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CustomButtonGroup } from "./CustomButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarPlus,
  faInfoCircle,
} from "@fortawesome/fontawesome-free-solid";

import { withRouter } from "react-router-dom";
import { faHeart as faHeart2 } from "@fortawesome/fontawesome-free-solid";
import { faHeart as faHeart1 } from "@fortawesome/fontawesome-free-regular";
import { faGetPocket } from "@fortawesome/free-brands-svg-icons";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 4, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

function ProviderShowAll({ providerList, history }) {
  const openTime = "23:00:00";
  const closeTime = "22:00:00";
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  const handleOnClickProvider = (id) => {
    history.push(`/provider-detail/${id}`);
  };
  return (
    <Fragment>
      <div className="home-product-row-container">
        <div className="apro-home-product-slider-all">
          {providerList?.map((item) => (
            <div className="apro-home-product-container">
              <div
                className="apro-provider-card-container"
                key={item.provider_id}
                onClick={() => handleOnClickProvider(item.provider_id)}
                style={{
                  backgroundImage: `url(https://${item.profile_pic})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                <div className="apro-provider-interaction-wrapper">
                  <FontAwesomeIcon
                    className="icon-for-liking"
                    style={{ zIndex: 1, marginTop: 5 }}
                    icon={faHeart1}
                  />
                </div>
                {currentTime < closeTime && currentTime > openTime ? (
                  <figcaption className="figcaption-wrapper">
                    <div className="btn-schedule-wrapper">
                      <FontAwesomeIcon
                        icon={faCalendarPlus}
                        className="icon-btn"
                      />
                      <span>Schedule order</span>
                    </div>
                    <span className="a1-description">
                      Opens Saturday 2:15 PM
                    </span>
                  </figcaption>
                ) : (
                  <Fragment></Fragment>
                )}
              </div>

              <div className="apro-product-info-wrapper">
                <span className="apro-p-info-main-text">
                  {item.provider_name}
                </span>
                <div className="apro-p-info-rating">{item.rating || "5.0"}</div>
              </div>
              <div className="product-sub-info-wrapper">
                <FontAwesomeIcon icon={faGetPocket} className="sub-info-icon" />
                &nbsp;•&nbsp;
                <span className="p-sub-info-main-text">{item.price_range}</span>
                &nbsp;•&nbsp;
                <div className="p-sub-info-cooking-time">
                  {item.mean_estimated_cooking_time || "30-45 mins"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default withRouter(ProviderShowAll);
