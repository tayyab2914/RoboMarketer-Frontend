// ReportingModal.js
import React, { useEffect, useState } from "react";
import { Modal, Row, Col, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import MyIcon from "../../components/Icon/MyIcon";
import "./styles/ReportingModal.css";
import { GET_METRIC_NAME_FROM_KEY } from "../../utils/Methods";

const ReportingModal = ({ availableMetrics, selectedMetrics, onSave, isModalVisible, onCloseModal }) => {
  const [localSelectedMetrics, setLocalSelectedMetrics] = useState([]);

  useEffect(() => {
    console.log(selectedMetrics)
    setLocalSelectedMetrics(selectedMetrics);
  }, [selectedMetrics]);

  const handleCheckboxChange = (key) => {
    const updatedMetrics = localSelectedMetrics.includes(key)? localSelectedMetrics.filter((item) => item !== key): [...localSelectedMetrics, key];
    setLocalSelectedMetrics(updatedMetrics);
  };

  const handleRemoveMetric = (key) => {
    setLocalSelectedMetrics(localSelectedMetrics.filter((item) => item !== key));
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
            <div key={item.key} className="checkbox-item">
              <span>{GET_METRIC_NAME_FROM_KEY(item.key)}</span>
              <div
                className={`custom-checkbox ${
                  localSelectedMetrics.includes(item.key) ? "checked" : ""
                }`}
                onClick={() => handleCheckboxChange(item.key)}
              >
                <span className="checkmark">
                  {localSelectedMetrics.includes(item.key) && (
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
              <span className="selected-metric-name">{GET_METRIC_NAME_FROM_KEY(metric)}</span>
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
