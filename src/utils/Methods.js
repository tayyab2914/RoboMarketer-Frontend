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
import dayjs from "dayjs";
import { AI_MODELS } from "./GlobalSettings";

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


export const INDUSTRIES = [
  { key: "agriculture_forestry", label: "Agriculture & Forestry" },
  {
    key: "arts_entertainment_recreation",
    label: "Arts, Entertainment & Recreation",
  },
  { key: "automotive", label: "Automotive" },
  { key: "biotech_life_sciences", label: "Biotech & Life Sciences" },
  { key: "construction_real_estate", label: "Construction & Real Estate" },
  { key: "consumer_goods", label: "Consumer Goods" },
  { key: "education_training", label: "Education & Training" },
  { key: "energy_utilities", label: "Energy & Utilities" },
  { key: "finance_insurance", label: "Finance & Insurance" },
  { key: "food_beverage", label: "Food & Beverage" },
  {
    key: "government_public_administration",
    label: "Government & Public Administration",
  },
  { key: "healthcare_pharmaceuticals", label: "Healthcare & Pharmaceuticals" },
  { key: "hospitality_travel", label: "Hospitality & Travel" },
  { key: "it_software", label: "IT & Software" },
  { key: "manufacturing_industrial", label: "Manufacturing & Industrial" },
  { key: "marketing_advertising", label: "Marketing & Advertising" },
  {
    key: "media_publishing_broadcasting",
    label: "Media, Publishing & Broadcasting",
  },
  { key: "mining_oil_gas", label: "Mining, Oil & Gas" },
  { key: "nonprofit_ngo", label: "Nonprofit & NGO" },
  {
    key: "professional_business_services",
    label: "Professional & Business Services",
  },
  { key: "retail_ecommerce", label: "Retail & E-commerce" },
  { key: "telecommunications", label: "Telecommunications" },
  { key: "transportation_logistics", label: "Transportation & Logistics" },
  { key: "wholesale_distribution", label: "Wholesale & Distribution" },
];
export const convertAIModelTypeToName = (type) => {
  for (const provider in AI_MODELS) {
    const model = AI_MODELS[provider].models.find(
      (model) => model.value === type
    );
    if (model) return model.name;
  }
  return null; // if not found
};
export const FILTER_PROMPTS_BY_CATEGORY = (dataArray, category) => {
  // console.log(dataArray)
  console.log("dataArray", dataArray);
  console.log("category", category);
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
export const SHOW_ERROR = (msg)=>{
    message.error(msg)
}
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
  if (
    [
      "Ad Spend",
      "CPC",
      "CPM",
      "Profit",
      "Revenue",
      "CPL",
      "CPA",
      "Cost Per Appt",
    ].includes(label)
  ) {
    return "$";
  } else {
    return "";
  }
};
function renderFile(url, fileName, size = 40, showName = false) {
  const getFileTypeFromURL = (url) => {
    const extension = url?.split(".")?.pop()?.toLowerCase();
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
        style={{
          width: "auto",
          height: "auto",
          maxHeight: 100,
          maxWidth: 100,
          objectFit: "cover",
          marginBottom: "20px",
        }}
      />
    );
  }

  if (fileType === "application/pdf") {
    return (
      <span style={{ display: "flex", flexDirection: "column" }}>
        <Tooltip title={fileName}>
          <FilePdfOutlined
            style={{ fontSize: size, color: "#FF6F61", marginBottom: "20px" }}
          />
        </Tooltip>
        {showName && (
          <span style={{ color: "#101136" }}>{fileName?.slice(0, 13)}</span>
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
        <Tooltip title={fileName}>
          <FileExcelOutlined
            style={{ fontSize: size, color: "#218838", marginBottom: "20px" }}
          />
        </Tooltip>
        {showName && (
          <span style={{ color: "#101136" }}>{fileName?.slice(0, 13)}</span>
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
        <Tooltip title={fileName}>
          <FileWordOutlined
            style={{ fontSize: size, color: "#1E90FF", marginBottom: "20px" }}
          />
        </Tooltip>
        {showName && (
          <span style={{ color: "#101136" }}>{fileName?.slice(0, 13)}</span>
        )}
      </span>
    );
  }

  // For other files, render a generic file icon
  return (
    <span style={{ display: "flex", flexDirection: "column" }}>
      <Tooltip title={fileName}>
        <FileOutlined style={{ fontSize: size, marginBottom: "20px" }} />
      </Tooltip>
      {showName && (
        <span style={{ color: "#101136" }}>{fileName?.slice(0, 13)}</span>
      )}
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
export function TRUNCATE_STRING(str, length = 30) {
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
  const { textBefore, table, textAfter } =
    extractTextAndTable(markdownWithText);
  console.log("TEXT", textBefore);
  console.log("TABLE\n", table);
  console.log("TEXT", textAfter);

  let htmlContent = "";

  if (textBefore) {
    htmlContent += `<p>${textBefore}</p>`;
  }

  if (isValidMarkdownTable(table)) {
    console.log("HEY");
    const tableHTML = formatMarkdownTableToHTML(table);
    htmlContent += tableHTML;
  } else {
    htmlContent += `<pre>${table}</pre>`;
  }

  if (textAfter) {
    htmlContent += `<p>${textAfter}</p>`;
  }

  return htmlContent;
}

export const formatTextToHTML = (inputText, prompts = []) => {
  let formattedText = inputText.replace(
    /\*\*\*(.*?)\*\*\*/g,
    "<b><i>$1</i></b>"
  );
  formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
  formattedText = formattedText.replace(/\*(.*?)\*/g, "<i>$1</i>");
  formattedText = formattedText.replace(/\n/g, "<br>");

  const mentionRegex = /@[^\s]+/g;
  formattedText = formattedText.replace(mentionRegex, (match) => {
    const prompt = prompts.find((p) => `@${p.prompt_hashtag}` === match);
    if (prompt) {
      return `<span class="mention" data-prompt="${prompt.prompt_name}">${match}</span>`;
    }

    return match;
  });

  return formattedText;
};

export function isValidMarkdownTable(markdownTable) {
  const rows = markdownTable.trim().split("\n");
  if (rows.length < 3) {
    return false;
  }

  const headerRow = rows[0].trim();
  const separatorRow = rows[1].trim();
  if (!headerRow.includes("|") || !separatorRow.includes("|")) {
    return false;
  }

  return true;
}

export function formatMarkdownTableToHTML(markdownTable) {
  const rows = markdownTable.trim().split("\n");
  const headers = rows[0]
    .split("|")
    .map((cell) => cell.trim())
    .filter(Boolean);
  const dataRows = rows.slice(2).map((row) =>
    row
      .split("|")
      .map((cell) => cell.trim())
      .filter(Boolean)
  );

  let html = "<table>";
  html += "<thead><tr>";
  headers.forEach((header) => {
    html += `<th>${header.replace(/\*\*/g, "")}</th>`;
  });
  html += "</tr></thead>";

  html += "<tbody>";
  dataRows.forEach((row) => {
    html += "<tr>";
    row.forEach((cell) => {
      html += `<td>${cell}</td>`;
    });
    html += "</tr>";
  });
  html += "</tbody></table>";

  return html;
}

export function extractTextAndTable(content) {
  // Extract markdown table from content
  const tableMatch = content.match(/(\|.*\|(\n\|.*\|)+)/s);
  let table = "";
  let textBefore = "";
  let textAfter = "";

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

export const SHOW_API_NOT_SETUP_ERROR = () => {
  message.error(
    "No OpenAI API key found for this account. Please add your OpenAI API key in the settings menu."
  );
};

export const rangePresets = [
  {
    label: "Today",
    value: [dayjs().startOf("day"), dayjs().endOf("day")],
  },
  {
    label: "Yesterday",
    value: [
      dayjs().subtract(1, "day").startOf("day"),
      dayjs().subtract(1, "day").endOf("day"),
    ],
  },
  {
    label: "Last 7 Days",
    value: [dayjs().subtract(7, "days"), dayjs()],
  },
  {
    label: "Last 14 Days",
    value: [dayjs().subtract(14, "days"), dayjs()],
  },
  {
    label: "Last 30 Days",
    value: [dayjs().subtract(30, "days"), dayjs()],
  },
  {
    label: "Last 90 Days",
    value: [dayjs().subtract(90, "days"), dayjs()],
  },
  {
    label: "Last 6 Months",
    value: [dayjs().subtract(6, "months"), dayjs()],
  },
  {
    label: "Last Year",
    value: [dayjs().subtract(1, "year"), dayjs()],
  },
  {
    label: "Lifetime",
    value: [dayjs("2010-01-01"), dayjs()],
  },
];
export const HIGHLIGHT_AT_TEXT = (text) => {
    const regex = /@[^\s]+/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      const start = match.index;
      const end = start + match[0].length;

      if (lastIndex < start) {
        parts.push(text.slice(lastIndex, start));
      }
      parts.push( <span key={start} style={{ color: "#1890ff" }}> {" "} {match[0]} </span> );
      lastIndex = end;
    }
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }
    return parts;
  };


  export const TEMPORARY_TESTING_DATA = {
    id: 185,
    account: 2,
    message: "",
    type: "LLM",
    created_at: "2025-03-08T23:57:16.245615+05:00",
    uploads: [],
    meta_data: {
      contains: "create_campaign",
      original_query: "Create Facebook ad website lead generation campaign"
    },
    message_type: "JSON",
    json_message: {
      products: [
        {
          id: 2,
          account: 2,
          product_name: "Cloud Integration",
          product_description: "In today’s digital landscape, seamless cloud integration is essential for businesses looking to enhance efficiency, security, and scalability. As an independent cloud integration specialist, I help businesses connect their cloud platforms, on-premises systems, and third-party applications to create a unified, efficient, and secure digital ecosystem. My expertise ensures smooth data flow, enhanced security, and optimized performance, allowing organizations to harness the full potential of cloud computing without disruptions.",
          product_core_benefits: "Cloud integration brings numerous advantages to businesses of all sizes. One of the key benefits is seamless connectivity, ensuring that different systems work together harmoniously without data silos or compatibility issues. Security is another crucial factor—by implementing industry-best security measures, I help businesses protect their sensitive data while maintaining compliance with relevant regulations. Scalability is a significant advantage of cloud integration, allowing companies to expand their digital infrastructure as their business grows. Additionally, optimized cloud usage reduces operational costs, making IT investments more efficient. With real-time data synchronization, decision-making becomes faster and more informed, driving business success.",
          product_features: "My services cover a wide range of cloud integration solutions designed to fit different business needs. I specialize in multi-cloud and hybrid cloud integration, ensuring businesses can operate efficiently across different cloud platforms. API management and automation streamline business processes, reducing manual work and improving system efficiency. Real-time data synchronization ensures that all connected systems receive up-to-date information instantly. I also provide AI-powered monitoring and optimization, allowing businesses to track system performance and enhance efficiency proactively. Customizable dashboards and analytics offer businesses complete visibility into their cloud infrastructure, and my security and compliance frameworks ensure that all integrations meet industry standards.",
          product_problems_solved: "Many businesses face challenges with disconnected IT systems, which slow down operations and create inefficiencies. Security risks in cloud data management are another common concern, making businesses hesitant to move fully to the cloud. High operational costs due to inefficient cloud usage can also be a burden. Additionally, limited scalability in existing infrastructure can restrict business growth, and data silos prevent real-time insights that are essential for decision-making. My cloud integration solutions address these challenges, ensuring smooth, secure, and efficient operations.",
          product_ideal_use_case: "My services are ideal for businesses and professionals who want to transition to the cloud or enhance their current cloud infrastructure. Enterprises migrating from on-premises systems to cloud platforms benefit from my expertise in ensuring a smooth and secure transition. SaaS providers looking for API integration can streamline their software offerings with my assistance. E-commerce businesses that require real-time inventory updates can maintain accurate stock levels effortlessly. Financial institutions can ensure secure cloud transactions while complying with regulations, and healthcare organizations can efficiently manage patient data across multiple systems with my integration solutions.",
          product_unique_selling_proposition: "Unlike traditional cloud integration providers that rely on generic solutions, I offer personalized services tailored to each client’s specific needs. My AI-driven cloud automation and real-time data synchronization ensure businesses experience minimal downtime while maximizing efficiency. Additionally, my end-to-end security approach provides businesses with peace of mind, knowing that their data and systems are protected at all times.",
          product_customer_testimonials: null,
          product_pricing: "-2.00",
          target_audience_description: null,
          demographics_age_range: null,
          demographics_gender: null,
          demographics_education_level: null,
          demographics_income_range: null,
          demographics_occupation: null,
          primary_interest: null,
          secondary_interest: null,
          paid_points_or_challenges: null,
          goals_motivation: null,
          desired_benefits: null,
          emotional_drivers: null,
          unique_needs_or_preferences: null,
          selected: true
        }
      ],
      funnels: [
        {
          id: 2,
          account: 2,
          name: "Lead Generation Funnel",
          funnel_type: "leadGeneration",
          description: "description",
          steps: [
            {
              id: 1,
              name: "mywebsite.com",
              description: "description",
              url: "https://www.mywebsite.com"
            }
          ],
          selected: true
        }
      ]
    },
    recommendations: [],
    campaign_outline: [
      {
        id: 37,
        campaign_configuration: {
          name: "Campaign | OUTCOME_LEADS | Cloud Integration",
          objective: "OUTCOME_LEADS",
          status: "PAUSED",
          isCBOEnabled: true,
          bid_strategy: "LOWEST_COST_WITHOUT_CAP",
          daily_budget: 1,
          audience: "N/A",
          budget_type: "CBO",
          product: "Cloud Integration",
          funnel: "Lead Generation Funnel",
          pixel_id: "1091677351507875",
          pixel: "DFYDealFinder Pixel",
          account_id: "398925883313675",
          account_name: "RoboMarketer",
          currency: "USD",
          adset_data: [
            {
              name: "OUTCOME_LEADS | Cloud Integration | General Audience",
              status: "PAUSED",
              targeting: {
                age_min: 18,
                age_max: 65,
                genders: 0,
                device_platforms: []
              },
              publisher_platforms: [
                "advance+"
              ],
              conversion_domain: "website",
              daily_budget: null,
              bid_strategy: null,
              custom_event_type: "LEAD",
              ad_data: [
                {
                  name: "Cloud Integration | General Audience | Maximize Your Cloud Efficiency",
                  creative: {
                    name: "Maximize Your Cloud Efficiency",
                    object_story_spec: {
                      link_data: {
                        link: "https://www.mywebsite.com",
                        message: "Is your business struggling with disconnected IT systems? Cloud integration is your solution! It ensures smooth connectivity between your platforms, optimizes costs, and enhances scalability. With tailored services, enjoy minimal downtime and top-notch security for your data. Don't miss out on the digital transformation—discover how to unify your cloud systems today!",
                        call_to_action: {
                          type: "LEARN_MORE"
                        }
                      }
                    }
                  },
                  is_video: true,
                  image_hash: "99d395d4f4be57857331f4f5004436bf",
                  video_id: "928869855744262"
                },
                {
                  name: "Cloud Integration | General Audience | Seamless Cloud Integration Solutions",
                  creative: {
                    name: "Seamless Cloud Integration Solutions",
                    object_story_spec: {
                      link_data: {
                        link: "https://www.mywebsite.com",
                        message: "Are you experiencing inefficiencies and high operational costs with your current cloud setup? Our cloud integration services solve these problems by synchronizing your data in real-time and providing unmatched scalability. Experience personalized support and AI-driven optimization—your cloud will never be the same!",
                        call_to_action: {
                          type: "CONTACT_US"
                        }
                      }
                    }
                  },
                  is_video: true,
                  image_hash: "99d395d4f4be57857331f4f5004436bf",
                  video_id: "928869855744262"
                },
                {
                  name: "Cloud Integration | General Audience | Transform Your Business Operations Now!",
                  creative: {
                    name: "Transform Your Business Operations Now!",
                    object_story_spec: {
                      link_data: {
                        link: "https://www.mywebsite.com",
                        message: "Ready to take your business to the next level? Cloud integration simplifies your operations and ensures your systems work together seamlessly, enhancing security and reducing costs. Don't let inefficiencies hold you back; get tailored solutions that fit your unique needs and drive growth. Act fast—your transformation awaits!",
                        call_to_action: {
                          type: "BOOK_NOW"
                        }
                      }
                    }
                  },
                  is_video: true,
                  image_hash: "99d395d4f4be57857331f4f5004436bf",
                  video_id: "928869855744262"
                }
              ]
            },
            // More adsets...
          ]
        },
        status: "DRAFT",
        error_message: null,
        campaign_creation_error_messages: {},
        created_at: "2025-03-08T23:57:41.570810+05:00",
        updated_at: "2025-03-08T23:57:41.570824+05:00"
      }
    ],
    feedback: null
  };
  