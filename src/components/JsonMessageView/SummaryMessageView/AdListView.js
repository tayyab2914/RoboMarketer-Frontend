import React, { useEffect } from "react";
import AdView from "./AdView";
import "./styles/JsonMessage.css";
import {
  ArrowLeft,
  Check,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AdListView = ({
  adsetName = "",
  ads = [],
  onBack = () => {},
  onSelectAd = () => {},
  expandedAdsetIndex,
  onToggleExpand = () => {},
  level = "",
  currency = "USD",
}) => {
  const sliderSettings = {
    adaptiveHeight: true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="ad-list-container">
      <div className="list-header border-b m-0">
        {level !== "ad" && (
          // <button onClick={onBack} className="back-button">
          //   <ArrowLeft size={16} />
          //    <span>Back</span>
          // </button>
          <button onClick={onBack} className="back">
            <ArrowLeft size={16} />
          </button>
        )}
        <h2 className="header-title">Ads</h2>
      </div>

      <div className="ads-container">
        <div className="card-wrapper">
          {Array.isArray(ads) && ads.length > 0 ? (
            <Slider {...sliderSettings}>
              {ads.map((ad, index) => (
                <div key={ad.ad_id} className="my-2">
                  <AdView
                    key={ad.ad_id}
                    ad={ad}
                    adsetName={adsetName}
                    onBack={onBack}
                    expanded={expandedAdsetIndex === index}
                    onToggleExpand={() => onToggleExpand(index)}
                    onSelectAd={onSelectAd}
                    currency={currency}
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <p>No ads available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdListView;
