import React, { useState } from 'react';
import MyButton from '../../components/Button/Button';
import MyIcon from '../../components/Icon/MyIcon';
import { Modal, Select, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './styles/AddPromptBtn.css';
import FileUploader from '../../components/FileUploader/FileUploader';
import { API_CREATE_PROMPT } from '../../apis/ChatApis';
import { useDispatch, useSelector } from 'react-redux';
import { GET_PROMPT_CATEGORIES } from '../../utils/Methods';
import { setRerenderDashboard } from '../../redux/AuthToken/Action';

const { TextArea } = Input;

const AddPromptBtn = () => {
  const dispatch = useDispatch();
  const [showSpinner, setShowSpinner] = useState(false);
  const { isLoggedIn, token, current_account, rerender_dashboard } = useSelector((state) => state.authToken);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [category, setCategory] = useState(null);
  const [prompt_name, setPromptName] = useState('');
  const [prompt, setPrompt] = useState('');
  const [file_group, setFileGroup] = useState([]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFileChange = (info) => {
    if (info?.file?.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    }
    setFileGroup(info?.fileList);
  };

  const handleCreatePrompt = async () => {
    // Validate required fields
    if (!category || !prompt_name || !prompt) {
      message.error("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("category", category || "");
    formData.append("prompt_name", prompt_name || "");
    formData.append("prompt", prompt || "");

    file_group?.forEach((file, index) => {
      formData.append(`file_group[${index}]`, file.originFileObj);
    });

    await API_CREATE_PROMPT(token, formData, setShowSpinner);
    setCategory('')
    setFileGroup([])
    setPrompt('')
    setPromptName('')
    setIsModalVisible(false);
    dispatch(setRerenderDashboard(!rerender_dashboard));
  };
  return (
    <div>
      <MyButton variant="filled" text={<span className="add-prompt-span"><MyIcon type={'plus'} /> Add Prompt</span>} className="add-prompt-btn" onClick={showModal} />

      <Modal 
        title={<span className='create-prompt-header'><MyIcon type={'note'} style={{ marginRight: "5px" }} />Create Prompt</span>}  
        visible={isModalVisible}   
        onCancel={handleCancel}    
        footer={null}   
        width={600}>
        
        <div>
          <div className="">
            <p className="modal-field-label-block">Select Category</p>
            <Select 
              value={category} 
              onChange={setCategory} 
              style={{ width: '100%', height: "40px" }} 
              placeholder="Select a category" 
            >
              {GET_PROMPT_CATEGORIES?.map((item) => <Select.Option key={item.header} value={item.header}>{item.header}</Select.Option>)}
            </Select>
          </div>

          <div className="">
            <p className="modal-field-label-block">Prompt Name</p>
            <Input 
              style={{ height: "40px" }} 
              value={prompt_name} 
              onChange={(e) => setPromptName(e.target.value)} 
              placeholder="Enter prompt name" 
            />
          </div>

          <div className="">
            <p className="modal-field-label-block">Prompt</p>
            <TextArea 
              value={prompt} 
              onChange={(e) => setPrompt(e.target.value)} 
              rows={4} 
              autoSize={false} 
              placeholder="Enter prompt details" 
            />
          </div>

          <div className="">
            <p className="modal-field-label-block">Upload SOP Docs</p>
            <FileUploader
              fileList={file_group}
              onFileChange={handleFileChange}
              multiple={true}
              beforeUpload={() => true}  
              showRemoveIcon={true}
              accept={".docs, .docx"}
            />
          </div>

          <div className="modal-actions">
            <span className='btn-1'><Button onClick={handleCancel} className="cancel-btn"><MyIcon type={'cross_red'} />Cancel</Button></span>
            <span className='btn-2'><Button type="primary" onClick={handleCreatePrompt} className="create-btn"><MyIcon type={'tick'} />Create Prompt</Button></span>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddPromptBtn;
