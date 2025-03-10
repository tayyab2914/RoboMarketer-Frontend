import React, { useEffect, useState } from "react";
import "./styles/JsonMessage.css";
import { ChevronDown, ChevronUp, Package, ShieldAlert } from "lucide-react";
import { TbChartFunnel } from "react-icons/tb";
import { useSelector } from "react-redux";
import { API_GENERATE_OUTLINE_CAMPAIGN, API_LAUNCH_CAMPAIGN } from "../../../apis/ChatApis";
import { ICONS } from "../../../data/IconData";
import Slider from "react-slick";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { FaClipboardList } from "react-icons/fa";

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

  const jsonMessage = (typeof data.json_message === 'string') ? JSON.parse(data.json_message) : data.json_message; 
    
        
  const handleShowMore = () => {
    setCharLimit((prevLimit) => prevLimit + 400);
  };

  useEffect(() => {
    setStep(selectedFunnel ? 3 : selectedProduct ? 2 : 1);
  }, [selectedProduct, selectedFunnel]);

  const { token } = useSelector((state) => state.authToken);
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
    if (data.campaign_outline.length > 0) {
      setCampaignData(data.campaign_outline[0]?.campaign_configuration);
      setReqData({ ...data?.campaign_outline[0], message_id: data?.id });

      setStep(3);
    }
  }, []);

  const handleProductSelection = (productId) => {
    const updatedProducts = jsonMessage.products.map((product) =>
      product.id === productId ? { ...product, selected: true } : product
    );
    data.json_message.products = updatedProducts; // Updating data
    setSelectedProduct(productId);
  };

  // Function to update the selected funnel
  const handleFunnelSelection = (funnelId) => {
    const updatedFunnels = jsonMessage.funnels.map((funnel) =>
      funnel.id === funnelId ? { ...funnel, selected: true } : funnel
    );
    data.json_message.funnels = updatedFunnels; // Updating data
    setSelectedFunnel(funnelId);

    // API Call
    sendSelectionData();
  };

  // Determine the current step

  const sendSelectionData = async () => {
    setLoading(true);
    try {
      const response = await API_GENERATE_OUTLINE_CAMPAIGN( token, data.json_message, data.meta_data.original_query, data.id );
      setReqData({ ...response?.campaign_outline[0], message_id: data?.id });
      setCampaignData(response?.campaign_outline[0]?.campaign_configuration);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error sending data:", error);
    }
  };
  const launchCampaign = async () => {
    setLoading1(true);
    try {
      const response = await API_LAUNCH_CAMPAIGN(token, reqData);
      setReqData(response);
      setLoading1(false);
      setErrorMessage(
        response?.campaign_outline[0]?.campaign_creation_error_messages?.errors
      );
      setResponse(response?.campaign_outline[0]?.status);
    } catch (error) {
      setLoading1(false);
    }
  };

  const toggleActiveCampionExpand = () => {
    setExpandedAdset(!expandedAdset);
    if (expandedAdset) {
      setExpandedAdsetIndex(0);
    }
  };

  const toggleAds = () => {
    setExpandedAdIndex(!expandedAdIndex);
  };
  const toggleActiveAdsetExpand = (id) => {
    setExpandedAd((prev) => (prev === id ? null : id));
  };

  const formatAudience = (audience) => audience .split("_") .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) .join(" ");

  return (
    <div className="min-h-screen bg-gray-50 card-campaign fixed-width-container">
      <div className="mb-6">
        <div className="card-header-campaign p-3 border-b">
          <span className="badge">Step {step}</span>
          <div className="">
            {step === 1 ? "Select Product / Service" : step === 3 ? "Confirm Campaign Settings" : "Select Funnel / Website"}
          </div>
        </div>
        <div className="p-3">
          {step != 3 && (
            <p style={{ fontWeight: 600 }}>
              {step === 1 ? "Choose product / service you want to promote the campaign" : "Choose funnel / website you want to send people that click your ads"}
            </p>
          )}
          <div className="space-y-5">
            {step === 1 ? (
              jsonMessage?.products?.length > 0 &&
              jsonMessage?.products?.map((item, index) => (
                <div className="p-3 card-campaign" key={index}>
                  <div className="product-section">
                    <div className="product-section">
                      <Package className="icon" style={{ width: "23px", height: "23px" }}
                      />
                      <p style={{ fontWeight: 600 }} className="mb-0">
                        {item?.product_name}
                      </p>
                    </div>
                    <div className="view-ads-container p-0">
                      <button onClick={() => handleProductSelection(item.id)} className="view-ads-button" >
                        Select
                      </button>
                    </div>
                  </div>
                   {ad.creative.object_story_spec.link_data.message}
                                                  {ad.creative.object_story_spec.link_data.message && <p className="mt-2">
                                                    {ad.creative?.object_story_spec?.link_data?.message?.slice(0, charLimit)} 
                                                    {charLimit < ad.creative?.object_story_spec?.link_data?.message && "..."} 
                                                    
                                                     </p>}{charLimit < ad.creative?.object_story_spec?.link_data?.message && 
                        ( <button onClick={handleShowMore} className="show-more-btn"> Show More </button> )}
                  <div className="content m-0">
                  {item?.product_description && <p className="mt-2"> {item?.product_description?.slice(0, charLimit)} {charLimit < item?.product_description?.length && "..."} </p>}
                        {charLimit < item?.product_description?.length && ( <button onClick={handleShowMore} className="show-more-btn"> Show More </button> )}
                    </div>
                </div>
              ))
            ) : step == 3 ? (
              loading ? (
                <>
                  <div className="spinner-container p-3">
                    <div className="spinner"></div>
                    <p className="pt-1">Generating Campaign Settings...</p>
                  </div>
                </>
              ) : (
                campaignData && (
                  <>
                    <div className="card">
                      <div className="card-header justify-end  cursor-poiner" onClick={toggleActiveCampionExpand} >
                        <div>
                          <img src={ICONS.active_campaign} alt="Performance Icon" className="icon" style={{ width: "26px", height: "26px" }} />
                          <span className="font-medium mb-0">
                            Confirm Campaign Summary
                          </span>
                        </div>
                        <span className="expand-icon">
                          {expandedAdset ? ( <ChevronUp size={16} /> ) : ( <ChevronDown size={16} /> )}
                        </span>
                      </div>

                      {expandedAdset && (
                        <div className="flex-wrap gap-4 p-3 border-t">
                          {/* {Object.entries(campaignData)
                            .filter(([key]) => displayKeys.includes(key))
                            .map(([key, value]) => (
                              <div className="metric-badge" key={key}>
                                <span className="metric-badge-label">
                                  {key}:
                                </span>
                                <span className="text-base metric-badge-neutral">
                                  {typeof value === "object"
                                    ? JSON.stringify(value)
                                    : String(value)}
                                </span>
                              </div>
                            ))} */}

                          <div className="metric-badge">
                            <span className="metric-badge-label"> Campaign Name: </span>
                            <span className="metric-badge-value metric-badge-neutral"> {campaignData.name} </span>
                          </div>
                          <div className="metric-badge">
                            <span className="metric-badge-label"> Objective: </span>
                            <span className="metric-badge-value metric-badge-neutral"> {campaignData.objective} </span>
                          </div>
                          <div className="metric-badge">
                            <span className="metric-badge-label">Product:</span>
                            <span className="metric-badge-value metric-badge-neutral"> {campaignData.product} </span>
                          </div>
                          <div className="metric-badge">
                            <span className="metric-badge-label">Funnel:</span>
                            <span className="metric-badge-value metric-badge-neutral"> {campaignData.funnel} </span>
                          </div>
                          <div className="metric-badge">
                            <span className="metric-badge-label"> Budget Type: </span>
                            <span className="metric-badge-value metric-badge-neutral"> {campaignData.budget_type} </span>
                          </div>
                       
                          <div className="metric-badge">
                            <span className="metric-badge-label">Pixel:</span>
                            <span className="metric-badge-value metric-badge-neutral"> {campaignData.pixel} </span>
                          </div>
                          <div className="metric-badge">
                            <span className="metric-badge-label"> Daily Budget:</span>
                            <span className="metric-badge-value metric-badge-neutral"> {campaignData?.daily_budget ? `${campaignData.daily_budget} ${campaignData.currency}` : "-"} </span>
                          </div>

                          <div className="metric-badge">
                            <span className="metric-badge-label"> Audience: </span>
                            <span className="metric-badge-value metric-badge-neutral"> {campaignData?.audience ? formatAudience(campaignData.audience) : "-"} </span>
                          </div>
                          {/* <div className="metric-badge">
                            <span className="metric-badge-label">
                              Conversion Event:
                            </span>
                            <span className="metric-badge-value metric-badge-neutral">
                              {}
                            </span>
                          </div> */}
                             {/* <div className="metric-badge">
                            <span className="metric-badge-label">
                              Conversion Location:
                            </span>
                            <span className="metric-badge-value metric-badge-neutral">
                              {}
                            </span>
                          </div> */}
                          
                        </div>
                      )}
                    </div>
                    {campaignData?.adset_data?.length > 0 && (
                      <>
                        <div className="card">
                          <div
                            className="card-header justify-end cursor-poiner"
                            onClick={toggleAds}
                          >
                            <div className="select-mess gap-2">
                              {/* <img
                                src=""
                                alt="Performance Icon"
                                className="icon"
                                style={{ width: "26px", height: "26px" }}
                              /> */}
                              <HiOutlineComputerDesktop />
                              <span className="font-medium mb-0 break-words select-mess gap-2"> Adset{" "} 
                                <span className="metric-badge-value metric-badge-neutral"> {campaignData?.adset_data?.length} </span>
                              </span>
                            </div>
                            <span className="expand-icon">
                              {expandedAdIndex ? ( <ChevronUp size={16} /> ) : ( <ChevronDown size={16} />  )}
                            </span>
                          </div>
                          {expandedAdIndex &&
                            campaignData?.adset_data.map((item, index) => (
                             <div className="card-wrapper  border-t">
                                 <div className="card w-full" key={index}>
                                <div className="card-header  cursor-poiner gap-1 flex-wrap select-mess" onClick={() => { toggleActiveAdsetExpand(index); }} >
                                  <span className="expand-icon me-2">
                                    {expandedAd == index ? ( <ChevronUp size={16} /> ) : ( <ChevronDown size={16} /> )}
                                  </span>
                                  {/* <img
                                      src={ICONS.active_campaign}
                                      alt="Performance Icon"
                                      className="icon"
                                      style={{ width: "26px", height: "26px" }}
                                    /> */}
                                  <FaClipboardList />
                                  <span className="font-medium mb-0 text-sm break-words"> {item.name} </span>
                                </div>
                                {expandedAd == index && (
                                  <div className="campaign-container pt-3 px-2  border-t">
                                    <div className="flex flex-wrap gap-4">
                                      <div className="metric-badge">
                                        <span className="metric-badge-label">  Daily Budget: </span>
                                        <span className="metric-badge-value metric-badge-neutral">
                                          {/* {item?.daily_budget}/Day {campaignData.currency} || {"-"} */} {item?.daily_budget ? `${item.daily_budget} ${campaignData.currency}` : "-"} </span>
                                      </div>
                                    </div>
                                    <div className="flex flex-wrap gap-4">
                                      <div className="metric-badge">
                                        <span className="metric-badge-label"> Placement: </span>
                                        <span className="metric-badge-value metric-badge-neutral">
                                          {item?.publisher_platforms?.length > 0 ? item.publisher_platforms?.join( ", " ) : "-"}
                                        </span>
                                      </div>
                                    </div>
                                    {/* <div className="flex flex-wrap gap-4">
                                <div className="metric-badge">
                                  <span className="metric-badge-label">
                                    Location:
                                  </span>
                                  <span className="metric-badge-value metric-badge-neutral">
                                    {item?.daily_budget}
                                  </span>
                                </div>
                              </div> */}
                                    <div className="flex flex-wrap gap-4">
                                      <div className="metric-badge">
                                        <span className="metric-badge-label">
                                          Age Range:
                                        </span>
                                        <span className="metric-badge-value metric-badge-neutral"> 
                                            {item?.targeting?.age_min} -{" "} {item?.targeting?.age_max}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex flex-wrap gap-4">
                                      <div className="metric-badge">
                                        <span className="metric-badge-label"> Gender: </span>
                                        <span className="metric-badge-value metric-badge-neutral">
                                          {item?.targeting?.genders == 1 ? "Male" : 2 ? "Female" : "all"} </span>
                                      </div>
                                    </div>
                                    {/* <div className="flex flex-wrap gap-4">
                                <div className="metric-badge">
                                  <span className="metric-badge-label">
                                    Audience:
                                  </span>
                                  <span className="metric-badge-value metric-badge-neutral">
                                    {item?.daily_budget}
                                  </span>
                                </div>
                              </div> */}
                                    <div className="ads-container">
                                      {Array.isArray(item.ad_data) &&
                                      item.ad_data.length > 0 ? (
                                        <Slider {...sliderSettings}>
                                          {item.ad_data.map((ad, index) => (
                                            <>
                                              <div key={index} className="my-2">
                                                <img src={ad.image_url} alt={ad.name} style={{ width: "100%", height: "auto", }} className="w-full object-cover" />
                                              </div>
                                              <div className="flex flex-wrap gap-1">
                                                <div className="metric-badge add-data">
                                                  <span className="metric-badge-label" style={{ marginRight: "0px", fontWeight: 600, }} > Ad: </span>
                                                  <span className="text-base text-start"> {ad.name}</span>
                                                </div>
                                              </div>
                                              {/* <div className="flex flex-wrap gap-1">
                                                <div className="metric-badge add-data">
                                                  <span
                                                    className="metric-badge-label"
                                                    style={{
                                                      marginRight: "0px",
                                                      fontWeight: 600,
                                                    }}
                                                  >
                                                    Creative Name:
                                                  </span>
                                                  <span className="text-base text-start">
                                                    {ad.creative.name}
                                                  </span>
                                                </div>
                                              </div> */}
                                              <div className="flex flex-wrap gap-1">
                                                <div className="metric-badge add-data">
                                                  <span className="metric-badge-label" style={{ marginRight: "0px", fontWeight: 600, }} >  Headline: </span>
                                                  <span className="text-base text-start"> {ad.creative.name} </span>
                                                </div>
                                              </div>
                                              <div className="">
                                                <div className="metric-badge">
                                                  <span className="metric-badge-label" style={{ marginRight: "0px", fontWeight: 600, }} > Body Text: </span>
                                                </div>
                                                <span className="text-base text-start p-0"> { ad.creative.object_story_spec.link_data.message } </span>
                                              </div>
                                              {/* <button onClick={() => handleFunnelSelection(item.id) } className="view-ads-button" > Show More </button> */}
                                              <div className="flex flex-wrap gap-1">
                                                <div className="metric-badge add-data">
                                                  <span className="metric-badge-label" style={{ marginRight: "0px", fontWeight: 600, }} > Destination URL: </span>
                                                  <a className="text-base" href={ad.creative.object_story_spec.link_data.link }> 
                                                    {ad.creative.object_story_spec.link_data.link }
                                                  </a>
                                                </div>
                                              </div>
                                              {/* <button className="view-ads-button"> Show Preview </button> */}
                                            </>
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
                      </>
                    )}
                  </>
                )
              )
            ) : (
              jsonMessage?.funnels?.length > 0 && jsonMessage?.funnels?.map((item, index) => (
                <div className="p-3 card-campaign" key={index}>
                  <div className="product-section">
                    <div className="product-section">
                      <TbChartFunnel className="icon" style={{ width: "23px", height: "23px" }} />
                      <p style={{ fontWeight: 600 }} className="mb-0"> {item?.name}</p>
                    </div>
                    <div className="view-ads-container">
                      <button onClick={() => handleFunnelSelection(item.id)} className="view-ads-button" > Select </button>
                    </div>
                  </div>
                  <div className="content">
                        <p className="mt-2"> {item?.description?.slice(0, charLimit)} {charLimit < item?.description?.length && "..."} </p>
                        {charLimit < item?.description?.length && ( <button onClick={handleShowMore} className="show-more-btn"> Show More </button> )}
                    </div>
                  {/* <div className="mt-3">
                    <button onClick={() => {}} className="view-ads-button">
                      Show more
                    </button>
                  </div> */}
                </div>
              ))
            )}
          </div>
        </div>
        {step === 3 && !loading && (
          <div className="card-wrapper border-t">
            <button onClick={launchCampaign} className="button accept-button-all-recommendations" disabled={loading1 || response == "ACCEPTED" || response == "ERROR"} >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"> <path d="M20 6L9 17l-5-5" /> </svg>
                Launch Campaign
            </button>
          </div>
        )}
      </div>
      {/* {step !== 3 && (
        <div className="px-3 mb-0 select-mess">
          {step === 1 ? (
            <>
              <MdErrorOutline className="me-1" size={20} />
              Select product / service above or reply with your answer
            </>
          ) : (
            <>
              <MdErrorOutline className="me-1" size={20} />
              Select funnel / website above or reply with your answer
            </>
          )}
        </div>
      )} */}
      {errorMessage?.length > 0 && errorMessage?.map((item, index) => (
          <div className="status-label error px-3" key={index}>
            <ShieldAlert /> {item || "Unknown error."}
          </div>
        ))}
    </div>
  );
};

export default CampaignMessage;
