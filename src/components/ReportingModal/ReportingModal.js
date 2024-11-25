import React, { useEffect, useState } from "react";
import { Modal, Row, Col, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import MyIcon from "../../components/Icon/MyIcon";
import "./styles/ReportingModal.css";
import { GET_METRIC_NAME_FROM_KEY } from "../../utils/Methods";
import MyScrollableList from "../SortableList";

const ReportingModal = ({ availableMetrics, selectedMetrics, onSave, isModalVisible, onCloseModal }) => {
  const [localSelectedMetrics, setLocalSelectedMetrics] = useState([]);

  useEffect(() => {
    setLocalSelectedMetrics(selectedMetrics);
  }, [selectedMetrics]);

  const handleCheckboxChange = (key) => {
    const updatedMetrics = localSelectedMetrics.includes(key)
      ? localSelectedMetrics.filter((item) => item !== key)
      : [...localSelectedMetrics, key];
    setLocalSelectedMetrics(updatedMetrics);
  };

  const handleRemoveMetric = (key) => {
    setLocalSelectedMetrics(localSelectedMetrics.filter((item) => item !== key));
  };

  // Handle the end of the drag and update the order
  const onDragEnd = (result) => {
    const { destination, source } = result;

    // If dropped outside the list, do nothing
    if (!destination) return;

    // Reordering the list
    const reorderedMetrics = Array.from(localSelectedMetrics);
    const [removed] = reorderedMetrics.splice(source.index, 1);
    reorderedMetrics.splice(destination.index, 0, removed);

    // Update the localSelectedMetrics state with the new order
    setLocalSelectedMetrics(reorderedMetrics);
  };

  const handleSave = () => {
    console.log(localSelectedMetrics)
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
                  {localSelectedMetrics.includes(item.key) && <CloseOutlined />}
                </span>
              </div>
            </div>
          ))}
        </Col>
        <MyScrollableList
          localSelectedMetrics={localSelectedMetrics}
          handleRemoveMetric={handleRemoveMetric}
          onDragEnd={onDragEnd} // Pass the onDragEnd function here
        />
      </Row>
    </Modal>
  );
};

export default ReportingModal;
