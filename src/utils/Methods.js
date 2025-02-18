import { message, Tooltip } from "antd";
import { useEffect } from "react";
import {
  UploadOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  FileWordOutlined,
  FileOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import dayjs from 'dayjs';

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
  console.log('dataArray',dataArray)
  console.log('category',category)
  return dataArray?.filter((item) => item.category_name === category);
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
export const getSuffix = (label) => {
    if (["Return on Ad Spend"].includes(label)) {
      return "X";
    }
    if (["CTR", "Optin Rate", "Appt Rate", "Close Rate"].includes(label)) {
      return "%";
    }
    return "";
  };
  export const getPrefix = (label) => {
    if ( [ "Ad Spend", "CPC", "CPM", "Profit", "Revenue", "CPL", "CPA", "Cost Per Appt", ].includes(label)) {
      return "$";
    } else {
      return "";
    }
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
  export function TRUNCATE_STRING(str,length=30) {
    if (str?.length <= length) {
      return str;
    } else {
      return `${str?.slice(0, length)}...`;
    }
  }
  



export function PARSED_TEXT(inputText) {
    if (!inputText) return "";

    const markdownWithText = `
    Here’s a 5x5 table with random values:
    
    |   **A**   |   **B**   |   **C**   |   **D**   |   **E**   |
    |:---------:|:---------:|:---------:|:---------:|:---------:|
    |    12     |    54     |    88     |    32     |    19     |
    |    76     |    45     |    21     |    98     |    67     |
    |    34     |    89     |    56     |    73     |    90     |
    |    81     |    42     |    65     |    23     |    31     |
    |    27     |    39     |    50     |    68     |    11     |
    
    
    `;
    const { textBefore, table, textAfter } = extractTextAndTable(markdownWithText);
    console.log("TEXT",textBefore)
    console.log("TABLE\n", table)
    console.log("TEXT",textAfter)

    let htmlContent = '';

    if (textBefore) {
        htmlContent += `<p>${textBefore}</p>`;
    }

    if (isValidMarkdownTable(table)) {
        console.log("HEY")
        const tableHTML = formatMarkdownTableToHTML(table);
        htmlContent += tableHTML;
    } else {
        htmlContent += `<pre>${table}</pre>`;
    }

    if (textAfter) {
        htmlContent += `<p>${textAfter}</p>`;
    }

    return htmlContent
  }

export const formatTextToHTML = (inputText)=>{
    let formattedText = inputText.replace(/\*\*\*(.*?)\*\*\*/g, "<b><i>$1</i></b>")
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
    formattedText = formattedText.replace(/\*(.*?)\*/g, "<i>$1</i>");
    formattedText = formattedText.replace(/\n/g, "<br>");
  
    return formattedText;
}
  export function isValidMarkdownTable(markdownTable) {
    const rows = markdownTable.trim().split('\n');
    if (rows.length < 3) {
        return false;
    }
    
    const headerRow = rows[0].trim();
    const separatorRow = rows[1].trim();
    if (!headerRow.includes('|') || !separatorRow.includes('|')) {
        return false;
    }
    
    return true;
}
export function formatMarkdownTableToHTML(markdownTable) {
    const rows = markdownTable.trim().split('\n');
    const headers = rows[0].split('|').map(cell => cell.trim()).filter(Boolean);
    const dataRows = rows.slice(2).map(row => 
        row.split('|').map(cell => cell.trim()).filter(Boolean)
    );

    let html = '<table>';
    html += '<thead><tr>';
    headers.forEach(header => {
        html += `<th>${header.replace(/\*\*/g, '')}</th>`;
    });
    html += '</tr></thead>';

    html += '<tbody>';
    dataRows.forEach(row => {
        html += '<tr>';
        row.forEach(cell => {
            html += `<td>${cell}</td>`;
        });
        html += '</tr>';
    });
    html += '</tbody></table>';

    return html;
}
export function extractTextAndTable(content) {
    // Extract markdown table from content
    const tableMatch = content.match(/(\|.*\|(\n\|.*\|)+)/s);
    let table = '';
    let textBefore = '';
    let textAfter = '';

    if (tableMatch) {
        // Extract table part
        table = tableMatch[0];
        // Extract text before table
        textBefore = content.substring(0, tableMatch.index).trim();
        // Extract text after table
        textAfter = content.substring(tableMatch.index + table.length).trim();
    } else {
        // No table found, just return the entire content as text
        textBefore = content;
    }

    return { textBefore, table, textAfter };
}

export const SHOW_API_NOT_SETUP_ERROR = ()=>{
    message.error("No OpenAI API key found for this account. Please add your OpenAI API key in the settings menu.")
}


 export const rangePresets = [
    {
      label: 'Today',
      value: [dayjs().startOf('day'), dayjs().endOf('day')],
    },
    {
      label: 'Yesterday',
      value: [dayjs().subtract(1, 'day').startOf('day'), dayjs().subtract(1, 'day').endOf('day')], 
    },
    {
      label: 'Last 7 Days',
      value: [dayjs().subtract(7, 'days'), dayjs()], 
    },
    {
      label: 'Last 14 Days',
      value: [dayjs().subtract(14, 'days'), dayjs()], 
    },
    {
      label: 'Last 30 Days',
      value: [dayjs().subtract(30, 'days'), dayjs()], 
    },
    {
      label: 'Last 90 Days',
      value: [dayjs().subtract(90, 'days'), dayjs()], 
    },
    {
      label: 'Last 6 Months',
      value: [dayjs().subtract(6, 'months'), dayjs()],
    },
    {
      label: 'Last Year',
      value: [dayjs().subtract(1, 'year'), dayjs()], 
    },
    {
      label: 'Lifetime',
      value: [dayjs('2010-01-01'), dayjs()],
    },
  ];