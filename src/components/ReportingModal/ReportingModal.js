// ReportingModal.js
import React, { useEffect, useState } from "react";
import { Modal, Row, Col, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import MyIcon from "../../components/Icon/MyIcon";
import "./styles/ReportingModal.css";

const ReportingModal = ({
  availableMetrics,
  selectedMetrics,
  onSave,
  isModalVisible,
  onCloseModal,
}) => {
  const [localSelectedMetrics, setLocalSelectedMetrics] = useState([]);

  // Sync local state with selectedMetrics prop on first render or when it updates
  useEffect(() => {
    setLocalSelectedMetrics(selectedMetrics);
  }, [selectedMetrics]);

  const handleCheckboxChange = (label) => {
    const updatedMetrics = localSelectedMetrics.includes(label)
      ? localSelectedMetrics.filter((item) => item !== label)
      : [...localSelectedMetrics, label];
    setLocalSelectedMetrics(updatedMetrics);
  };

  const handleRemoveMetric = (label) => {
    setLocalSelectedMetrics(localSelectedMetrics.filter((item) => item !== label));
  };

  const handleSave = () => {
    onSave(localSelectedMetrics);
    onCloseModal();
  };

  return (
    <Modal
      title={
        <span className="reporting-modal-header">
          <MyIcon type={"reporting"} style={{ marginRight: "5px" }} /> Reporting
        </span>
      }
      visible={isModalVisible}
      width={700}
      onCancel={onCloseModal}
      footer={[
        <div className="modal-actions">
          <span className="btn-2">
            <Button type="primary" onClick={handleSave} className="create-btn">
              <MyIcon type={"tick"} /> Save
            </Button>
          </span>
          <span className="btn-1">
            <Button onClick={onCloseModal} className="cancel-btn">
              <MyIcon type={"cross_red"} /> Cancel
            </Button>
          </span>
        </div>,
      ]}
    >
      <Row gutter={16}>
        <Col xs={12} className="modal-scrollable">
          <p className="modal-title">Choose Metrics</p>
          {availableMetrics.map((item) => (
            <div key={item.label} className="checkbox-item">
              <span>{item.label}</span>
              <div
                className={`custom-checkbox ${
                  localSelectedMetrics.includes(item.label) ? "checked" : ""
                }`}
                onClick={() => handleCheckboxChange(item.label)}
              >
                <span className="checkmark">
                  {localSelectedMetrics.includes(item.label) && (
                    <CloseOutlined />
                  )}
                </span>
              </div>
            </div>
          ))}
        </Col>
        <Col xs={12} className="modal-scrollable">
          <p className="modal-title">Selected Metrics</p>
          {localSelectedMetrics.map((metric) => (
            <div key={metric} className="selected-metric-main">
              <span className="selected-metric-elipsis">
                <MyIcon type={"elipsis"} />
              </span>
              <span className="selected-metric-name">{metric}</span>
              <span
                className="selected-metric-cross"
                onClick={() => handleRemoveMetric(metric)}
              >
                <MyIcon type={"cross"} size="xs" />
              </span>
            </div>
          ))}
        </Col>
      </Row>
    </Modal>
  );
};

export default ReportingModal;
