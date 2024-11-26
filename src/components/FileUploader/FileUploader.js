import React from "react";
import { Upload, Button, Tooltip, Badge } from "antd";
import { UploadOutlined, FilePdfOutlined, FileExcelOutlined, FileWordOutlined, FileOutlined, CloseCircleOutlined } from "@ant-design/icons";
import './styles/FileUploader.css';
import { RENDER_FILE_PREVIEW } from "../../utils/Methods";
import { ICONS } from "../../data/IconData";

const FileUploader = ({ fileList, onFileChange, multiple = false, beforeUpload = () => true, showRemoveIcon = true,accept, size=70, showName = true}) => {
  // Function to render file previews
  
  // Function to handle file removal
  const onRemove = (fileToRemove) => {
    const updatedFileList = fileList.filter(file => file?.uid !== fileToRemove.uid);
    onFileChange({ fileList: updatedFileList }); // Trigger the onFileChange with the updated list
  };

  return (
    <div className="file-uploader">
      <Upload
        multiple={multiple}
        fileList={fileList}
        itemRender={() => <></>}
        onChange={onFileChange}
        beforeUpload={beforeUpload}
        showUploadList={{ showRemoveIcon }}
        accept={accept}
        maxCount={3}
      >
        <Button icon={<img src={ICONS.upload} height={'14px'}/>} className="upload-sop-btn">Upload File</Button>
      </Upload>

      {/* Display uploaded images and files with delete badge */}
      <div className="uploaded-files-preview" style={{ display: "flex", alignItems: "center",marginTop:"20px" }}>
        {fileList && fileList?.map((file) => (
          <span key={file?.uid} className="uploaded-file-item" style={{ position: 'relative' }}>
            <Badge
              count={<CloseCircleOutlined onClick={() => onRemove(file)} style={{ color: 'red', cursor: 'pointer', fontSize:"20px" }} />}
              offset={[-5, 5]}
            >
              {RENDER_FILE_PREVIEW(file, size,showName)}
            </Badge>
          </span>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;
