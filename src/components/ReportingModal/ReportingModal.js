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
    const metricsArray = Array.isArray(localSelectedMetrics) ? localSelectedMetrics : [];
    const updatedMetrics = metricsArray.includes(key)
      ? metricsArray.filter((item) => item !== key)
      : [...metricsArray, key];
    setLocalSelectedMetrics(updatedMetrics);
  };
  
  const handleRemoveMetric = (key) => {
    const metricsArray = Array.isArray(localSelectedMetrics) ? localSelectedMetrics : [];
    setLocalSelectedMetrics(metricsArray.filter((item) => item !== key));
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
    title={ false }
    centered
    visible={isModalVisible}
    onCancel={onCloseModal}
    closable={false}
    footer={false}
    width={650}
  >

                   <div className="custom-modal-header">
    <span className="modal-header"> <MyIcon type="reporting" style={{ marginRight: "5px" }} size="md"/> Reporting
 </span>
 <span ><MyIcon type={'close_icon'} onClick={onCloseModal} size="lg" className="close-icon"/></span>
    </div>
            
    <div className="reporting-modal">
      <Row >
        <Col xs={12} className="modal-scrollable" style={{padding:"20px 15px 20px 20px !important"}} >
          <p className="modal-title">Choose Metrics</p>
          {availableMetrics.map((item) => (
            <div key={item.key} className="checkbox-item">
              <span>{GET_METRIC_NAME_FROM_KEY(item.key)}</span>
              <div
                className={`custom-checkbox ${
                  localSelectedMetrics?.includes(item.key) ? "checked" : ""
                }`}
                onClick={() => handleCheckboxChange(item.key)}
              >
                <span className="checkmark">
                  {localSelectedMetrics?.includes(item.key) && <CloseOutlined />}
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
      </Row></div>
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
        </div>

    </Modal>
  );
};

export default ReportingModal;
