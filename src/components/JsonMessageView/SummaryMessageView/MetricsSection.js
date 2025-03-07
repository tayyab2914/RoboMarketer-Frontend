import React from "react";
import MetricBadge from "./MetricBadge";
import "./styles/JsonMessage.css";

const MetricsSection = ({ data, currency }) => {
  const currencySymbols = {
    USD: "$",
    INR: "₹",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    AUD: "$",
    CAD: "$",
    CNY: "¥",
  };

  const metricInfo = {
    ctr: { label: "Clickthrough Rate (CTR)", suffix: "%" },
    leads: { label: "Leads" },
    cpl: { label: "Cost Per Lead", prefix: currencySymbols[currency] || "$" },
    appointments: { label: "Appointments" },
    cost_per_appointment: {
      label: "Cost Per Appointment",
      prefix: currencySymbols[currency] || "$",
    },
    sales: { label: "Sales" },
    cpa: { label: "CPA", prefix: currencySymbols[currency] || "$" },
    roas: { label: "ROAS", suffix: "X" },
    spend: { label: "Amount Spent", prefix: currencySymbols[currency] || "$" },
    optin_rate: { label: "Optin Rate", suffix: "%" },
    cpc: { label: "Cost Per Click", prefix: currencySymbols[currency] || "$" },
    cpm: {
      label: "Cost Per Thousand Impressions (CPM)",
      prefix: currencySymbols[currency] || "$",
    },
    close_rate: { label: "Close Rate", suffix: "%" },
    impressions: { label: "Impressions" },
    revenue: { label: "Revenue", prefix: currencySymbols[currency] || "$" },
    clicks: { label: "Clicks" },
  };

  return (
    <div className="metrics-section border-top">
      {Object.keys(data).map((key) => {
        if (metricInfo[key]) {
          const { label, prefix, suffix } = metricInfo[key];
          return (
            <MetricBadge
              key={key}
              label={label}
              value={data[key]}
              prefix={prefix}
              suffix={suffix}
            />
          );
        }
        return null; // Skip keys not in metricInfo
      })}
    </div>
  );
};

export default MetricsSection;
