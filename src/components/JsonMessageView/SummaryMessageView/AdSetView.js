import React from "react";
import MetricsSection from "./MetricsSection";
import { ChevronDown, ChevronRight } from "lucide-react";
import "./styles/JsonMessage.css";

const AdSetView = ({
  adset = {},
  expanded = false,
  onToggleExpand = () => {},
  onSelectAd = () => {},
  currency = "USD",
}) => (
  <div className="card">
    <div className="header-container">
      <div className="card-container-header" onClick={onToggleExpand}>
        <span className="expand-icon">
          {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </span>
        <h5 className="mb-0">{adset?.adset_name || "Unnamed Ad Set"}</h5>
      </div>
      {/* <button
        onClick={() => {
          onSelectAd(adset?.ads && Array.isArray(adset.ads) ? adset.ads : []);
        }}
        className="view-ads-button"
      >
        View Ads ({adset?.ads?.length || 0})
      </button> */}
    </div>
    {expanded && (
      <div className="card-body px-0">
        <MetricsSection data={adset} currency={currency} />
        <div className="view-ads-container">
          <button
            onClick={() => {
              onSelectAd(
                adset?.ads && Array.isArray(adset.ads) ? adset.ads : []
              );
            }}
            className="view-ads-button"
          >
            View Ads ({adset?.ads?.length || 0})
          </button>
        </div>
      </div>
    )}
  </div>
);

export default AdSetView;
