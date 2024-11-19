import React, { useState } from 'react';
import MyButton from '../../components/Button/Button';
import MyIcon from '../../components/Icon/MyIcon';
import { Modal, Select, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './styles/AddPromptBtn.css';
import FileUploader from '../../components/FileUploader/FileUploader';
import { API_CREATE_PROMPT } from '../../apis/ChatApis';
import { useSelector } from 'react-redux';

const { TextArea } = Input;

const AddPromptBtn = () => {
    const [showSpinner, setShowSpinner] = useState(false);
  const { isLoggedIn, token, current_account } = useSelector((state) => state.authToken);
  const [isModalVisible, setIsModalVisible] = useState(false); // State to manage modal visibility
  const [category, setCategory] = useState(null); // State for selected category
  const [prompt_name, setprompt_name] = useState(''); // State for prompt name
  const [prompt, setPrompt] = useState(''); // State for prompt content
  const [file_group, setfile_group] = useState([]); // State for uploaded files

  // Function to show the modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Function to close the modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Handle file upload change
  const handleFileChange = (info) => {
    if (info?.file?.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info?.file?.status === 'error') {
    //   message.error(`${info.file.name} file upload failed.`);
    }
    setfile_group(info?.fileList); 
    console.log(info?.fileList)
  };

  const handleCreatePrompt = async () => {
    await API_CREATE_PROMPT(token,{category,prompt_name,prompt,file_group},setShowSpinner)

    setIsModalVisible(false);
  };

  return (
    <div>
      <MyButton variant="filled" text={<span className="add-prompt-span"><MyIcon type={'plus'} /> Add Prompt</span>} className="add-prompt-btn" onClick={showModal}  />

      <Modal title={<span className='create-prompt-header'><MyIcon type={'note'} style={{marginRight:"5px"}}/>Create Prompt</span>}  visible={isModalVisible}   onCancel={handleCancel}    footer={null}   width={600}   >
        <div>
          
        <div className="">
            <p className="modal-field-label-block">Select Category</p>
            <Select value={category} onChange={setCategory} style={{ width: '100%',height:"40px" }} placeholder="Select a category" >
              {}
              <Select.Option value="category1">Category 1</Select.Option>
              <Select.Option value="category2">Category 2</Select.Option>
              <Select.Option value="category3">Category 3</Select.Option>
            </Select>
          </div>

          
          <div className="">
            <p className="modal-field-label-block">Prompt Name</p>
            <Input value={prompt_name} onChange={(e) => setprompt_name(e.target.value)} placeholder="Enter prompt name" />
          </div>

          
          <div className="">
            <p className="modal-field-label-block">Prompt</p>
            <TextArea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={4} placeholder="Enter prompt details" />
          </div>

          
          <div className="">
            <p className="modal-field-label-block">Upload SOP Docs</p>
            <FileUploader
              fileList={file_group}
              onFileChange={handleFileChange}
              multiple={true}
              beforeUpload={() => true}  
              showRemoveIcon={true}
              
            />

          </div>

          <div className="modal-actions">
            <span className='btn-1'><Button onClick={handleCancel} className="cancel-btn"><MyIcon type={'cross_red'}/>Cancel</Button></span>
            <span className='btn-2'><Button type="primary" onClick={handleCreatePrompt} className="create-btn"><MyIcon type={'tick'}/>Create Prompt</Button></span>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddPromptBtn;
