import axios from "axios";
import { message } from "antd";

import { setAuthToken, setIsAdmin, setLoggedIn } from "../redux/AuthToken/Action";

import { DOMAIN_NAME } from "../utils/GlobalSettings";



export const API_CREATE_PROMPT = async ( token, newPrompt, setShowSpinner ) => {
    // setShowSpinner(true);

    try {
        const response = await axios.post(`${DOMAIN_NAME}/chat/create_prompt/`, 
            newPrompt
        , {
            headers: {
                Authorization: token,
            },
        });
        // message.success("Prompt created successfully!")
        return response.data;
    } catch (error) {
        message.error(
          error.response?.data?.message 
        );
        return null; 
    } finally {
        // setShowSpinner(false);
    }
};

export const API_GET_PROMPTS = async (token, setShowSpinner) => {
    // setShowSpinner(true);
    try {
      const response = await axios.get(`${DOMAIN_NAME}/chat/get_prompts/`, {
        headers: {
            Authorization: token, 
        },
      });
  
      return response.data;
    } catch (error) {
        // message.error(
        //   error.response?.data?.message 
        // );
    } finally {
    //   setShowSpinner(false);
    }
};


export const API_DELETE_PROMPT = async (token, id,  setShowSpinner) => {
    // setShowSpinner(true);
    try {
          const response = await axios.delete(`${DOMAIN_NAME}/chat/delete_prompt/${id}/`, {
            headers: {
                Authorization: token, 
            },
          });
      
        // message.success("Prompt Deleted Successfully")
        return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data?.message || "An error occurred while updating the user.";
        // message.error(errorMessage);  
    } finally {
        // setShowSpinner(false);
    }
};
export const API_GET_RESPONSE = async (token, messageInput, file_group, setShowSpinner) => {
    // setShowSpinner(true);

    try {
        const response = await axios.post(`${DOMAIN_NAME}/chat/get_response/`, file_group, {
            headers: {
                Authorization: token,
            },
        });

        return response.data;
    } catch (error) {
        // message.error(error.response?.data?.message);
        return null; 
    } finally {
        // setShowSpinner(false);
    }
};

export const API_GET_HISTORY = async (token, account_id, setShowSpinner) => {

    // setShowSpinner(true);
    try {
        const response = await axios.get(`${DOMAIN_NAME}/chat/get_history/`, {
            headers: {
                Authorization: `${token}`, // Ensure proper token format
            },
            params: { account_id },
        });

        return response.data;
    } catch (error) {
        message.error(
            error.response?.data?.message || "An error occurred while fetching history."
        );
    } finally {
        // setShowSpinner(false);
    }
};



export const API_UPDATE_PROMPT = async ( token, updatedPrompt,promptId, setShowSpinner ) => {
    
    setShowSpinner(true);
for (let [key, value] of updatedPrompt.entries()) {
    console.log(`${key}:`, value);
  }
    try {
        const response = await axios.put(`${DOMAIN_NAME}/chat/update_prompt/${promptId}/`, 
            updatedPrompt
        , {
            headers: {
                Authorization: token,
            },
        });
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


export const API_UPDATE_API_KEY = async ( token, updated_key, setShowSpinner ) => {
    
    // setShowSpinner(true);

    try {
        const response = await axios.put(`${DOMAIN_NAME}/chat/update_api_key/`, 
            {api_key:updated_key}
        , {
            headers: {
                Authorization: token,
            },
        });
        message.success("API key updated successfully!")
        return response.data;
    } catch (error) {
  
        return null; 
    } finally {
        // setShowSpinner(false);
    }
};
