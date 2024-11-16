// src/redux/reducer.js

import { SET_AUTH_TOKEN, REMOVE_AUTH_TOKEN, SET_LOGGED_IN } from "./Types";

const initialState = {
  token: null,
  isLoggedIn: false,
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
  } else {
    return state;
  }
}
