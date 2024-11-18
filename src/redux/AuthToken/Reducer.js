// src/redux/reducer.js

import { SET_AUTH_TOKEN,RERENDER_DASHBOARD, REMOVE_AUTH_TOKEN, SET_LOGGED_IN, SET_IS_ADMIN, SET_CURRENT_ACCOUNT } from "./Types";

const initialState = {
  token: null,
  isLoggedIn: false,
  isAdmin:false,
  current_account:{}
};

export default function authReducer(state = initialState, action) {
  if (action.type == SET_AUTH_TOKEN) {
    return {
      ...state,
      token: action.payload,
    };
  } else if (action.type == REMOVE_AUTH_TOKEN) {
    return {
      ...state,
      token: null,
    };
  } else if (action.type == SET_LOGGED_IN) {
    return {
      ...state,
      isLoggedIn: action.payload,
    };
  }  else if (action.type == SET_IS_ADMIN) {
    return {
      ...state,
      isAdmin: action.payload,
    };
  }  else if (action.type == SET_CURRENT_ACCOUNT) {
    return {
      ...state,
      current_account: action.payload,
    };
  }  else if (action.type == RERENDER_DASHBOARD) {
    return {
      ...state,
      rerender_dashboard: action.payload,
    };
  }else {
    return state;
  }
}
