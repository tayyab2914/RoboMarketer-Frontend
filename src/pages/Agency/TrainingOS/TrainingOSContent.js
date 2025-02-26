import React, { useEffect, useRef } from "react";
import { TRAINING_OS_CONTENT } from "./TrainingOSData";

const TrainingOSContent = ({ module_id, lesson_id }) => {
  const module = TRAINING_OS_CONTENT.find((mod) => mod.module_id === module_id);
  const lesson = module?.lessons.find((less) => less.lesson_id === lesson_id);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Forces the video to reload when src changes
    }
  }, [lesson_id]);

  if (!module || !lesson) {
    return <p>No content found for Module {module_id}, Lesson {lesson_id}</p>;
  }

  return (
    <div id="trainingos-content">
      <h3 className="title">{lesson.title}</h3>
      <video ref={videoRef} width="100%" controls autoPlay className="video">
        <source src={lesson.videoLink} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p className="description">{lesson.description}</p>
    </div>
  );
};

export default TrainingOSContent;
