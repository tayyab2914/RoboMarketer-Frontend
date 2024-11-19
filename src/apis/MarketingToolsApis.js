import axios from "axios";
import { message } from "antd";

import { setAuthToken, setIsAdmin, setLoggedIn } from "../redux/AuthToken/Action";

import { DOMAIN_NAME } from "../utils/GlobalSettings";


export const API_CREATE_FUNNEL = async ( token, newFunnel, setShowSpinner ) => {
    console.log('API_CREATE_FUNNEL', newFunnel);
    
    setShowSpinner(true);

    try {
        const response = await axios.post(`${DOMAIN_NAME}/tools/create_funnel/`, 
            newFunnel
        , {
            headers: {
                Authorization: token,
            },
        });
        console.log(response.data);
        message.success("Funnel created successfully!")
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

export const API_LIST_FUNNELS = async (token, setShowSpinner) => {
    setShowSpinner(true);
    try {
      const response = await axios.get(`${DOMAIN_NAME}/tools/list_funnels/`, {
        headers: {
            Authorization: token, 
        },
      });
  
      console.log(response)
      return response.data;
    } catch (error) {
      message.error("Invalid or expired token");
    } finally {
      setShowSpinner(false);
    }
};

export const API_DELETE_FUNNEL = async (token, id,  setShowSpinner) => {
    setShowSpinner(true);
    try {
          const response = await axios.delete(`${DOMAIN_NAME}/tools/delete_funnel/${id}/`, {
            headers: {
                Authorization: token, 
            },
          });
      
        message.success("Funnel Deleted Successfully")
        return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data?.message || "An error occurred while updating the user.";
        message.error(errorMessage);  
    } finally {
        setShowSpinner(false);
    }
};
export const API_GET_FUNNEL = async (token,id, setShowSpinner) => {
    setShowSpinner(true);
    try {
      const response = await axios.get(`${DOMAIN_NAME}/tools/get_funnel/${id}/`, {
        headers: {
            Authorization: token, 
        },
      });
  
      console.log('API_GET_FUNNEL',response)
      return response.data;
    } catch (error) {
    //   message.error("Invalid or expired token");
    } finally {
      setShowSpinner(false);
    }
};

export const API_UPDATE_FUNNEL = async ( token, updatedFunnel,funnelId, setShowSpinner ) => {
    console.log('API_CREATE_FUNNEL', updatedFunnel);
    
    setShowSpinner(true);

    try {
        const response = await axios.put(`${DOMAIN_NAME}/tools/update_funnel/${funnelId}/`, 
            updatedFunnel
        , {
            headers: {
                Authorization: token,
            },
        });
        console.log(response.data);
        message.success("Funnel updated successfully!")
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

export const API_CREATE_PRODUCT = async ( token, newProduct, setShowSpinner ) => {
    console.log('API_CREATE_FUNNEL', newProduct);
    
    setShowSpinner(true);

    try {
        const response = await axios.post(`${DOMAIN_NAME}/tools/create_product/`, 
            newProduct
        , {
            headers: {
                Authorization: token,
            },
        });
        console.log(response.data);
        message.success("Product created successfully!")
        return response.data;
    } catch (error) {
        console.log(error)
        message.error(
          error.response?.data?.message 
        );
        return null; 
    } finally {
        setShowSpinner(false);
    }
};

export const API_LIST_PRODUCTS = async (token, setShowSpinner) => {
    setShowSpinner(true);
    try {
      const response = await axios.get(`${DOMAIN_NAME}/tools/list_products/`, {
        headers: {
            Authorization: token, 
        },
      });
  
      console.log(response)
      return response.data;
    } catch (error) {
      message.error("Invalid or expired token");
    } finally {
      setShowSpinner(false);
    }
};

export const API_DELETE_PRODUCT = async (token, id,  setShowSpinner) => {
    setShowSpinner(true);
    try {
          const response = await axios.delete(`${DOMAIN_NAME}/tools/delete_product/${id}/`, {
            headers: {
                Authorization: token, 
            },
          });
      
        message.success("Product Deleted Successfully")
        return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data?.message || "An error occurred while updating the user.";
        message.error(errorMessage);  
    } finally {
        setShowSpinner(false);
    }
};
export const API_GET_PRODUCT = async (token,id, setShowSpinner) => {
    setShowSpinner(true);
    try {
      const response = await axios.get(`${DOMAIN_NAME}/tools/get_product/${id}/`, {
        headers: {
            Authorization: token, 
        },
      });
  
      console.log('API_GET_FUNNEL',response)
      return response.data;
    } catch (error) {
    //   message.error("Invalid or expired token");
    } finally {
      setShowSpinner(false);
    }
};

export const API_UPDATE_PRODUCT = async ( token, updatedProduct,productId, setShowSpinner ) => {
    console.log('API_UPDATE_PRODUCT', updatedProduct);
    
    setShowSpinner(true);

    try {
        const response = await axios.put(`${DOMAIN_NAME}/tools/update_product/${productId}/`, 
            updatedProduct
        , {
            headers: {
                Authorization: token,
            },
        });
        console.log(response.data);
        message.success("Product updated successfully!")
        return response.data;
    } catch (error) {
        console.log(error)
        message.error(
          error.response?.data?.message 
        );
        return null; 
    } finally {
        setShowSpinner(false);
    }
};
export const API_UPDATE_ROBOMARKETER_IQ  = async ( token, formData, setShowSpinner ) => {
  // Log FormData key-value pairs
for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
}

    setShowSpinner(true);

    try {
        const response = await axios.put(`${DOMAIN_NAME}/tools/update_robomarketeriq/`, 
            formData
        , {
            headers: {
                Authorization: token,
            },
        });
        console.log(response.data);
        message.success("ROBOMARKETER updated successfully!")
        return response.data;
    } catch (error) {
        console.log(error)
        message.error(
          error.response?.data?.message 
        );
        return null; 
    } finally {
        setShowSpinner(false);
    }
};


export const API_GET_ROBOMARKETER_IQ = async (token, setShowSpinner) => {
    setShowSpinner(true);
    try {
      const response = await axios.get(`${DOMAIN_NAME}/tools/get_robomarketeriq/`, {
        headers: {
            Authorization: token, 
        },
      });
  
      console.log('API_GET_ROBOMARKETER_IQ',response)
      return response.data;
    } catch (error) {
        console.log('API_GET_ROBOMARKETER_IQ',error)
    //   message.error("Invalid or expired token");
    } finally {
      setShowSpinner(false);
    }
};