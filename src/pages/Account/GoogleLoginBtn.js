// import GoogleButton from "react-google-button";
import { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import { API_GOOGLE_SIGN_IN } from "../../apis/AuthApis";
import { Spin } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { GOOGLE_AUTH_CLIENT_ID, GOOGLE_AUTH_SCOPE, GOOGLE_AUTH_URL, REDIRECT_URI } from "../../utils/GlobalSettings";
const onGoogleLoginSuccess = () => {
  const params = {
    response_type: "code",
    client_id: GOOGLE_AUTH_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    prompt: "select_account",
    access_type: "offline",
    scope:GOOGLE_AUTH_SCOPE,
  };

  const urlParams = new URLSearchParams(params).toString();
  window.location = `${GOOGLE_AUTH_URL}?${urlParams}`;
};

const GoogleLoginBtn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ShowSpinner, setShowSpinner] = useState(false);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    console.log(REDIRECT_URI)
    const code = new URLSearchParams(window.location.search).get("code");
    if (code) {
      fetchEmail();
    }
  }, []);

  const fetchEmail = async () => {
    const code = new URLSearchParams(window.location.search).get("code");
    API_GOOGLE_SIGN_IN(code, dispatch, navigate, setShowSpinner);
  };

  return (
    <>
      {ShowSpinner && <Spin fullscreen />}
      {/* <GoogleButton
        onClick={onGoogleLoginSuccess}
        label="Sign in with Google"
      /> */}
    </>
  );
};

export default GoogleLoginBtn;
