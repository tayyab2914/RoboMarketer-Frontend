// src/redux/reducer.js

import { SET_AUTH_TOKEN,RERENDER_DASHBOARD, REMOVE_AUTH_TOKEN, SET_LOGGED_IN, SET_IS_ADMIN, SET_CURRENT_ACCOUNT, RERENDER_CHAT_PANEL, TEMPORARY_MESSAGE, SET_FACEBOOK_STATE, SET_IS_FB_SETUP } from "./Types";

const initialState = {
  token: null,
  isLoggedIn: false,
  isAdmin:false,
  current_account:{},
  rerender_dashboard:false,
  rerender_chat_panel:true,
  temporary_message:null,
  facebook_state:null,
  is_facebook_setup:false
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
  }  else if (action.type == RERENDER_CHAT_PANEL) {
    return {
      ...state,
      rerender_chat_panel: action.payload,
    };
  }  else if (action.type == TEMPORARY_MESSAGE) {
    return {
      ...state,
      temporary_message: action.payload,
    };
  }  else if (action.type == SET_FACEBOOK_STATE) {
    return {
      ...state,
      facebook_state: action.payload,
    };
  }  else if (action.type == SET_IS_FB_SETUP) {
    return {
      ...state,
      is_facebook_setup: action.payload,
    };
  }else {
    return state;
  }
}
