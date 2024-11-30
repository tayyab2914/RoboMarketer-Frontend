import { Tooltip } from "antd";
import { useEffect } from "react";
import {
  UploadOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  FileWordOutlined,
  FileOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

export const GET_PROMPT_CATEGORIES = [
  { header: "Campaign", key: "2", icon: "note" },
  { header: "Analytics", key: "3", icon: "analytics" },
  { header: "Questions", key: "4", icon: "question" },
  { header: "Help", key: "5", icon: "help" },
  { header: "Copywriting", key: "6", icon: "copywriting" },
  { header: "Recommendations", key: "7", icon: "recommendations" },
  { header: "CRO", key: "8", icon: "cro" },
  { header: "Funnels", key: "9", icon: "funnels" },
  { header: "Marketing", key: "10", icon: "marketing" },
  { header: "Strategy", key: "11", icon: "strategy" },
  { header: "Offer", key: "12", icon: "offer" },
  { header: "Competitors", key: "13", icon: "competitor" },
  { header: "Charts", key: "14", icon: "chart" },
];

export const FILTER_PROMPTS_BY_CATEGORY = (dataArray, category) => {
  // console.log(dataArray)
  return dataArray?.filter((item) => item.category === category);
};

export const RENDER_FILE_PREVIEW = (file, size, showName) => {
  console.log(file);
  const fileType = file?.type;

    if (fileType?.startsWith("image/") && file?.originFileObj instanceof Blob) {
        return (
          <img
            src={URL.createObjectURL(file.originFileObj)}
            alt={file?.name}
            style={{ width: size, height: size, margin: "10px" }}
          />
        );
      }
    

  if (fileType === "application/pdf") {
    return (
      <span style={{ display: "flex", flexDirection: "column" }}>
        <Tooltip title={file?.name}>
          <FilePdfOutlined
            style={{ fontSize: size, color: "#FF6F61", margin: "10px" }}
          />
        </Tooltip>
        {showName && (
          <span style={{ color: "#101136" }}>{file?.name?.slice(0, 13)}</span>
        )}
      </span>
    );
  }

  if (
    fileType ===
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    return (
      <span style={{ display: "flex", flexDirection: "column" }}>
        <Tooltip title={file?.name}>
          <FileExcelOutlined
            style={{ fontSize: size, color: "#218838", margin: "10px" }}
          />
        </Tooltip>
        {showName && (
          <span style={{ color: "#101136" }}>{file?.name?.slice(0, 13)}</span>
        )}
      </span>
    );
  }

  if (
    fileType === "application/msword" ||
    fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return (
      <span style={{ display: "flex", flexDirection: "column" }}>
        <Tooltip title={file?.name}>
          <FileWordOutlined
            style={{ fontSize: size, color: "#1E90FF", margin: "10px" }}
          />
        </Tooltip>
        {showName && (
          <span style={{ color: "#101136" }}>{file?.name?.slice(0, 13)}</span>
        )}
      </span>
    );
  }

  // For other files, just show the file name
  return (
    <span style={{ display: "flex", flexDirection: "column" }}>
      <Tooltip title={file?.name}>
        <FileOutlined style={{ fontSize: size, margin: "10px" }} />
      </Tooltip>
      {showName && (
        <span style={{ color: "#101136" }}>{file?.name?.slice(0, 13)}</span>
      )}
    </span>
  );
};

function renderFile(url, fileName, size = 40, showName = false) {
  const getFileTypeFromURL = (url) => {
    const extension = url?.split('.')?.pop()?.toLowerCase();
    const mimeTypes = {
      pdf: "application/pdf",
      png: "image/png",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      gif: "image/gif",
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      xls: "application/vnd.ms-excel",
      doc: "application/msword",
      docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    };
    return mimeTypes[extension] || "unknown";
  };

  const fileType = getFileTypeFromURL(url);

  if (fileType.startsWith("image/")) {
    return (
      <img
        src={url}
        alt={fileName}
        style={{ width: 'auto', height:  'auto',maxHeight:100,maxWidth:100,objectFit:"cover", marginBottom:"20px"  }}
      />
    );
  }

  if (fileType === "application/pdf") {
    return (
      <span style={{ display: "flex", flexDirection: "column" }}>
        <Tooltip title={fileName}>
          <FilePdfOutlined
            style={{ fontSize: size, color: "#FF6F61", marginBottom:"20px" }}
          />
        </Tooltip>
        {showName && <span style={{ color: "#101136" }}>{fileName?.slice(0, 13)}</span>}
      </span>
    );
  }

  if (fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
    return (
      <span style={{ display: "flex", flexDirection: "column" }}>
        <Tooltip title={fileName}>
          <FileExcelOutlined
            style={{ fontSize: size, color: "#218838", marginBottom:"20px" }}
          />
        </Tooltip>
        {showName && <span style={{ color: "#101136" }}>{fileName?.slice(0, 13)}</span>}
      </span>
    );
  }

  if (
    fileType === "application/msword" ||
    fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return (
      <span style={{ display: "flex", flexDirection: "column" }}>
        <Tooltip title={fileName}>
          <FileWordOutlined
            style={{ fontSize: size, color: "#1E90FF", marginBottom:"20px" }}
          />
        </Tooltip>
        {showName && <span style={{ color: "#101136" }}>{fileName?.slice(0, 13)}</span>}
      </span>
    );
  }

  // For other files, render a generic file icon
  return (
    <span style={{ display: "flex", flexDirection: "column" }}>
      <Tooltip title={fileName}>
        <FileOutlined style={{ fontSize: size, marginBottom:"20px" }} />
      </Tooltip>
      {showName && <span style={{ color: "#101136" }}>{fileName?.slice(0, 13)}</span>}
    </span>
  );
}

export default renderFile;

export const AVAILABLE_METRICS = [
  { key: "spend", label: "Ad Spend" },
  { key: "impressions", label: "Impressions" },
  { key: "clicks", label: "Clicks" },
  { key: "cpm", label: "CPM" },
  { key: "ctr", label: "CTR" },
  { key: "cpc", label: "CPC" },
  { key: "cpa", label: "CPA" },
  { key: "optin_rate", label: "Optin Rate" },
  { key: "cpl", label: "CPL" },
  { key: "appointment_rate", label: "Appt Rate" },
  { key: "cost_per_appointment", label: "Cost Per Appt" },
  { key: "leads", label: "Leads" },
  { key: "appointments", label: "Appts" },
  { key: "close_rate", label: "Close Rate" },
  { key: "sales", label: "Sales" },
//   { key: "cpa", label: "CPA" },
  { key: "roas", label: "Return on Ad Spend" },
  { key: "profit", label: "Profit" },
  { key: "revenue", label: "Revenue" },
];

export const GET_METRIC_NAME_FROM_KEY = (key) => {
  const metric = AVAILABLE_METRICS.find((metric) => metric.key === key);
  return metric ? metric.label : null;
};

export const getMetricsStatus = (selectedMetrics) => {
    const selectedSet = new Set(selectedMetrics);
  
    return AVAILABLE_METRICS.reduce((acc, metric) => {
      acc[metric.key] = selectedSet.has(metric.key) ? true : false;
      return acc;
    }, {});
  };
  


  export function formatTextToHTML(inputText) {
    if (!inputText) return "";
  
    // Handle bold italic (***text***)
    let formattedText = inputText.replace(/\*\*\*(.*?)\*\*\*/g, "<b><i>$1</i></b>");
  
    // Handle bold (**text**)
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
  
    // Handle italic (*text*)
    formattedText = formattedText.replace(/\*(.*?)\*/g, "<i>$1</i>");
  
    // Replace line breaks (\n)
    formattedText = formattedText.replace(/\n/g, "<br>");
  
    return formattedText;
  }
  export function TRUNCATE_STRING(str,length=30) {
    if (str?.length <= length) {
      return str;
    } else {
      return `${str?.slice(0, length)}...`;
    }
  }
  