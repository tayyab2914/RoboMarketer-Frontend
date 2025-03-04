import React, { useEffect, useState, useRef } from "react";
import "./styles/JsonMessage.css";
import { ICONS } from "../../../data/IconData";
import MetricsSection from "./MetricsSection";
import CampaignView from "./CampaignView";
import AdSetListView from "./AdSetListView";
import AdListView from "./AdListView";
import { ChevronDown, ChevronRight, ChevronUp } from "lucide-react";
import moment, { min } from "moment";
import { useNavigate } from "react-router-dom";

const SummaryMessage = ({ data, level, currency }) => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [selectedView, setSelectedView] = useState(level); // Set initial view based on level
  const [selectedAdSet, setSelectedAdSet] = useState(
    level === "adset" ? data?.data?.data : null
  );
  const [selectedAd, setSelectedAd] = useState(
    level === "ad" ? data?.data?.data : null
  );
  const [expandedAdsetIndex, setExpandedAdsetIndex] = useState(0);
  const [expandedAdset, setExpandedAdset] = useState(false);

  const campaigns = data?.data?.data || [];
  const accountData = data?.data?.account_data || {};

  const dateRange = {
    from: data?.from_date,
    to: data?.to_date,
  };

  const handleBack = () => {
    if (selectedAd) {
      setSelectedAd(null);
    } else if (selectedAdSet) {
      setSelectedAdSet(null);
      setSelectedView(level === "campaign" ? "campaign" : "summary");
    } else {
      setSelectedView("summary");
    }
  };

  const handleSelectAdSet = (adset) => {
    setSelectedAdSet(adset);
    setSelectedView("adset");
  };

  const handleSelectAd = (ad) => {
    setSelectedAd(ad);
  };

  const toggleAdsetExpand = (index) => {
    setExpandedAdsetIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const toggleActiveCampionExpand = () => {
    setExpandedAdset(!expandedAdset);
    if (expandedAdset) {
      setExpandedAdsetIndex(0);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedView, selectedAdSet, selectedAd]);

  return (
    <div
      className="min-h-screen bg-gray-50 card fixed-width-container"
      ref={containerRef}
    >
      <div className="mb-6">
        <div className="custom-container">
          <div className="custom-heading-container">
            <span className="mb-0">Summary Report</span>
            <span className="custom-badge">
              <span className="custom-badge-text">
                {moment(dateRange.from).format("DD MMM,YYYY")} -{" "}
                {moment(dateRange.to).format("DD MMM,YYYY")}
              </span>
            </span>
          </div>
        </div>

        {selectedAd ? (
          <AdListView
            ads={selectedAd}
            onBack={handleBack}
            onSelectAd={handleSelectAd}
            adsetName={selectedAdSet && selectedAdSet[0]?.adset_name}
            expandedAdsetIndex={expandedAdsetIndex}
            onToggleExpand={toggleAdsetExpand}
            level={level}
            currency={currency}
          />
        ) : selectedView === "adset" ? (
          <AdSetListView
            adsets={selectedAdSet || campaigns[0]?.adsets}
            onBack={handleBack}
            onSelectAd={handleSelectAd}
            expandedAdsetIndex={expandedAdsetIndex}
            onToggleExpand={toggleAdsetExpand}
            level={level}
            currency={currency}
          />
        ) : selectedView === "campaign" ? (
          <>
            <div className="card">
              <div className="card-header px-0 mb-3">
                <img
                  src={ICONS.performance_icon}
                  alt="Performance Icon"
                  className="icon"
                  style={{ width: "26px", height: "26px" }}
                />
                <span className="font-medium mb-0">Account-Wide Summary</span>
              </div>
              <MetricsSection data={accountData} currency={currency} />
            </div>
            <div className="card mt-3">
              <div
                className="active-container"
                onClick={toggleActiveCampionExpand}
              >
                <div className="font-medium custom-heading-number">
                  <div className="card-header-active-campaign">
                    <img
                      src={ICONS.active_campaign}
                      alt="active campaign Icon"
                      className="icon"
                      style={{ width: "30px", height: "30px" }}
                    />
                    <h5
                      className="text-lg font-medium whitespace-nowrap card-header px-0"
                      style={{ border: "none" }}
                    >
                      Active Campaigns
                    </h5>
                  </div>
                  <span className="custom-badge-number">
                    <span>{campaigns.length}</span>
                  </span>
                </div>
                {campaigns.length > 0 && (
                  <span className="expand-icon">
                    {expandedAdset ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </span>
                )}
              </div>
              {expandedAdset && (
                <div className="campaign-container pt-3 px-2">
                  {campaigns.map((campaign, index) => (
                    <CampaignView
                      key={campaign.campaign_id}
                      campaign={campaign}
                      onSelectAdSet={handleSelectAdSet}
                      expanded={expandedAdsetIndex === index}
                      onToggleExpand={() => toggleAdsetExpand(index)}
                      currency={currency}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default SummaryMessage;
