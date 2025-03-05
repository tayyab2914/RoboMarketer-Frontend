import React, { useState } from "react";

const VideoPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button id="playVideoTrigger" onClick={openPopup}>
        Play Video
      </button>

      {isOpen && (
        <div
          id="videoPopupOverlay"
          style={{
            display: "flex",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 9999,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "80%",
              maxWidth: "1200px",
            }}
          >
            <button
              id="closeVideoPopup"
              onClick={closePopup}
              style={{
                position: "absolute",
                top: "-40px",
                right: "-40px",
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                cursor: "pointer",
                zIndex: 10000,
              }}
            >
              X
            </button>
            <div
              style={{
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
                overflow: "hidden",
              }}
            >
              <iframe
                id="popupVideo"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                src="https://www.youtube.com/embed/FbT6Y1WPjbo?autoplay=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPopup;
