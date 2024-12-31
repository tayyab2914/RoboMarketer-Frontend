// src/redux/reducer.js

import { SET_AUTH_TOKEN,RERENDER_DASHBOARD, REMOVE_AUTH_TOKEN, SET_LOGGED_IN, SET_IS_ADMIN, SET_CURRENT_ACCOUNT, RERENDER_CHAT_PANEL, TEMPORARY_MESSAGE, SET_FACEBOOK_STATE, SET_IS_FB_SETUP, RERENDER_RIGHT_PANEL, OPEN_INTEGRATIONS_MODAL, IS_INTEGRATIONS_MODAL_CLOSED_BY_USER, SET_FB_CODE } from "./Types";

const initialState = {
  token: null,
  isLoggedIn: false,
  isAdmin:false,
  current_account:{},
  rerender_dashboard:false,
  rerender_chat_panel:true,
  temporary_message:{},
  facebook_state:null,
  is_facebook_setup:false,
  open_integrations_modal:false,
  is_integrations_modal_closed_by_user:true,
  facebook_code:null
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
  }  else if (action.type == RERENDER_RIGHT_PANEL) {
    return {
      ...state,
      rerender_right_panel: action.payload,
    };
  }  else if (action.type == TEMPORARY_MESSAGE) {
    // console.log(action)
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
  }  else if (action.type == OPEN_INTEGRATIONS_MODAL) {
    return {
      ...state,
      open_integrations_modal: action.payload,
    };
  }  else if (action.type == SET_FB_CODE) {
    return {
      ...state,
      facebook_code: action.payload,
    };
  }  else if (action.type == IS_INTEGRATIONS_MODAL_CLOSED_BY_USER) {
    return {
      ...state,
      is_integrations_modal_closed_by_user: action.payload,
    };
  }else {
    return state;
  }
}
