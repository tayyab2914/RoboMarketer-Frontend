import React, { useEffect, useState, useCallback } from "react";
import "./styles/JsonMessage.css";
import { ChevronDown, ChevronUp, Package, ShieldAlert } from "lucide-react";
import { TbChartFunnel } from "react-icons/tb";
import { useSelector } from "react-redux";
import {
  API_GENERATE_OUTLINE_CAMPAIGN,
  API_LAUNCH_CAMPAIGN,
} from "../../../apis/ChatApis";
import Slider from "react-slick";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { FaClipboardList } from "react-icons/fa";
import { ICONS } from "../../../data/IconData";

const CampaignMessage = ({ data }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedFunnel, setSelectedFunnel] = useState(null);
  const [campaignData, setCampaignData] = useState(null);
  const [reqData, setReqData] = useState(null);
  const [expandedAdsetIndex, setExpandedAdsetIndex] = useState(0);
  const [expandedAd, setExpandedAd] = useState(-1);
  const [expandedAdIndex, setExpandedAdIndex] = useState(false);
  const [expandedAdset, setExpandedAdset] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [response, setResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState([]);
  const [step, setStep] = useState(1);
  const [charLimit, setCharLimit] = useState(400);

  const { token } = useSelector((state) => state.authToken);
  const jsonMessage =
    typeof data.json_message === "string"
      ? JSON.parse(data.json_message)
      : data.json_message;

  const handleShowMore = () => {
    setCharLimit((prevLimit) => prevLimit + 400);
  };

  useEffect(() => {
    setStep(selectedFunnel ? 3 : selectedProduct ? 2 : 1);
  }, [selectedProduct, selectedFunnel]);

  const sliderSettings = {
    adaptiveHeight: true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  useEffect(() => {
    setStep(selectedFunnel ? 3 : selectedProduct ? 2 : 1);
  }, [selectedProduct, selectedFunnel]);

  useEffect(() => {
    if (data.campaign_outline.length > 0) {
      let campaignConfig = data.campaign_outline[0]?.campaign_configuration;

      // Convert to JSON if it's a string
      if (typeof campaignConfig === "string") {
        try {
          campaignConfig = JSON.parse(campaignConfig);
        } catch (error) {
          console.error("Error parsing campaign_configuration:", error);
        }
      }

      setCampaignData(campaignConfig);
      setReqData({ ...data.campaign_outline[0], message_id: data?.id });
      setStep(3);
    }
  }, [data]);

  const handleProductSelection = (productId) => {
    const updatedProducts = data?.json_message.products.map((product) =>
      product.id === productId ? { ...product, selected: true } : product
    );
    data.json_message.products = updatedProducts;
    setSelectedProduct(productId);
  };

  const handleFunnelSelection = (funnelId) => {
    const updatedFunnels = data?.json_message.funnels.map((funnel) =>
      funnel.id === funnelId ? { ...funnel, selected: true } : funnel
    );
    data.json_message.funnels = updatedFunnels;
    setSelectedFunnel(funnelId);
    sendSelectionData();
  };

  const sendSelectionData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await API_GENERATE_OUTLINE_CAMPAIGN(
        token,
        data.json_message,
        data.meta_data.original_query,
        data.id
      );

      setReqData({ ...response?.campaign_outline[0], message_id: data?.id });

      let campaignConfig =
        response?.campaign_outline[0]?.campaign_configuration;

      // Convert to JSON if it's a string
      if (typeof campaignConfig === "string") {
        try {
          campaignConfig = JSON.parse(campaignConfig);
        } catch (error) {
          console.error("Error parsing campaign_configuration:", error);
        }
      }

      setCampaignData(campaignConfig);
    } catch (error) {
      console.error("Error sending data:", error);
    } finally {
      setLoading(false);
    }
  }, [token, data]);

  const launchCampaign = async () => {
    setLoading1(true);
    try {
      const response = await API_LAUNCH_CAMPAIGN(token, reqData);
      setReqData(response);
      setErrorMessage(
        response?.campaign_outline[0]?.campaign_creation_error_messages?.errors
      );
      setResponse(response?.campaign_outline[0]?.status);
    } catch (error) {
      console.error("Error launching campaign:", error);
    } finally {
      setLoading1(false);
    }
  };

  const toggleActiveCampionExpand = () => {
    setExpandedAdset((prev) => !prev);
    if (expandedAdset) {
      setExpandedAdsetIndex(0);
    }
  };

  const toggleAds = () => {
    setExpandedAdIndex((prev) => !prev);
  };

  const toggleActiveAdsetExpand = (id) => {
    setExpandedAd((prev) => (prev === id ? null : id));
  };

  const formatAudience = (audience) =>
    audience
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <div className="min-h-screen bg-gray-50 card-campaign fixed-width-container py-3">
      <div className="mb-6">
        <div className="card-header-campaign pb-3 px-3">
          <span className="badge">Step {step}</span>
          <div>
            {step === 1
              ? "Select Product / Service"
              : step === 3
              ? "Confirm Campaign Settings"
              : "Select Funnel / Website"}
          </div>
        </div>
        <div className="p-3 border-t">
          {step !== 3 && (
            <p style={{ fontWeight: 600 }}>
              {step === 1
                ? "Choose product / service you want to promote the campaign"
                : "Choose funnel / website you want to send people that click your ads"}
            </p>
          )}
          <div className="space-y-5">
            {step === 1 ? (
              data?.json_message?.products?.length > 0 &&
              data?.json_message?.products.map((item, index) => (
                <div className="p-3 card-campaign" key={index}>
                  <div className="product-section">
                    <div className="product-section">
                      <Package
                        className="icon"
                        style={{ width: "23px", height: "23px" }}
                      />
                      <p style={{ fontWeight: 600 }} className="mb-0">
                        {item?.product_name}
                      </p>
                    </div>
                    <div className="view-ads-container">
                      <button
                        onClick={() => handleProductSelection(item.id)}
                        className="view-ads-button"
                      >
                        Select
                      </button>
                    </div>
                  </div>
                  <div className="content">
                    <p className="mt-2">{item?.product_description}</p>
                  </div>
                </div>
              ))
            ) : step === 3 ? (
              loading ? (
                <div className="spinner-container p-3">
                  <div className="spinner"></div>
                  <p className="pt-1">Generating Campaign Settings...</p>
                </div>
              ) : (
                campaignData && (
                  <>
                    <div className="card">
                      <div
                        className="card-header justify-end  cursor-poiner"
                        onClick={toggleActiveCampionExpand}
                      >
                        <div>
                          <img
                            src={ICONS.active_campaign}
                            alt="Performance Icon"
                            className="icon"
                            style={{ width: "26px", height: "26px" }}
                          />
                          <span className="font-medium mb-0">
                            Confirm Campaign Summary
                          </span>
                        </div>
                        <span className="expand-icon">
                          {expandedAdset ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )}
                        </span>
                      </div>
                      {expandedAdset && (
                        <div className="flex-wrap gap-4 p-3 border-t">
                          <div className="metric-badge">
                            <span className="metric-badge-label">
                              Campaign Name:
                            </span>
                            <span className="metric-badge-value metric-badge-neutral">
                              {campaignData.name}
                            </span>
                          </div>
                          <div className="metric-badge">
                            <span className="metric-badge-label">
                              Objective:
                            </span>
                            <span className="metric-badge-value metric-badge-neutral">
                              {campaignData.objective}
                            </span>
                          </div>
                          <div className="metric-badge">
                            <span className="metric-badge-label">Product:</span>
                            <span className="metric-badge-value metric-badge-neutral">
                              {campaignData.product}
                            </span>
                          </div>
                          <div className="metric-badge">
                            <span className="metric-badge-label">Funnel:</span>
                            <span className="metric-badge-value metric-badge-neutral">
                              {campaignData.funnel}
                            </span>
                          </div>
                          <div className="metric-badge">
                            <span className="metric-badge-label">
                              Budget Type:
                            </span>
                            <span className="metric-badge-value metric-badge-neutral">
                              {campaignData.budget_type}
                            </span>
                          </div>
                          <div className="metric-badge">
                            <span className="metric-badge-label">Pixel:</span>
                            <span className="metric-badge-value metric-badge-neutral">
                              {campaignData.pixel}
                            </span>
                          </div>
                          <div className="metric-badge">
                            <span className="metric-badge-label">
                              Daily Budget:
                            </span>
                            <span className="metric-badge-value metric-badge-neutral">
                              {campaignData?.daily_budget
                                ? `${campaignData.daily_budget} ${campaignData.currency}`
                                : "-"}
                            </span>
                          </div>
                          <div className="metric-badge">
                            <span className="metric-badge-label">
                              Audience:
                            </span>
                            <span className="metric-badge-value metric-badge-neutral">
                              {campaignData?.audience
                                ? formatAudience(campaignData.audience)
                                : "-"}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    {campaignData?.adset_data?.length > 0 && (
                      <div className="card">
                        <div
                          className="card-header justify-end cursor-poiner"
                          onClick={toggleAds}
                        >
                          <div className="select-mess gap-2">
                            <HiOutlineComputerDesktop />
                            <span className="font-medium mb-0 break-words">
                              Adset{" "}
                              <span className="metric-badge-value metric-badge-neutral">
                                {campaignData?.adset_data?.length}
                              </span>
                            </span>
                          </div>
                          <span className="expand-icon">
                            {expandedAdIndex ? (
                              <ChevronUp size={16} />
                            ) : (
                              <ChevronDown size={16} />
                            )}
                          </span>
                        </div>
                        {expandedAdIndex &&
                          campaignData?.adset_data.map((item, index) => (
                            <div className="card-wrapper  border-t">
                              <div className="card w-full" key={index}>
                                <div
                                  className="card-header  cursor-poiner gap-1 flex-wrap select-mess"
                                  onClick={() => toggleActiveAdsetExpand(index)}
                                >
                                  <span className="expand-icon me-0">
                                    {expandedAd === index ? (
                                      <ChevronUp size={16} />
                                    ) : (
                                      <ChevronDown size={16} />
                                    )}
                                  </span>
                                  <FaClipboardList />
                                  <span className="font-medium mb-0 text-sm break-words">
                                    {item.name}
                                  </span>
                                </div>
                                {expandedAd === index && (
                                  <div className="campaign-container pt-3 px-3  border-t">
                                    <div className="flex flex-wrap gap-4">
                                      <div className="metric-badge">
                                        <span className="metric-badge-label">
                                          Daily Budget:
                                        </span>
                                        <span className="metric-badge-value metric-badge-neutral">
                                          {item?.daily_budget
                                            ? `${item.daily_budget} ${campaignData.currency}`
                                            : "-"}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex flex-wrap gap-4">
                                      <div className="metric-badge">
                                        <span className="metric-badge-label">
                                          Placement:
                                        </span>
                                        <span className="metric-badge-value metric-badge-neutral">
                                          {item?.publisher_platforms?.length > 0
                                            ? item.publisher_platforms.join(
                                                ", "
                                              )
                                            : "-"}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex flex-wrap gap-4">
                                      <div className="metric-badge">
                                        <span className="metric-badge-label">
                                          Age Range:
                                        </span>
                                        <span className="metric-badge-value metric-badge-neutral">
                                          {item?.targeting?.age_min} -{" "}
                                          {item?.targeting?.age_max}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex flex-wrap gap-4">
                                      <div className="metric-badge">
                                        <span className="metric-badge-label">
                                          Gender:
                                        </span>
                                        <span className="metric-badge-value metric-badge-neutral">
                                          {item?.targeting?.genders == 1
                                            ? "Male"
                                            : 2
                                            ? "Female"
                                            : "all"}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="ads-container">
                                      {Array.isArray(item.ad_data) &&
                                      item.ad_data.length > 0 ? (
                                        <Slider {...sliderSettings}>
                                          {item.ad_data.map((ad, index) => (
                                            <React.Fragment key={index}>
                                              <div className="my-2">
                                                {ad.image_url && (
                                                  <img
                                                    src={ad.image_url}
                                                    alt={ad.name}
                                                    style={{
                                                      width: "100%",
                                                      height: "auto",
                                                    }}
                                                    className="w-full object-cover"
                                                  />
                                                )}
                                                {ad.is_video && (
                                                 <div style={{ width: "500px", height: "500px" }}>
                                                 {/* <iframe
                                                   src={`https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2F61567499648168%2Fvideos%2F615646601195781%2F&show_text=false&t=0`}
                                                   width="100%"
                                                   height="100%"
                                                   style={{
                                                     border: "none",
                                                     overflow: "hidden",
                                                     borderRadius: "8px",
                                                   }}
                                                   scrolling="no"
                                                   frameBorder="0"
                                                   allowFullScreen={true}
                                                   title={`ad-video-${ad.video_id}`}
                                                 ></iframe>  */}
                                                  <iframe
                                                 src={`https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/watch/?v=${ad.video_id}`}
                                                 width={"100%"}
                                                 height={"100%"}
                                                 style={{
                                                   border: "none",
                                                   overflow: "hidden",
                                                   borderRadius: "8px",
                                                 }}
                                                 scrolling="no"
                                                 frameBorder="0"
                                                 allowFullScreen={true}
                                                 title={`ad-video-${ad.video_id}`}
                                               ></iframe>
                                               </div>
                                               
                                                )}
                                              </div>
                                              <div className="flex flex-wrap gap-1">
                                                <div className="metric-badge add-data">
                                                  <span
                                                    className="metric-badge-label"
                                                    style={{
                                                      marginRight: "0px",
                                                      fontWeight: 600,
                                                    }}
                                                  >
                                                    Ad:
                                                  </span>
                                                  <span className="text-base text-start">
                                                    {ad.name}
                                                  </span>
                                                </div>
                                              </div>
                                              <div className="flex flex-wrap gap-1">
                                                <div className="metric-badge add-data">
                                                  <span
                                                    className="metric-badge-label"
                                                    style={{
                                                      marginRight: "0px",
                                                      fontWeight: 600,
                                                    }}
                                                  >
                                                    Headline:
                                                  </span>
                                                  <span className="text-base text-start">
                                                    {ad.creative.name}
                                                  </span>
                                                </div>
                                              </div>
                                              <div>
                                                <div className="metric-badge">
                                                  <span
                                                    className="metric-badge-label"
                                                    style={{
                                                      marginRight: "0px",
                                                      fontWeight: 600,
                                                    }}
                                                  >
                                                    Body Text:
                                                  </span>
                                                </div>
                                                <span className="text-base text-start p-0">
                                                  {
                                                    ad.creative
                                                      .object_story_spec
                                                      .link_data.message
                                                  }
                                                </span>
                                              </div>
                                              <div className="flex flex-wrap gap-1">
                                                <div className="metric-badge add-data">
                                                  <span
                                                    className="metric-badge-label"
                                                    style={{
                                                      marginRight: "0px",
                                                      fontWeight: 600,
                                                    }}
                                                  >
                                                    Destination URL:
                                                  </span>
                                                  <a
                                                    className="text-base"
                                                    href={
                                                      ad.creative
                                                        .object_story_spec
                                                        .link_data.link
                                                    }
                                                  >
                                                    {
                                                      ad.creative
                                                        .object_story_spec
                                                        .link_data.link
                                                    }
                                                  </a>
                                                </div>
                                              </div>
                                            </React.Fragment>
                                          ))}
                                        </Slider>
                                      ) : (
                                        <p>No ads available.</p>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </>
                )
              )
            ) : (
              data?.json_message?.funnels?.length > 0 &&
              data?.json_message?.funnels.map((item, index) => (
                <div className="p-3 card-campaign" key={index}>
                  <div className="product-section">
                    <div className="product-section">
                      <TbChartFunnel
                        className="icon"
                        style={{ width: "23px", height: "23px" }}
                      />
                      <p style={{ fontWeight: 600 }} className="mb-0">
                        {item?.name}
                      </p>
                    </div>
                    <div className="view-ads-container">
                      <button
                        onClick={() => handleFunnelSelection(item.id)}
                        className="view-ads-button"
                      >
                        Select
                      </button>
                    </div>
                  </div>
                  <div className="content">
                    <p className="mt-2">{item?.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        {step === 3 && !loading && (
          <button
            onClick={launchCampaign}
            className="button accept-button-all-recommendations mx-3"
            disabled={
              loading1 ||
              response === "ACCEPTED" ||
              response === "ERROR" ||
              data?.campaign_outline[0]?.status === "ACCEPTED" ||
              data?.campaign_outline[0]?.status === "ERROR"
            }
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
            Launch Campaign
          </button>
        )}
      </div>
      {errorMessage?.length > 0 &&
        errorMessage.map((item, index) => (
          <div className="status-label error px-3" key={index}>
            <ShieldAlert />
            {item || "Unknown error."}
          </div>
        ))}
      {data?.campaign_outline[0]?.campaign_creation_error_messages?.errors
        ?.length > 0 &&
        data?.campaign_outline[0]?.campaign_creation_error_messages?.errors.map(
          (item, index) => (
            <div className="status-label error px-3" key={index}>
              <ShieldAlert />
              {item || "Unknown error."}
            </div>
          )
        )}
    </div>
  );
};

export default CampaignMessage;
