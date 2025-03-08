import React, { useEffect } from "react";
import AdSetView from "./AdSetView";
import "./styles/JsonMessage.css";
import { ArrowLeft } from "lucide-react";

const AdSetListView = ({
  adsets = [],
  onBack = () => {},
  onSelectAd = () => {},
  expandedAdsetIndex,
  onToggleExpand = () => {},
  level = "",
  currency = "USD",
}) => {
    console.log('AdSetListView',adsets)
  return (
    <div className="adset-list-container">
      <div className="list-header px-3 border-b m-0">
        {level !== "adset" && (
          // <button onClick={onBack} className="back-button">
          //   <ArrowLeft size={16} />
          //   <span>Back</span>
          // </button>
          <button onClick={onBack} className="back">
            <ArrowLeft size={16} />
          </button>
        )}
        <h2 className="header-title">Ad Sets</h2>
      </div>

      <div className="adsets-container">
        {Array.isArray(adsets) && adsets.length > 0 ? (
          adsets.map((adset, index) => (
            <AdSetView
              key={adset.adset_id}
              adset={adset}
              onBack={onBack}
              expanded={expandedAdsetIndex === index}
              onToggleExpand={() => onToggleExpand(index)}
              onSelectAd={onSelectAd}
              currency={currency}
            />
          ))
        ) : (
          <p className="no-data-message">No ad sets available.</p>
        )}
      </div>
    </div>
  );
};

export default AdSetListView;
