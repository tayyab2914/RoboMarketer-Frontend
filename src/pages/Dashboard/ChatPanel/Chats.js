import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_GET_HISTORY } from "../../../apis/ChatApis";
import './styles/Chats.css'
const Chats = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const { isLoggedIn, token, current_account, rerender_chat_panel } = useSelector((state) => state.authToken);
  const [ChatData, setChatData] = useState([]);
  
  const get_history = async () => {
    const response = await API_GET_HISTORY( token, current_account?.id, setShowSpinner );
    setChatData(response);
    console.log(response)
  };
  useEffect(() => {
    get_history();

  }, [rerender_chat_panel]);

  return (
    <div>
      {ChatData?.map((item) => (<>
      
        <div style={{display:"flex",justifyContent:"right"}}>
            <span>
{item?.message}
            </span>
            

        </div>
        <div style={{display:"flex",justifyContent:"left"}}>
            <span>
            {item?.response}
            </span>
            

        </div>
        </>
      ))}
    </div>
  );
};

export default Chats;
