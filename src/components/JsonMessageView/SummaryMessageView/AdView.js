import React from "react";
import MetricsSection from "./MetricsSection";
import { ChevronDown, ChevronRight } from "lucide-react";
import "./styles/JsonMessage.css";

const AdView = ({
  ad,
  adsetName,
  expanded,
  onToggleExpand,
  currency = "USD",
}) => (
  <div className="space-y-4">
    <div className="card">
      <div className="list-header border-b mb-3">
        <h6 className="header-title">{adsetName}</h6>
      </div>
      {/* <div className="card-container-header" onClick={onToggleExpand}> */}
      <div className="card-container-header">
        {/* <span className="expand-icon">
          {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </span> */}
        <h6 className="mb-0">{ad.ad_name}</h6>
      </div>

      {/* {expanded && ( */}
      <div className="mt-3">
        <MetricsSection data={ad} currency={currency} />

        {ad.ad_creative && (
          <div className="card-body px-0">
            <h6 className="card-body-title">Creative Details</h6>
            <div className="card-body-text ad-creative">
              {ad.ad_creative.image_url && (
                <img
                  src={ad.ad_creative.image_url}
                  alt="Ad creative"
                  style={{ width: "70%", height: "auto" }}
                  className="rounded-lg w-full object-cover mt-2"
                />
              )}
              <p style={{ marginTop: "15px" }}>
                <strong>Title:</strong> {ad.ad_creative.title}
              </p>
              <p style={{ marginTop: "15px" }}>
                <strong>Body:</strong> {ad.ad_creative.body}
              </p>
              {ad.ad_creative?.object_story_spec?.link_data?.link && (
                <p style={{ marginTop: "15px" }}>
                  <strong>Destination Link:</strong>{" "}
                  <a
                    href={ad.ad_creative.object_story_spec.link_data.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {ad.ad_creative.object_story_spec.link_data.link}
                  </a>
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      {/* )} */}
    </div>
  </div>
);

export default AdView;
