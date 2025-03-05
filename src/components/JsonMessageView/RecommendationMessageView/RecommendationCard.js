import { ShieldAlert } from "lucide-react";
import { ICONS } from "../../../data/IconData";
import "./styles/JsonMessage.css";
import { useState } from "react";

export default function RecommendationCard({ data, onAccept, onDeny }) {
    const [charLimit, setCharLimit] = useState(400);

    const handleShowMore = () => {
    setCharLimit((prevLimit) => prevLimit + 400);
    };
  function capitalizeFirstCharacter(str) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const { name, level, recommendation, reasoning, projection, status, error_message, } = data;

  // Decide what to display based on status
  const renderStatusLabel = () => {
    if (status === "ACCEPTED") {
      return <span className="status-label-accepted accepted">Accepted</span>;
    }
    if (status === "DECLINED") {
      return <span className="status-label-declined declined">Declined</span>;
    }
    if (status === "ERROR") {
      return (
        <div className="status-label error">
          <ShieldAlert />
          {error_message || "Unknown error."}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <div className="card-header-recommendation">
        <div className="card-title">{name}</div>
        <span className="badge">{capitalizeFirstCharacter(level)}</span>
      </div>
    <div className="recommendation-card-wrapper">
        
      <div className="section">
        <img
          src={ICONS.recommendation_icon}
          alt="Recommendation Icon"
          className="icon"
          style={{ width: "23px", height: "23px" }}
        />
        <h6 style={{ fontWeight: 600 }} className="mb-0">
          Recommendation:
        </h6>
      </div>
      <div className="content">
        <p className="mt-2"> {recommendation?.slice(0, charLimit)} {charLimit < recommendation?.length && "..."} </p>
        {charLimit < recommendation?.length && ( <button onClick={handleShowMore} className="show-more-btn"> Show More </button> )}
    </div>

      <div className="section mt-3">
        <img
          src={ICONS.reasoning_icon}
          alt="Reasoning Icon"
          className="icon"
          style={{ width: "20px", height: "20px" }}
        />
        <h6 style={{ fontWeight: 600 }} className="mb-0">
          Reasoning:
        </h6>
      </div>
      <div className="content">
        <p className="mt-2"> {reasoning?.slice(0, charLimit)} {charLimit < reasoning?.length && "..."} </p>
        {charLimit < reasoning?.length && ( <button onClick={handleShowMore} className="show-more-btn"> Show More </button> )}
    </div>

      <div className="section mt-3">
        <img
          src={ICONS.projection_icon}
          alt="Projection Icon"
          className="icon"
          style={{ width: "25px", height: "25px" }}
        />
        <h6 style={{ fontWeight: 600 }} className="mb-0">
          Projection:
        </h6>
      </div>
      <div className="content">
        <p className="mt-2"> {projection?.slice(0, charLimit)} {charLimit < projection?.length && "..."} </p>
        {charLimit < projection?.length && ( <button onClick={handleShowMore} className="show-more-btn"> Show More </button> )}
    </div>
    </div>
      {/* Show status label if ACCEPTED/DECLINED/ERROR */}
      {renderStatusLabel()}

      {/* Only show Accept/Deny buttons if the recommendation is still in DRAFT status */}
      {status === "DRAFT" && (
        <div className="buttons">
          <button className="button accept-button" onClick={onAccept}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" >
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Accept
          </button>
          <button className="button deny-button" onClick={onDeny}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
            Deny
          </button>
        </div>
      )}
    </div>
  );
}
