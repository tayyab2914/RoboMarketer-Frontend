import axios from "axios";
import { message } from "antd";

import { setAuthToken, setIsAdmin, setLoggedIn } from "../redux/AuthToken/Action";

import { DOMAIN_NAME } from "../utils/GlobalSettings";



export const API_CREATE_PROMPT = async ( token, newPrompt, setShowSpinner ) => {
    console.log('API_CREATE_PROMPT', newPrompt);
    
    setShowSpinner(true);

    try {
        const response = await axios.post(`${DOMAIN_NAME}/chat/create_prompt/`, 
            newPrompt
        , {
            headers: {
                Authorization: token,
            },
        });
        console.log(response.data);
        message.success("Prompt created successfully!")
        return response.data;
    } catch (error) {
        message.error(
          error.response?.data?.message 
        );
        return null; 
    } finally {
        setShowSpinner(false);
    }
};

export const API_GET_PROMPTS = async (token, setShowSpinner) => {
    setShowSpinner(true);
    try {
      const response = await axios.get(`${DOMAIN_NAME}/chat/get_prompts/`, {
        headers: {
            Authorization: token, 
        },
      });
  
      console.log(response)
      return response.data;
    } catch (error) {
        message.error(
          error.response?.data?.message 
        );
    } finally {
      setShowSpinner(false);
    }
};
