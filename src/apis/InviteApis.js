import axios from "axios";
import { message } from "antd";
import { setAuthToken, setIsAdmin, setLoggedIn } from "../redux/AuthToken/Action";
import { DOMAIN_NAME } from "../utils/GlobalSettings";



export const API_SEND_CLIENT_INVITE = async ( token, client_email, setShowSpinner ) => {
    // setShowSpinner(true);
    console.log(client_email,"client_email")

    try {
        const response = await axios.post(`${DOMAIN_NAME}/invites/send_client_invite/`, 
            {client_email:client_email}
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

export const API_GET_INVITE_EMAILS = async (token, setShowSpinner) => {
    // setShowSpinner(true);
    try {
      const response = await axios.get(`${DOMAIN_NAME}/invites/get_invite_emails/`, {
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


export const API_DELETE_INVITED_USER= async (token, id,  setShowSpinner) => {
    // setShowSpinner(true);
    try {
          const response = await axios.delete(`${DOMAIN_NAME}/invites/delete_invited_user/${id}/`, {
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
