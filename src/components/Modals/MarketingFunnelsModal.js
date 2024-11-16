

import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./styles/ModalStyles.css";
import MyIcon from "../Icon/MyIcon";
import AddFunnelModal from "./AddFunnelModal";

const MarketingFunnelsModal = ({ isVisible, onClose }) => {
    const [Funnels, setFunnels] = useState([
        { name: "Funnel 1", description: "Description for Funnel 1", coreBenefits: "Benefit 1", features: "Feature 1", useCase: "Use case 1", uniqueSellingPoint: "USP 1", customerTestimonials: "Testimonial 1", pricing: "Price 1", targetAudienceDescription: "Audience 1", primaryInterests: "Interest 1", secondaryInterests: "Secondary Interest 1", paidPoints: "Paid Point 1", goals: "Goal 1", desiredBenefits: "Benefit 1", emotionalDrivers: "Driver 1", uniqueNeeds: "Need 1" },
        { name: "Funnel 2", description: "Description for Funnel 2", coreBenefits: "Benefit 2", features: "Feature 2", useCase: "Use case 2", uniqueSellingPoint: "USP 2", customerTestimonials: "Testimonial 2", pricing: "Price 2", targetAudienceDescription: "Audience 2", primaryInterests: "Interest 2", secondaryInterests: "Secondary Interest 2", paidPoints: "Paid Point 2", goals: "Goal 2", desiredBenefits: "Benefit 2", emotionalDrivers: "Driver 2", uniqueNeeds: "Need 2" },
      ]);
  const [isAddFunnelModalVisible, setIsAddFunnelModalVisible] = useState(false);

  const handleAddNewFunnel = (newFunnel) => {
    setFunnels([...Funnels, newFunnel]);
    console.log(newFunnel)
  };

  const openAddFunnelModal = () => {
    setIsAddFunnelModalVisible(true);
  };

  useEffect(() => {
    if (!isVisible) {
      setIsAddFunnelModalVisible(false);
    }
  }, [isVisible]);


  return (
    <>
      <Modal
        title={
          <span className="funnel-modal-header">
            <span>
              <MyIcon type="marketing_funnels" style={{ marginRight: "5px" }} />
              Funnels / Websites
            </span>
            <Button
              icon={<PlusOutlined />}
              className="add-funnel-btn"
              onClick={openAddFunnelModal}
            >
              Add New
            </Button>
          </span>
        }
        centered
        visible={isVisible}
        onCancel={onClose}
        footer={null}
      >
        <div className="funnel-list">
          {Funnels.map((Funnel) => (
            <div key={Funnel.name} className="funnel-item">
              <span className="funnel-name">{Funnel.name}</span>
              <span className="funnel-actions">
                <MyIcon type="edit_btn" size="lg" style={{ marginRight: "5px" }} />
                <MyIcon type="delete_btn" size="lg" />
              </span>
            </div>
          ))}
        </div>
      </Modal>

      {/* AddFunnelModal for adding new Funnels */}
      <AddFunnelModal
        isVisible={isAddFunnelModalVisible}
        onClose={() => setIsAddFunnelModalVisible(false)}  // Close AddFunnelModal
        onAddFunnel={handleAddNewFunnel}
      />
    </>
  );
};

export default MarketingFunnelsModal;
