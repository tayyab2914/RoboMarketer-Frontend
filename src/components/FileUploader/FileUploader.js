import React from "react";
import { Upload, Button, Tooltip, Badge } from "antd";
import { UploadOutlined, FilePdfOutlined, FileExcelOutlined, FileWordOutlined, FileOutlined, CloseCircleOutlined } from "@ant-design/icons";
import './styles/FileUploader.css';

const FileUploader = ({ fileList, onFileChange, multiple = false, beforeUpload = () => true, showRemoveIcon = true }) => {
  // Function to render file previews
  const renderFilePreview = (file) => {
    const fileType = file.type;

    if (fileType.startsWith("image/")) {
      return <img src={URL.createObjectURL(file.originFileObj)} alt={file.name} style={{ width: 30, height: 30, margin: "10px" }} />;
    }

    if (fileType === "application/pdf") {
      return (
        <Tooltip title="PDF">
          <FilePdfOutlined style={{ fontSize: 30, color: "#FF6F61", margin: "10px" }} />
        </Tooltip>
      );
    }

    if (fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      return (
        <Tooltip title="Excel">
          <FileExcelOutlined style={{ fontSize: 30, color: "#218838", margin: "10px" }} />
        </Tooltip>
      );
    }

    if (fileType === "application/msword" || fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      return (
        <Tooltip title="Word Document">
          <FileWordOutlined style={{ fontSize: 30, color: "#1E90FF", margin: "10px" }} />
        </Tooltip>
      );
    }

    // For other files, just show the file name
    return (
      <Tooltip title={file.name}>
        <FileOutlined style={{ fontSize: 30, margin: "10px" }} />
      </Tooltip>
    );
  };

  // Function to handle file removal
  const onRemove = (fileToRemove) => {
    const updatedFileList = fileList.filter(file => file.uid !== fileToRemove.uid);
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
      >
        <Button icon={<UploadOutlined />} className="upload-sop-btn">Upload File(s)</Button>
      </Upload>

      {/* Display uploaded images and files with delete badge */}
      <div className="uploaded-files-preview" style={{ display: "flex", alignItems: "center",marginTop:"10px" }}>
        {fileList && fileList?.map((file) => (
          <span key={file.uid} className="uploaded-file-item" style={{ position: 'relative' }}>
            <Badge
              count={<CloseCircleOutlined onClick={() => onRemove(file)} style={{ color: 'red', cursor: 'pointer' }} />}
              offset={[-5, 5]}
            >
              {renderFilePreview(file)}
            </Badge>
          </span>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;
