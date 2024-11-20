import { Tooltip } from "antd";
import { UploadOutlined, FilePdfOutlined, FileExcelOutlined, FileWordOutlined, FileOutlined, CloseCircleOutlined } from "@ant-design/icons";

export const GET_PROMPT_CATEGORIES = [
        { header: "Campaign", key: "2", icon: 'note' },
        { header: "Analytics", key: "3", icon: 'analytics' },
        { header: "Questions", key: "4", icon: 'question' },
        { header: "Help", key: "5", icon: 'help' },
        { header: "Copywriting", key: "6", icon: 'copywriting' },
        { header: "Recommendations", key: "7", icon: 'recommendations' },
        { header: "CRO", key: "8", icon: 'cro' },
        { header: "Funnels", key: "9", icon: 'funnels' },
        { header: "Marketing", key: "10", icon: 'marketing' },
        { header: "Strategy", key: "11", icon: 'strategy' },
        { header: "Offer", key: "12", icon: 'offer' },
        { header: "Competitors", key: "13", icon: 'competitor' },
        { header: "Charts", key: "14", icon: 'chart' }
      ];


      export const FILTER_PROMPTS_BY_CATEGORY = (dataArray, category)=> {
        // console.log(dataArray)
        return dataArray?.filter(item => item.category === category);
      }

      export const RENDER_FILE_PREVIEW = (file) => {
        console.log(file)
        const fileType = file?.type;
    
        if (fileType.startsWith("image/")) {
          return <img src={URL.createObjectURL(file?.originFileObj)} alt={file?.name} style={{ width: 30, height: 30, margin: "10px" }} />;
        }
    
        if (fileType === "application/pdf") {
          return (
            <Tooltip title={file?.name}>
              <FilePdfOutlined style={{ fontSize: 30, color: "#FF6F61", margin: "10px" }} />
            </Tooltip>
          );
        }
    
        if (fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
          return (
            <Tooltip title={file?.name}>
              <FileExcelOutlined style={{ fontSize: 30, color: "#218838", margin: "10px" }} />
            </Tooltip>
          );
        }
    
        if (fileType === "application/msword" || fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
          return (
            <Tooltip title={file?.name}>
              <FileWordOutlined style={{ fontSize: 30, color: "#1E90FF", margin: "10px" }} />
            </Tooltip>
          );
        }
    
        // For other files, just show the file name
        return (
          <Tooltip title={file?.name}>
            <FileOutlined style={{ fontSize: 30, margin: "10px" }} />
          </Tooltip>
        );
      };
    