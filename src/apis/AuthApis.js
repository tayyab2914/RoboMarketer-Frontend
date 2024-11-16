import axios from "axios";
import { message } from "antd";

import { setAuthToken, setIsAdmin, setLoggedIn } from "../redux/AuthToken/Action";

import { DOMAIN_NAME } from "../utils/GlobalSettings";

export const API_SIGN_UP = async (
  email,
  password,
  name,
  PhoneNumber,
  link_token,
  dispatch,
  setShowSpinner
) => {
  setShowSpinner(true);
  try {
    const response = await axios.post(`${DOMAIN_NAME}/authentication/signup/`, {
      email: email,
      password: password,
      name: name,
      number:PhoneNumber,
      link_token:link_token,
    });

    dispatch(setAuthToken(response.data.token));
    dispatch(setLoggedIn(true));

    message.success("User signed up successfully");
    return response.data;
  } catch (error) {
    message.error(error.response?.data?.message || "Signup failed");
  } finally {
    setShowSpinner(false);
  }
};

export const API_SIGN_IN = async (
  email,
  password,
  dispatch,
  navigate,
  setShowSpinner
) => {
  setShowSpinner(true);
  console.log('API_SIGN_IN',email,password)
  try {
    const response = await axios.post(`${DOMAIN_NAME}/authentication/signin/`, {
      email: email,
      password: password,
    });

    // Handle login token
    console.log('response.data.token',response.data)
    dispatch(setAuthToken(response.data.token));
    dispatch(setLoggedIn(true));
    dispatch(setIsAdmin(response.data.admin))
    navigate('/');
    message.success("Signed in successfully");
    return response.data;
  } catch (error) {
    message.error(error.response?.data?.message || "Wrong credentials");
    return false
  } finally {
    setShowSpinner(false);
  }
};
export const API_DOES_LINK_EXIST = async (
    link_token,
    setShowSpinner
  ) => {
    setShowSpinner(true);
    console.log("API_DOES_LINK_EXIST", link_token);
    
    try {
      const response = await axios.get(`${DOMAIN_NAME}/authentication/is_link_exist/`, {
        params: { link_token: link_token },
      });
      return response.data;
    } catch (error) {
    //   message.error(error.response?.data?.message || "Wrong credentials");
      return false;
    } finally {
      setShowSpinner(false);
    }
  };

export const API_SEND_VERIFICATION_EMAIL = async (
  email,
  forgotPassword = false,
  setShowSpinner,
) => {
  setShowSpinner(true);
  try {
    const response = await axios.post(
      `${DOMAIN_NAME}/authentication/send_verification_email/`,
      {
        email: email,
        forgot_password: forgotPassword ? "true" : "false",
      }
    );

    message.success("Verification email sent");
    return response.data.code_token;
  } catch (error) {
    message.error(
      error.response?.data?.message || "Failed to send verification email"
    );
    return false
  } finally {
    setShowSpinner(false);
  }
};

export const API_AUTHENTICATE_CODE = async (
  verificationCode,
  codeToken,
  setShowSpinner
) => {
  setShowSpinner(true);
  try {
    const response = await axios.post(
      `${DOMAIN_NAME}/authentication/authenticate_verification_code/`,
      {
        verification_code: verificationCode,
        code_token: codeToken,
      }
    );

    message.success("Verification code is correct");
    return response.data;
  } catch (error) {
    message.error(error.response?.data?.message || "Wrong verification code");
  } finally {
    setShowSpinner(false);
  }
};

export const API_SET_NEW_PASSWORD = async (
  email,
  newPassword,
  verificationCode,
  codeToken,
  setShowSpinner,
  setShowForgotPassword
) => {
  setShowSpinner(true);

  try {
    const response = await axios.post(`${DOMAIN_NAME}/authentication/set_new_password/`, {
      email: email,
      new_password: newPassword,
      verification_code: verificationCode,
      code_token: codeToken,
    });

    message.success("Password reset successful");
    setShowForgotPassword(false)
    return response.data;
  } catch (error) {
    message.error(error.response?.data?.message || "Failed to reset password");
  } finally {
    setShowSpinner(false);
  }
};

export const API_GOOGLE_SIGN_IN = async (authCode,dispatch,navigate, setShowSpinner,redirect_uri) => {
  setShowSpinner(true);
  try {
    const response = await axios.get(`${DOMAIN_NAME}/authentication/google_signin/`, {
      params: {
        code: authCode,
        redirect_uri:redirect_uri
      },
    });

    dispatch(setAuthToken(response.data.token));
    dispatch(setLoggedIn(true));
    navigate('/');
    message.success("Google sign-in successful");
    return response.data;
  } catch (error) {
    message.error("Google sign-in failed");
  } finally {
    setShowSpinner(false);
  }
};

export const API_TEST_TOKEN = async (token, setShowSpinner) => {
  setShowSpinner(true);
  try {
    const response = await axios.get(`${DOMAIN_NAME}/authentication/test_token/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    message.success("Token is valid");
    return response.data;
  } catch (error) {
    message.error("Invalid or expired token");
  } finally {
    setShowSpinner(false);
  }
};


export const API_GENERATE_LINK = async (token, setShowSpinner) => {
    setShowSpinner(true);
    try {
        const response = await axios.post(`${DOMAIN_NAME}/authentication/generate_link/`, {}, {
            headers: {
                Authorization: token, 
            },
        });

        const { link_token } = response.data; 
        return link_token
    } catch (error) {
        message.error('Failed to generate signup link.');
    } finally {
      setShowSpinner(false);
    }
  };

  
export const API_GET_USERS_LIST = async (token, setShowSpinner) => {
    setShowSpinner(true);
    try {
      const response = await axios.get(`${DOMAIN_NAME}/authentication/get_users_list/`, {
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
  
  

  export const API_UPDATE_USER = async (token, id, updatedUser, setShowSpinner) => {
    setShowSpinner(true);

    try {
        const response = await axios.put(`${DOMAIN_NAME}/authentication/edit_user/${id}/`, {
            username: updatedUser.username,
            email: updatedUser.email,
            phone_number: updatedUser.phone_number,
            total_accounts: updatedUser.total_accounts,
            first_name: updatedUser.first_name,
            last_name: updatedUser.last_name,
        }, {
            headers: {
                Authorization: `${token}`, 
            },
        });
        message.success("User Updated Successfully")
        return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data?.message || "An error occurred while updating the user.";
        message.error(errorMessage);  
    } finally {
        setShowSpinner(false);
    }
};

export const API_DELETE_USER = async (token, id,  setShowSpinner) => {
    setShowSpinner(true);
    try {
          const response = await axios.delete(`${DOMAIN_NAME}/authentication/delete_user/${id}/`, {
            headers: {
                Authorization: token, 
            },
          });
      
        message.success("User Deleted Successfully")
        return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data?.message || "An error occurred while updating the user.";
        message.error(errorMessage);  
    } finally {
        setShowSpinner(false);
    }
};
