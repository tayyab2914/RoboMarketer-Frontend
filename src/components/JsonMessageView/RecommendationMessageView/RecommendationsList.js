import { useState, useEffect } from "react";
import RecommendationCard from "./RecommendationCard.js";
import { useSelector } from "react-redux";
import "./styles/JsonMessage.css";
import { API_APPLY_RECOMMENDATION } from "../../../apis/ChatApis.js";

export default function RecommendationsList({ data }) {
  const { token } = useSelector((state) => state.authToken);

  const [recommendations, setRecommendations] = useState(
    data.map((rec) => ({
      ...rec,
      status: rec.status || "DRAFT",
      error_message: null,
    }))
  );

  const DRAFTCount = recommendations.filter((r) => r.status === "DRAFT").length;

  const applyRecommendation = async (recsToSend, actionType) => {
    try {
      const response = await API_APPLY_RECOMMENDATION(token, {
        is_approved_or_denied: actionType,
        recommendations: recsToSend,
      });
      return response;
    } catch (error) {
      console.error("Error applying recommendation:", error);
      return null;
    }
  };

  const handleAccept = async (selectedRecommendation) => {
    const updatedRec = { ...selectedRecommendation, status: "ACCEPTED" };
    const response = await applyRecommendation([updatedRec], "APPROVE");
    if (response && response.recommendations) {
      setRecommendations((prev) =>
        prev.map((r) => {
          const serverRec = response.recommendations.find(
            (sr) => sr.id === r.id
          );
          return serverRec ? { ...r, ...serverRec } : r;
        })
      );
    } else {
      setRecommendations((prev) =>
        prev.map((r) =>
          r.id === selectedRecommendation.id
            ? {
                ...r,
                status: "ERROR",
                error_message: "Failed to accept recommendation.",
              }
            : r
        )
      );
    }
  };

  const handleDeny = async (selectedRecommendation) => {
    const updatedRec = { ...selectedRecommendation, status: "DECLINED" };
    const response = await applyRecommendation([updatedRec], "DECLINED");
    if (response && response.recommendations) {
      setRecommendations((prev) =>
        prev.map((r) => {
          const serverRec = response.recommendations.find(
            (sr) => sr.id === r.id
          );
          return serverRec ? { ...r, ...serverRec } : r;
        })
      );
    } else {
      setRecommendations((prev) =>
        prev.map((r) =>
          r.id === selectedRecommendation.id
            ? {
                ...r,
                status: "ERROR",
                error_message: "Failed to decline recommendation.",
              }
            : r
        )
      );
    }
  };

  const handleAcceptAll = async () => {
    const DRAFTRecs = recommendations.filter((r) => r.status === "DRAFT");
    const recsToSend = DRAFTRecs.map((r) => ({ ...r, status: "ACCEPTED" }));
    const response = await applyRecommendation(recsToSend, "APPROVE");
    if (response && response.recommendations) {
      setRecommendations((prev) =>
        prev.map((r) => {
          const serverRec = response.recommendations.find(
            (sr) => sr.id === r.id
          );
          return serverRec ? { ...r, ...serverRec } : r;
        })
      );
    } else {
      setRecommendations((prev) =>
        prev.map((r) =>
          r.status === "DRAFT"
            ? { ...r, status: "ERROR", error_message: "Failed to accept all." }
            : r
        )
      );
    }
  };

  const handleDenyAll = async () => {
    const DRAFTRecs = recommendations.filter((r) => r.status === "DRAFT");
    const recsToSend = DRAFTRecs.map((r) => ({ ...r, status: "DECLINED" }));
    const response = await applyRecommendation(recsToSend, "DECLINED");
    if (response && response.recommendations) {
      setRecommendations((prev) =>
        prev.map((r) => {
          const serverRec = response.recommendations.find(
            (sr) => sr.id === r.id
          );
          return serverRec ? { ...r, ...serverRec } : r;
        })
      );
    } else {
      setRecommendations((prev) =>
        prev.map((r) =>
          r.status === "DRAFT"
            ? { ...r, status: "ERROR", error_message: "Failed to decline all." }
            : r
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 card fixed-width-container">
      <div className="recommendations-container">
        <div className="recommendations-header">
          <h1>Optimization Recommendations</h1>
          <span className="recommendations-count">
            {recommendations.length}
          </span>
        </div>

        <div className="recommendation-cards">
          {recommendations.map((recommendation, index) => (
            <RecommendationCard
              key={index}
              data={recommendation}
              onAccept={() => handleAccept(recommendation)}
              onDeny={() => handleDeny(recommendation)}
            />
          ))}
        </div>

        <div className="buttons">
          <button
            onClick={handleAcceptAll}
            className="button accept-button-all-recommendations"
            disabled={DRAFTCount === 0}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Implement Recommendations ({DRAFTCount})
          </button>

          <button
            onClick={handleDenyAll}
            className="button deny-button"
            disabled={DRAFTCount === 0}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
            Deny All
          </button>
        </div>
      </div>
    </div>
  );
}
