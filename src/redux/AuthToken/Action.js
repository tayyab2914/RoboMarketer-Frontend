// src/redux/actions.js

import {
  SET_AUTH_TOKEN,
  REMOVE_AUTH_TOKEN,
  SET_LOGGED_IN,
  SET_IS_ADMIN,
  SET_CURRENT_ACCOUNT,
  RERENDER_DASHBOARD,
  RERENDER_CHAT_PANEL,
  TEMPORARY_MESSAGE,
  SET_FACEBOOK_STATE,
  SET_IS_FB_SETUP,
  RERENDER_RIGHT_PANEL,
  OPEN_INTEGRATIONS_MODAL,
  IS_INTEGRATIONS_MODAL_CLOSED_BY_USER
} from "./Types";

export const setAuthToken = (token) => {
  return {
    type: SET_AUTH_TOKEN,
    payload: token,
  };
};

export const removeAuthToken = () => {
  return {
    type: REMOVE_AUTH_TOKEN,
  };
};

export const setLoggedIn = (isLoggedIn) => {
  return {
    type: SET_LOGGED_IN,
    payload: isLoggedIn,
  };
};

export const setIsAdmin = (isAdmin) => {
  return {
    type: SET_IS_ADMIN,
    payload: isAdmin,
  };
};
export const setCurrentAccount = (CurrentAccount) => {
  return {
    type: SET_CURRENT_ACCOUNT,
    payload: CurrentAccount,
  };
};

export const setRerenderDashboard = (rerender_dashboard) => {
  return {
    type: RERENDER_DASHBOARD,
    payload: rerender_dashboard,
  };
};
export const setRerenderChatPanel = (rerender_chat_panel) => {
  return {
    type: RERENDER_CHAT_PANEL,
    payload: rerender_chat_panel,
  };
};
export const setRerenderRightPanel = (rerender_right_panel) => {
  return {
    type: RERENDER_RIGHT_PANEL,
    payload: rerender_right_panel,
  };
};
export const setTemporaryMessage = (temp_message) => {
    // console.log('temp_message',temp_message)
  return {
    type: TEMPORARY_MESSAGE,
    payload: temp_message,
  };
};
export const setFacebookState = (facebook_state) => {
  return {
    type: SET_FACEBOOK_STATE,
    payload: facebook_state,
  };
};
export const setIsFacebookSetup = (is_facebook_setup) => {
  return {
    type: SET_IS_FB_SETUP,
    payload: is_facebook_setup,
  };
};
export const setOpenIntegrationsModal = (open_integrations_modal) => {
  return {
    type: OPEN_INTEGRATIONS_MODAL,
    payload: open_integrations_modal,
  };
};
export const setFacebookCode = (facebook_code) => {
  return {
    type: OPEN_INTEGRATIONS_MODAL,
    payload: facebook_code,
  };
};
export const setisIntegrationsModalClosedByUser = (is_integrations_modal_closed_by_user) => {
  return {
    type: IS_INTEGRATIONS_MODAL_CLOSED_BY_USER,
    payload: is_integrations_modal_closed_by_user,
  };
};
