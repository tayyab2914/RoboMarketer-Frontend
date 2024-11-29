import { useDispatch } from "react-redux";
import { setAuthToken, setIsAdmin, setLoggedIn } from "../redux/AuthToken/Action";
import { useNavigate } from "react-router-dom";

export const useLogoutUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    console.log("LOGOUTUSERCALLED")
    dispatch(setLoggedIn(false));
    dispatch(setAuthToken(null));
    dispatch(setIsAdmin(false));
    navigate('/account');
  };

  
  return logoutUser;
};
