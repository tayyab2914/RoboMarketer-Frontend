import React, { useEffect, useState } from "react";
import { Modal, Input, Button, Spin, message, Select } from "antd"; 
import { useDispatch, useSelector } from "react-redux";
import MyIcon from "../Icon/MyIcon";
import FileUploader from "../../components/FileUploader/FileUploader";
import { ICONS } from "../../data/IconData"; 
import { API_UPDATE_PROMPT } from "../../apis/ChatApis";
import { GET_PROMPT_CATEGORIES } from "../../utils/Methods";
import { setRerenderDashboard } from "../../redux/AuthToken/Action";
import SelectCategoryPopup from "../../pages/Dashboard/SelectCategoryPopup";

const { TextArea } = Input;

const EditPromptModal = ({ visible, onClose, prompt }) => {
    const { isLoggedIn, isAdmin, current_account,rerender_dashboard } = useSelector((state) => state.authToken);

console.log(current_account)
  const [loading, setLoading] = useState(false);
  const [promptData, setPromptData] = useState(prompt); // Initializing promptData state
  const [fileGroup, setFileGroup] = useState([]); // Handling file uploads
  const { token } = useSelector((state) => state.authToken);
  const [ShowSpinner, setShowSpinner] = useState(false);
  const dispatch = useDispatch()

  console.log('promptData',promptData)
  useEffect(() => {
    if (visible && prompt) {
      // When the modal is visible, initialize promptData with the prompt passed as prop
      setPromptData(prompt);
      // If there are any files associated with the prompt, you can also set them here
      setFileGroup(prompt.files || []); // Assuming prompt has a `files` field
    }
  }, [visible, prompt]); // Re-run when the prompt prop or visibility changes

  // Handle file upload
  const handleFileChange = (info) => {
    if (info?.file?.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    }
    setFileGroup(info?.fileList); // Update file group with uploaded files
  };

  // Handle form submission to update the prompt
  const handleSave = async () => {
    // Example of the prompt data to send, including updated prompt and files
    const updatedPrompt = {
      ...promptData,
      files: fileGroup, // Add file group to the prompt data
    };
    const formData = new FormData();
    formData.append("account", current_account?.id || "");
    formData.append("id", promptData?.id || "");
    formData.append("category", promptData?.category || "");
    formData.append("prompt_name", promptData?.prompt_name || "");
    formData.append("prompt", promptData?.prompt || "");

    promptData?.fileGroup?.forEach((file, index) => {
      formData.append(`file_group[${index}]`, file.originFileObj);
    });
    // Replace the following with an actual API call
    // await API_UPDATE_PROMPT(token, promptData.id, updatedPrompt);
    await API_UPDATE_PROMPT(token, formData,promptData?.id, setShowSpinner);
    dispatch(setRerenderDashboard(!rerender_dashboard))
    
    onClose(); // Close the modal after saving
  };

  const setCategoryHandler = (value)=>{

    console.log('SelectCategoryPopup',value?.category_id)
    setPromptData({ ...promptData, category: value?.category_id })
  }
  return (
    <Modal
      title={false}
      centered
      visible={visible}
      onCancel={onClose}
      closable={false}
      footer={null}
      width={500}
    >
      <div className="custom-modal-header">
        <span className="modal-header">
          <MyIcon type="note" style={{ marginRight: "5px" }} />
          Edit Prompt
        </span>
        <span>
          <MyIcon
            type={"close_icon"}
            onClick={onClose}
            size="lg"
            className="close-icon"
          />
        </span>
      </div>

      <div className="custom-modal-content modal-content">
        {loading ? (
          <Spin />
        ) : (
          <>
          <div className="">
            
          <SelectCategoryPopup setCategory={(value) => {setCategoryHandler(value)}} category={promptData?.category}/>
            {/* <p className="modal-field-label-block">Select Category</p>
            <Select 
              value={promptData?.category} 
              onChange={(value) => setPromptData({ ...promptData, category: value })} 
              style={{ width: '100%', height: "40px" }} 
              placeholder="Category" 
              className='add-prompt-btn-select'
              suffixIcon={<img src={ICONS.arrow_down} height={7}/>}
            >
              {GET_PROMPT_CATEGORIES?.map((cat) => <Select.Option key={cat.header} value={cat.header}>{cat.header}</Select.Option>)}
            </Select> */}
          </div>

            <div>
              <p className="modal-field-label-block">Prompt Name</p>
              <Input
                value={promptData?.prompt_name || ""}
                onChange={(e) => setPromptData({ ...promptData, prompt_name: e.target.value })}
                placeholder="Enter prompt name"
                className="add-prompt-btn-input"
              />
            </div>

            <div>
              <p className="modal-field-label-block">Prompt</p>
              <TextArea
                rows={5}
                value={promptData?.prompt || ""}
                onChange={(e) => setPromptData({ ...promptData, prompt: e.target.value })}
                placeholder="Enter prompt details"
                className="add-prompt-btn-text-area"
              />
            </div>

            {/* <div className="add-prompt-upload-sop-docs">
              <p className="modal-field-label-block">Upload SOP Docs</p>
              <FileUploader
                fileList={fileGroup}
                onFileChange={handleFileChange}
                multiple={true}
                beforeUpload={() => true}
                showRemoveIcon={true}
                accept={".docs, .docx"}
              />
            </div> */}
          </>
        )}
      </div>

      <div className="modal-actions">
        <span className="btn-2">
          <Button type="primary" onClick={handleSave} className="create-btn">
            <MyIcon type={"tick"} />
            Save Changes
          </Button>
        </span>
        <span className="btn-1">
          <Button onClick={onClose} className="cancel-btn">
            <MyIcon type={"cross_red"} />
            Cancel
          </Button>
        </span>
      </div>
    </Modal>
  );
};

export default EditPromptModal;
