import React from "react";
import MetricsSection from "./MetricsSection";
import { ChevronDown, ChevronRight } from "lucide-react";
import "./styles/JsonMessage.css";

const AdSetView = ({ adset = {}, expanded = false, onToggleExpand = () => {}, onSelectAd = () => {}, currency = "USD" }) => {
  console.log("AdSetView");

  return (
    <div className="card-wrapper">
      <div className="card">
        <div className="header-container py-2">
          <div className="card-container-header" onClick={onToggleExpand}>
            <span className="expand-icon me-2">
              {expanded ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </span>
            <h6 className="mb-0">{adset?.adset_name || "Unnamed Ad Set"}</h6>
          </div>
        </div>
        {expanded && (
          <div className="card-body p-0">
            <MetricsSection data={adset} currency={currency} />
            <div className="view-ads-container">
              <button onClick={() => { onSelectAd( adset?.ads && Array.isArray(adset.ads) ? adset.ads : [] ); }} className="view-ads-button" >
                View Ads ({adset?.ads?.length || 0})
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdSetView;
