import React from "react";
import "./styles/JsonMessage.css";

const MetricBadge = ({ label, value, prefix = "", suffix = "" }) => {
    function formatWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
  if (value === undefined || value === null) return null;

  const formattedValue =
    typeof value === "number"
      ? label.toLowerCase().includes("rate") ||
        label.toLowerCase().includes("roas")
        ? `${value.toFixed(2)}${suffix}`
        : label.toLowerCase().includes("impression") ||
          label.toLowerCase().includes("click")
        ? `${prefix}${value}${suffix}`
        : `${prefix}${value.toFixed(2)}${suffix}`
      : value;

  const isPositive = typeof value === "number" && value > 0;
  const isZero = typeof value === "number" && value === 0;
  const isNegative = typeof value === "number" && value < 0;

  return (
    <div className="metric-badge">
      <span className="metric-badge-label">{label}:</span>
      <span
        className={`metric-badge-value ${
          isPositive
            ? "metric-badge-positive"
            : isNegative
            ? "metric-badge-negative"
            : isZero
            ? "metric-badge-neutral"
            : ""
        }`}
      >
        {formatWithCommas(formattedValue)}
      </span>
    </div>
  );
};

export default MetricBadge;
