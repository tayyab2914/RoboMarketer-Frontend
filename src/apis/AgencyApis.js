import axios from "axios";
import { message } from "antd";

import { setAuthToken, setIsAdmin, setLoggedIn } from "../redux/AuthToken/Action";

import { DOMAIN_NAME } from "../utils/GlobalSettings";



export const API_CREATE_ACCOUNT = async ( token, newAccount, setShowSpinner ) => {
    // setShowSpinner(true);

    try {
        const response = await axios.post(`${DOMAIN_NAME}/agency/create_account/`, 
            newAccount
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
        console.log(error)
        return null; 
    } finally {
        // setShowSpinner(false);
    }
};
export const API_SEND_INVITE_EMAIL = async ( token, id, setShowSpinner ) => {
    // setShowSpinner(true);

    try {
        const response = await axios.post(`${DOMAIN_NAME}/agency/send_invite_email/${id}/`,{},{
            headers: {
                Authorization: token,
            },
        });
        message.success("Email sent successfully!")
        return response.data;
    } catch (error) {
        message.error(
          error.response?.data?.message 
        );
        console.log(error)
        return null; 
    } finally {
        // setShowSpinner(false);
    }
};

export const API_GET_ACCOUNTS = async (token, setShowSpinner) => {
    // setShowSpinner(true);
    try {
      const response = await axios.get(`${DOMAIN_NAME}/agency/get_accounts/`, {
        headers: {
            Authorization: token, 
        },
      });
  
      console.log(response)
      return response.data;
    } catch (error) {
        // message.error(
        //   error.response?.data?.message 
        // );
    } finally {
    //   setShowSpinner(false);
    }
};


export const API_DELETE_ACCOUNT = async (token, id,  setShowSpinner) => {
    // setShowSpinner(true);
    try {
          const response = await axios.delete(`${DOMAIN_NAME}/agency/delete_account/${id}/`, {
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



export const API_UPDATE_ACCOUNT = async ( token, updatedAccount,id, setShowSpinner ) => {
    
    // setShowSpinner(true);
for (let [key, value] of updatedAccount.entries()) {
    console.log(`${key}:`, value);
  }
    try {
        const response = await axios.put(`${DOMAIN_NAME}/agency/update_account/${id}/`, 
            updatedAccount
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
        // setShowSpinner(false);
    }
};


export const API_SET_CLIENT_ACCOUNT_PASSWORD = async (  password,id, setShowSpinner ) => {
    // setShowSpinner(true);

    try {
        const response = await axios.post(`${DOMAIN_NAME}/agency/set_client_account_password/${id}/`,{password});
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

export const API_GET_WHITELABEL_DOMAIN = async (  token, setShowSpinner ) => {
    // setShowSpinner(true);

    try {
        const response = await axios.get(`${DOMAIN_NAME}/agency/get_whitelabel_domain/`, {
          headers: {
              Authorization: token, 
          },
        });
        console.log("HELLO G", response.data)
        return response.data;
      } catch (error) {
      //   message.error("Invalid or expired token");
      } finally {
      //   setShowSpinner(false);
      }
};


export const API_UPDATE_WHITELABEL_DOMAIN = async (token, whitelabel_domain, setShowSpinner) => {
    // setShowSpinner(true);
    try {
        const response = await axios.put(
            `${DOMAIN_NAME}/agency/update_whitelabel_domain/`,
            {
                whitelabel_domain
            },
            {
                headers: {
                    Authorization: `${token}`,
                },
            }
        );
         message.success("Whitelabel domain updated successfully!");
        return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data?.message || "An error occurred while updating the user.";
        message.error(errorMessage);  
    } finally {
        // setShowSpinner(false);
    }
};

export const API_TEST_RECORDS = async (token, setShowSpinner) => {
    // setShowSpinner(true);
    try {
        const response = await axios.get(
            `${DOMAIN_NAME}/agency/test_records/`,
            {
                headers: {
                    Authorization: `${token}`,
                },
            }
        );
         message.success(response.data.message);
        return response;
    } catch (error) {
        const errorMessage = error?.response?.data?.message || "An error occurred while updating the user.";
        message.error(errorMessage);  
    } finally {
        // setShowSpinner(false);
    }
};