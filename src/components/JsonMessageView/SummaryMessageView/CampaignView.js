import React, { useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import MetricsSection from "./MetricsSection";
import "./styles/JsonMessage.css";

const CampaignView = ({
  campaign = {},
  onSelectAdSet = () => {},
  expanded = false,
  onToggleExpand = () => {},
  currency = "USD",
}) => {
  return (
    <div className="card">
      
      <div className="header-container">
        <div className="card-container-header" onClick={onToggleExpand}>
          <span className="expand-icon">
            {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </span>
          <h6 className="mb-0 ms-2">
            {campaign?.campaign_name || "Unnamed Campaign"}
          </h6>
        </div>
        {/* <button
          onClick={() => {
            onSelectAdSet(
              campaign.adsets && Array.isArray(campaign.adsets)
                ? campaign.adsets
                : []
            );
          }}
          className="view-ads-button"
        >
          View Ad Sets ({campaign?.adsets?.length || 0})
        </button> */}
      </div>

      {expanded && (
        <div className="card-body p-0 m-0">
          <MetricsSection data={campaign} currency={currency} />{" "}
          <div className="view-ads-container">
            <button
              onClick={() => {
                onSelectAdSet(
                  campaign.adsets && Array.isArray(campaign.adsets)
                    ? campaign.adsets
                    : []
                );
              }}
              className="view-ads-button"
            >
              View Ad Sets ({campaign?.adsets?.length || 0})
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignView;
