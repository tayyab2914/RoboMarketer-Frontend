import axios from "axios";
import { message } from "antd";

import {} from "../redux/AuthToken/Action";

import { DOMAIN_NAME } from "../utils/GlobalSettings";

export const API_GENERATE_AUTH_URL = async (token, setShowSpinner) => {
  setShowSpinner(true);
  try {
    const response = await axios.get(
      `${DOMAIN_NAME}/facebookinsights/generate_auth_url/`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    //   message.error(error.response?.data?.message || "Wrong credentials");
    return false;
  } finally {
    setShowSpinner(false);
  }
};
export const API_FETCH_TOKEN = async (token,  redirect_response, state, setShowSpinner) => {
    setShowSpinner(true);
    try {
      const response = await axios.get(
        `${DOMAIN_NAME}/facebookinsights/fetch_token/`,
        {
          headers: {
            Authorization: `${token}`,
          },
          params: {
            redirect_response,
            state,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
        console.log(error)
        message.error(error.response?.data?.message || "");
      return false;
    } finally {
      setShowSpinner(false);
    }
  };
  

  export const API_SELECT_ACCOUNT = async (token,  fb_account_id,  setShowSpinner) => {
    setShowSpinner(true);
    try {
      const response = await axios.post(
        `${DOMAIN_NAME}/facebookinsights/select_account/`,{
            fb_account_id
        },

        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
        error.response?.data?.message &&  message.error(error.response?.data?.message);
      return false;
    } finally {
      setShowSpinner(false);
    }
  };
  

  export const API_GET_REPORTING = async (token, setShowSpinner) => {
    setShowSpinner(true);
    try {
      const response = await axios.get(
        `${DOMAIN_NAME}/facebookinsights/get_reporting/`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      //   message.error(error.response?.data?.message || "Wrong credentials");
      return false;
    } finally {
      setShowSpinner(false);
    }
  };

  
export const API_UPDATE_REPORTING = async ( token, updated_metrics, setShowSpinner ) => {
    console.log('API_CREATE_FUNNEL', updated_metrics);
    
    setShowSpinner(true);

    try {
        const response = await axios.put(`${DOMAIN_NAME}/facebookinsights/update_reporting/`, 
            updated_metrics
        , {
            headers: {
                Authorization: token,
            },
        });
        console.log(response.data);
        message.success("updated_metrics updated successfully!")
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