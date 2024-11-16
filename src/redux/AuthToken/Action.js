// src/redux/actions.js

import { SET_AUTH_TOKEN, REMOVE_AUTH_TOKEN, SET_LOGGED_IN } from "./Types";

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
