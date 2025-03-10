import React, { useState } from "react";
import MetricsSection from "./MetricsSection";
import { ChevronDown, ChevronRight } from "lucide-react";
import "./styles/JsonMessage.css";

const AdView = ({ ad, adsetName, currency = "USD" }) => {
  const [charLimit, setCharLimit] = useState(400);
  const handleShowMore = () => {
    setCharLimit((prevLimit) => prevLimit + 400);
  };
  const handleVideoPlay = (e) => {
    // Prevent the default action and scroll behavior
    e.preventDefault();
    window.scrollTo(0, 0); // Scroll to the top of the page (optional)
  };
  return (
    <div className="">
      <div className="card">
        <div className="list-header border-b py-3">
          <h6 className="header-title">{adsetName}</h6>
        </div>
        <div className="card-container-header px-3 py-2">
          <h6 className="mb-0">{ad.ad_name}</h6>
        </div>

        <div className="mt-2">
          <MetricsSection data={ad} currency={currency} />

          {ad.ad_creative && (
            <div className="card-body px-3">
              <h6 className="card-body-title" style={{ color: "#4b5563" }}>
                Creative Details
              </h6>
              <div className="card-body-text ad-creative">
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {ad.ad_creative.image_url && (
                    <img
                      src={ad.ad_creative.image_url}
                      alt="Ad creative"
                      style={{ width: "70%", height: "auto" }}
                      className="rounded-lg w-full object-cover mt-2"
                    />
                  )}
                  {ad.ad_creative.video_id && (
                    <div style={{ width: "500px", height: "500px" }}>
                      <iframe
                        src={`https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/watch/?v=${ad.ad_creative.video_id}`}
                        width={"100%"}
                        height={"100%"}
                        style={{
                          border: "none",
                          borderRadius: "8px",
                        }}
                        scrolling="no"
                        frameBorder="0"
                        allowFullScreen={true}
                        title={`ad-video-${ad.ad_creative.video_id}`}
                      />
                    </div>
                  )}
                </div>
                <p>
                  <strong>Title:</strong> {ad.ad_creative.title}
                </p>
                <p>
                  <strong>Body:</strong>

                  {ad.ad_creative.body && (
                    <p className="mt-2 text-base" style={{overflow:"auto"}}>
                      {ad.ad_creative.body?.slice(0, charLimit)}
                      {charLimit < ad.ad_creative.body?.length && "..."}
                    </p>
                  )}
                  {charLimit < ad.ad_creative.body?.length && (
                    <button onClick={handleShowMore} className="show-more-btn">
                      Show More{" "}
                    </button>
                  )}
                </p>
                {ad.ad_creative?.object_story_spec?.link_data?.link && (
                  <p>
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
};

export default AdView;
