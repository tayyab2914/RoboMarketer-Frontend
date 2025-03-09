import React, { useEffect } from "react";
import "./styles/InfoContainer.css";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsAndConditions from "./TermsAndConditions";
import DataProtectionPolicy from "./DataProtectionPolicy";
const InfoContainer = ({ CurrentMode }) => {
  useEffect(() => {
    console.log(CurrentMode);
  }, [CurrentMode]);
  return (
    <>
      <div id="info-container">
        <div className="info-wrapper">
          {CurrentMode == 1 && <PrivacyPolicy />}
          {CurrentMode == 2 && <TermsAndConditions />}
          {CurrentMode == 3 && <DataProtectionPolicy />}
        </div>
      </div>
    </>
  );
};

export default InfoContainer;
