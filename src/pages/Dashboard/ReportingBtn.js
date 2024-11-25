// ReportingBtn.js
import React, { useState } from "react";
import { Button } from "antd"
import MyIcon from "../../components/Icon/MyIcon";
import "./styles/ReportingBtn.css";
import ReportingModal from "../../components/ReportingModal/ReportingModal";

const ReportingBtn = ({ availableMetrics, onSave, selectedMetrics }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleShowModal = () => setIsModalVisible(true);
  const handleCloseModal = () => setIsModalVisible(false);

  return (
    <>
    <button className="settings-btn" onClick={handleShowModal}>
        <span className="settings-btn-wrapper"><MyIcon type="reporting" /> Reporting</span>
      </button>

      <ReportingModal
        availableMetrics={availableMetrics}
        selectedMetrics={selectedMetrics}
        onSave={onSave}
        isModalVisible={isModalVisible}
        onCloseModal={handleCloseModal}
      />
    </>
  );
};

export default ReportingBtn;
