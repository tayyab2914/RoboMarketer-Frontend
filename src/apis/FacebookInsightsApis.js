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
    return response.data;
  } catch (error) {
    //   message.error(error.response?.data?.message || "Wrong credentials");
    return false;
  } finally {
    setShowSpinner(false);
  }
};
export const API_FETCH_TOKEN = async (
  token,
  redirect_response,
  state,
  setShowSpinner
) => {
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
    return response.data;
  } catch (error) {
    message.error(error.response?.data?.message || "");
    return false;
  } finally {
    setShowSpinner(false);
  }
};

export const API_SELECT_ACCOUNT = async (
  token,
  fb_account_id,
  fb_account_name,
  setShowSpinner
) => {
    console.log(fb_account_id,fb_account_name)
  setShowSpinner(true);
  try {
    const response = await axios.post(
      `${DOMAIN_NAME}/facebookinsights/select_account/`,
      {
        fb_account_id,
        fb_account_name
      },

      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    error.response?.data?.message &&
      message.error(error.response?.data?.message);
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
    return response.data;
  } catch (error) {
    //   message.error(error.response?.data?.message || "Wrong credentials");
    return false;
  } finally {
    setShowSpinner(false);
  }
};

export const API_GET_ORDERING = async (token, setShowSpinner) => {
    setShowSpinner(true);
    try {
      const response = await axios.get(
        `${DOMAIN_NAME}/facebookinsights/get_ordering/`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
        message.error(error.response?.data?.message || "Wrong credentials");
      return false;
    } finally {
      setShowSpinner(false);
    }
  };
  
export const API_UPDATE_REPORTING = async (
  token,
  updated_metrics,
  setShowSpinner
) => {

  setShowSpinner(true);

  try {
    const response = await axios.put(
      `${DOMAIN_NAME}/facebookinsights/update_reporting/`,
      updated_metrics,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    // message.success("updated_metrics updated successfully!");
    return response.data;
  } catch (error) {
    message.error(error.response?.data?.message);
    return null;
  } finally {
    setShowSpinner(false);
  }
};
export const API_GET_INSIGHTS = async (
  token,
  date_start,
  date_stop,
  setShowSpinner
) => {
  setShowSpinner(true);

  try {
    const response = await axios.get(
      `${DOMAIN_NAME}/facebookinsights/get_insights_data/`,
      {
        params: { // Use the params option to pass query parameters
          date_start,
          date_stop
        },
        headers: {
          Authorization: `${token}`, // Prefix token with 'Bearer' if required
        },
      }
    );
    // message.success("updated_metrics updated successfully!");
    return response.data;
  } catch (error) {
    // message.error(error.response?.data?.message || "An error occurred");
    return null;
  } finally {
    setShowSpinner(false);
  }
};

export const API_GET_HISTORICAL_DATA = async (token, setShowSpinner) => {
  setShowSpinner(true);
  try {
    const response = await axios.post(
      `${DOMAIN_NAME}/facebookinsights/fetch_historical_data/`,
      {}, // Request body (empty object if no body is needed)
      {
        headers: {
          Authorization: token, // Correct Authorization header format
        },
      }
    );
    return response.data;
  } catch (error) {
    // Handle error properly
    if (error.response?.data?.message) {
      message.error(error.response?.data?.message); // Display error message from response
    } else {
      message.error("An error occurred while fetching historical data.");
    }
    return false;
  } finally {
    setShowSpinner(false);
  }
};

export const API_UPDATE_INSIGHTS = async (token, setShowSpinner) => {
    // setShowSpinner(true);
    try {
      const response = await axios.post(
        `${DOMAIN_NAME}/facebookinsights/update_insights_data/`,
        {}, // Request body (empty object if no body is needed)
        {
          headers: {
            Authorization: token, // Correct Authorization header format
          },
        }
      );
      return response.data;
    } catch (error) {
      // Handle error properly
      if (error.response?.data?.message) {
        message.error(error.response?.data?.message); // Display error message from response
      } else {
        // message.error("An error occurred while fetching historical data.");
      }
      return false;
    } finally {
    //   setShowSpinner(false);
    }
  };
  export const API_DISCONNECT_FACEBOOK = async (token, setShowSpinner) => {
    setShowSpinner(true);
    try {
      const response = await axios.post(
        `${DOMAIN_NAME}/facebookinsights/disconnect_facebook/`,
        {}, // no data is sent in the body here, so we can pass an empty object
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
    //   message.success("Account disconnected successfully")
      return response.data;
    } catch (error) {
      if (error.response?.data?.message) {
        message.error(error.response.data.message);
      }
      return false;
    } finally {
      setShowSpinner(false);
    }
  };
  

  export const API_UPDATE_ORDERING = async (
    token,
    metric_order,
    setShowSpinner
  ) => {
  console.log('metric_order',metric_order)
    setShowSpinner(true);
  
    try {
      const response = await axios.put(
        `${DOMAIN_NAME}/facebookinsights/update_ordering/`,
        { metric_order },
        {
          headers: {
            Authorization: token,
          },
        }
      );
    //   message.success("updated_metrics updated successfully!");
      return response.data;
    } catch (error) {
      message.error(error.response?.data?.message);
      return null;
    } finally {
      setShowSpinner(false);
    }
  };