import React, { useState, useEffect } from "react";
import { Modal, Button, Popconfirm } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./styles/ModalStyles.css";
import MyIcon from "../Icon/MyIcon";
import AddFunnelModal from "./AddFunnelModal";
import {
  API_DELETE_FUNNEL,
  API_LIST_FUNNELS,
} from "../../apis/MarketingToolsApis";
import { useSelector } from "react-redux";
import EditFunnelModal from "./EditFunnelModal";

const MarketingFunnelsModal = ({ isVisible, onClose,showFunnelModal}) => {
  const { token } = useSelector((state) => state.authToken);
  const [showSpinner, setShowSpinner] = useState(false);
  const [Funnels, setFunnels] = useState([]);
  const [isAddFunnelModalVisible, setIsAddFunnelModalVisible] = useState(showFunnelModal);
  const [isEditFunnelModalVisible, setIsEditFunnelModalVisible] =useState(false);
  const [selectedFunnelId, setSelectedFunnelId] = useState(null); // Add this state to store selected funnel ID

  const handleAddNewFunnel = (newFunnel) => {
    setFunnels([...Funnels, newFunnel]);
    console.log(newFunnel);
  };

  useEffect(()=>{
    setIsAddFunnelModalVisible(showFunnelModal)
  },[showFunnelModal])

  const openAddFunnelModal = () => {
    setIsAddFunnelModalVisible(true);
  };

  const openEditFunnelModal = (funnelId) => {
    setSelectedFunnelId(funnelId);
    setIsEditFunnelModalVisible(true);
  };

  useEffect(() => {
    if (!isVisible) {
      setIsAddFunnelModalVisible(false);
      setIsEditFunnelModalVisible(false);
    }
  }, [isVisible]);

  const ListFunnels = async () => {
    const response = await API_LIST_FUNNELS(token, setShowSpinner);
    setFunnels(response);
  };

  const onDeleteFunnel = async (id) => {
    const response = await API_DELETE_FUNNEL(token, id, setShowSpinner);
    ListFunnels(); // Refetch the list of funnels after deleting
  };

  const handleEditNewFunnel = () => {
    ListFunnels(); // Fetch the updated funnel list after editing
    setIsEditFunnelModalVisible(false); // Close the edit modal
    setSelectedFunnelId(null); // Reset the selected funnel ID
  };

  useEffect(() => {}, [selectedFunnelId]);

  useEffect(() => {
    ListFunnels(); // Fetch the funnels when the component loads
  }, []);

  return (
    <>
    
//! showProductModal means that it will only show if it is not in the message component else it will directly go to add prodyct
     {!showFunnelModal &&   <Modal
          title={ false }
          centered
          visible={isVisible}
          onCancel={onClose}
          closable={false}
          footer={false}
        >
                   <div className="custom-modal-header">
                   <span className="funnel-modal-header" style={{width:"100%"}}>
            <span>
            <MyIcon type="marketing_funnels" style={{ marginRight: "5px" }} />
              Funnels / Websites{" "}
            </span>{" "}
            <Button
              icon={<PlusOutlined />}
              className="add-funnel-btn"
              onClick={openAddFunnelModal}
            >
              Add New
            </Button>
          </span>
          <span ><MyIcon type={'close_icon'} onClick={onClose} size="lg" className="close-icon"/></span>
    </div>
            
    <div className="custom-modal-content modal-content">
  <div className="funnel-list">
    {Funnels.length > 0 ? (
      Funnels.map((Funnel) => (
        <div key={Funnel.id} className="funnel-item">
          <span className="funnel-name">{Funnel.name}</span>
          <span className="funnel-actions">
            <MyIcon
              type="edit_btn"
              size="lg"
              style={{ marginRight: "5px" }}
              onClick={() => openEditFunnelModal(Funnel.id)}
            />
            <Popconfirm
              title="Are you sure you want to delete this funnel?"
              onConfirm={() => onDeleteFunnel(Funnel.id)}
              okText="Yes"
              cancelText="No"
            >
              <MyIcon type="delete_btn" size="lg" />
            </Popconfirm>
          </span>
        </div>
      ))
    ) : (
      <div className="no-info-to-show">
        <MyIcon type="marketing_funnels" size="lg" />
        No Funnels to show
      </div>
    )}
  </div>
</div>
      </Modal>}
      <EditFunnelModal
        isVisible={isEditFunnelModalVisible}
        onClose={() => setIsEditFunnelModalVisible(false)}
        funnelId={selectedFunnelId}
        onEditFunnel={handleEditNewFunnel}
        ListFunnels={ListFunnels}
      />
      <AddFunnelModal
        isVisible={isAddFunnelModalVisible}
        onClose={onClose}
        onAddFunnel={handleAddNewFunnel}
        ListFunnels={ListFunnels}
      />
    </>
  );
};

export default MarketingFunnelsModal;
