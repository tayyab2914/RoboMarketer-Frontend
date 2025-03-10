import axios from "axios";
import { message } from "antd";

import {
  setAuthToken,
  setIsAdmin,
  setLoggedIn,
} from "../redux/AuthToken/Action";

import { DOMAIN_NAME } from "../utils/GlobalSettings";

export const API_CREATE_PROMPT = async (token, newPrompt, setShowSpinner) => {
  // setShowSpinner(true);
//   for (let [key, value] of newPrompt.entries()) {
//     console.log(`${key}: ${value}`);
//   }
  try {
    const response = await axios.post(
      `${DOMAIN_NAME}/chat/create_prompt/`,
      newPrompt,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    // message.success("Prompt created successfully!")
    return response.data;
  } catch (error) {
    console.log(error);
    message.error(error.response?.data?.message);
    return null;
  } finally {
    // setShowSpinner(false);
  }
};
export const API_CREATE_CATEGORY = async (
  token,
  newCategory,
  setShowSpinner
) => {

  try {
    const response = await axios.post(
      `${DOMAIN_NAME}/chat/create_category/`,
      { name: newCategory },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    // setShowSpinner(false);
  }
};
export const API_CREATE_CHANNEL = async (token, channelName) => {
  // setShowSpinner(true);
  try {
    const response = await axios.post(
      `${DOMAIN_NAME}/chat/create_channel/`,
      { name: channelName },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    message.error(error.response?.data?.message);
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

export const API_GET_CATEGORY_ORDERING = async (token, setShowSpinner) => {
  // setShowSpinner(true);
  try {
    const response = await axios.get(
      `${DOMAIN_NAME}/chat/get_category_ordering/`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response.data;
  } catch (error) {
    // message.error(
    //   error.response?.data?.message
    // );
    console.log(error);
  } finally {
    //   setShowSpinner(false);
  }
};
export const API_GET_API_MODEL = async (token, setShowSpinner) => {
  try {
    const response = await axios.get(`${DOMAIN_NAME}/chat/get_ai_model/`, {
      headers: {
        Authorization: token,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const API_DELETE_PROMPT = async (token, id, setShowSpinner) => {
  // setShowSpinner(true);
  try {
    const response = await axios.delete(
      `${DOMAIN_NAME}/chat/delete_prompt/${id}/`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    // message.success("Prompt Deleted Successfully")
    return response.data;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      "An error occurred while updating the user.";
    // message.error(errorMessage);
  } finally {
    // setShowSpinner(false);
  }
};

export const API_DELETE_CATEGORY = async (token, id, setShowSpinner) => {
  // setShowSpinner(true);
  try {
    const response = await axios.delete(
      `${DOMAIN_NAME}/chat/delete_category/${id}/`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    // message.success("Prompt Deleted Successfully")
    return response.data;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      "An error occurred while updating the user.";
    // message.error(errorMessage);
  } finally {
    // setShowSpinner(false);
  }
};
export const API_GET_RESPONSE = async (
  token,
  messageInput,
  file_group,
  setShowSpinner
) => {
  // setShowSpinner(true);
  try {
    const response = await axios.post(
      `${DOMAIN_NAME}/chat/get_response/`,
      file_group,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    message.error(error.response?.data?.details);
    return null;
  } finally {
    // setShowSpinner(false);
  }
};

// export const API_GET_HISTORY = async (
//   token,
//   account_id,
//   page = 1,
//   limit = 10,
//   setShowSpinner
// ) => {
//   if (setShowSpinner) setShowSpinner(true);
//   try {
//     const response = await axios.get(`${DOMAIN_NAME}/chat/get_history/`, {
//       headers: {
//         Authorization: `${token}`,
//       },
//       params: { account_id, page, limit },
//     });

//     return response.data.data;
//   } catch (error) {
//     message.error(
//       error.response?.data?.message ||
//         "An error occurred while fetching history."
//     );
//     return null;
//   } finally {
//     if (setShowSpinner) setShowSpinner(false);
//   }
// };

export const API_GET_HISTORY = async (token, account_id, selectedChannel) => {
  // setShowSpinner(true);
  try {
    const response = await axios.get(`${DOMAIN_NAME}/chat/get_history/`, {
      headers: {
        Authorization: `${token}`, // Ensure proper token format
      },
      params: { account_id, channel_id: selectedChannel?.id },
    });

    return response.data;
  } catch (error) {
    // message.error(
    //     error.response?.data?.message || "An error occurred while fetching history."
    // );
  } finally {
    // setShowSpinner(false);
  }
};
export const API_UPDATE_PROMPT = async (
  token,
  updatedPrompt,
  promptId,
  setShowSpinner
) => {
  setShowSpinner(true);
  try {
    const response = await axios.put(
      `${DOMAIN_NAME}/chat/update_prompt/${promptId}/`,
      updatedPrompt,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    message.error(error.response?.data?.message);
    return null;
  } finally {
    setShowSpinner(false);
  }
};

export const API_UPDATE_CATEGORY_ORDERING = async (
  token,
  updatedordering,
  setShowSpinner
) => {
  try {
    // Prepare the payload with the category_order array
    const payload = {
      category_order: updatedordering, // updatedordering should be the array ["Hello", "Helloyy", "Updated Name", "New Category", "Hello"]
    };

    const response = await axios.put(
      `${DOMAIN_NAME}/chat/update_category_ordering/`,
      payload,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    message.error(error.response?.data?.message);
    return null;
  } finally {
    // setShowSpinner(false);
  }
};

export const API_UPDATE_CATEGORY = async (
  token,
  updatedCategory,
  categoryID,
  setShowSpinner
) => {
  // setShowSpinner(true);

  try {
    const response = await axios.put(
      `${DOMAIN_NAME}/chat/update_category/${categoryID}/`,
      { name: updatedCategory },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    message.error(error.response?.data?.message);
    return null;
  } finally {
    // setShowSpinner(false);
  }
};

export const API_UPDATE_API_KEY = async (token, updated_key, aiModelType) => {
  // setShowSpinner(true);

  try {
    const response = await axios.put(
      `${DOMAIN_NAME}/chat/update_api_key/`,
      { api_key: updated_key, ai_model_name: aiModelType },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    message.success("API key updated successfully!");
    return response.data;
  } catch (error) {
    return null;
  } finally {
    // setShowSpinner(false);
  }
};
export const API_UPDATE_CHANNEL = async (token, id, name) => {
  try {
    const response = await axios.put(
      `${DOMAIN_NAME}/chat/update_channel/${id}/`,
      { name: name },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    // message.success("API key updated successfully!")
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    // setShowSpinner(false);
  }
};

export const API_GET_CHANNELS = async (token) => {
  // setShowSpinner(true);
  try {
    const response = await axios.get(`${DOMAIN_NAME}/chat/get_channels/`, {
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
export const API_DELETE_CHANNEL = async (token, id) => {
  // setShowSpinner(true);
  try {
    const response = await axios.delete(
      `${DOMAIN_NAME}/chat/delete_channel/${id}/`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    // message.success("Prompt Deleted Successfully")
    return response.data;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      "An error occurred while updating the user.";
    // message.error(errorMessage);
  } finally {
    // setShowSpinner(false);
  }
};

export const API_GENERATE_OUTLINE_CAMPAIGN = async (
  token,
  json_message,
  original_query,
  id
) => {
  // setShowSpinner(true);
  try {
    const response = await axios.post(
      `${DOMAIN_NAME}/chat/generate_outline_campaign/`,
      { json_message, original_query, id },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response.data;
  } catch (error) {
    message.error(error.response?.data?.message);

    return null;
  } finally {
    // setShowSpinner(false);
  }
};

export const API_LAUNCH_CAMPAIGN = async (token, data) => {
  // setShowSpinner(true);
  try {
    const response = await axios.post(
      `${DOMAIN_NAME}/chat/launch_campaign/`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response.data;
  } catch (error) {
    message.error(error.response?.data?.details);

    return null;
  } finally {
    // setShowSpinner(false);
  }
};

export const API_SUBMIT_FEEDBACK = async (token, data) => {
  // setShowSpinner(true);
  try {
    const response = await axios.post(
      `${DOMAIN_NAME}/chat/submit_feedback/`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    message.error(error?.response?.data?.message || error?.message);
    return null;
  } finally {
    // setShowSpinner(false);
  }
};

export const API_REDO_FEEDBACK = async (token, data) => {
  // setShowSpinner(true);
  try {
    const response = await axios.post(
      `${DOMAIN_NAME}/chat/redo_message/`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response.data;
  } catch (error) {
    message.error(error.response?.data?.details);
    return null;
  } finally {
    // setShowSpinner(false);
  }
};

export const API_APPLY_RECOMMENDATION = async (token, recommendationData) => {
  try {
    const response = await axios.post(
      `${DOMAIN_NAME}/chat/apply_recommendation/`,
      recommendationData,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error applying recommendation:",
      error.response?.data || error.message
    );
    return null;
  }
};
