import React, { useEffect, useState } from "react";
import { TRAINING_OS_CONTENT } from "./TrainingOSData";

const TrainingOSContent = ({ module_id }) => {
  const module = TRAINING_OS_CONTENT.find((mod) => mod.module_id === module_id);
  const [videoSrc, setVideoSrc] = useState("");

  useEffect(() => {
    if (module) {
      // Set the video source when module changes
      setVideoSrc(module.videoLink);
    }
  }, [module_id, module]);  // Re-run when module_id changes

  if (!module) {
    return <p>No content found for Module {module_id}</p>;
  }

  return (
    <div id="trainingos-content">
      <h3 className="title">{module.module_name}</h3>
      <iframe
        src={videoSrc}  // Dynamically set the src
        title="Video Player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <div className="description">
        {module.description} {/* This will render the <ul> list */}
      </div>
    </div>
  );
};

export default TrainingOSContent;
