// src/redux/actions.js

import {
  SET_AUTH_TOKEN,
  REMOVE_AUTH_TOKEN,
  SET_LOGGED_IN,
  SET_IS_ADMIN,SET_CURRENT_ACCOUNT,
  RERENDER_DASHBOARD,
  RERENDER_CHAT_PANEL
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