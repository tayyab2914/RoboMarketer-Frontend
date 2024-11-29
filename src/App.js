import React, { useEffect } from 'react'
import ProjectRoutes from './utils/ProjectRoutes'
import './App.css'
import { API_UPDATE_INSIGHTS } from './apis/FacebookInsightsApis';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenIntegrationsModal } from './redux/AuthToken/Action';
import { API_TEST_TOKEN } from './apis/AuthApis';
import { useLogoutUser } from './hooks/useLogoutUser';
const App = () => {
    const dispatch = useDispatch()
    const { isLoggedIn, isAdmin, token, current_account,facebook_state,is_integrations_modal_closed_by_user} = useSelector((state) => state.authToken);


    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      const urlObj = new URL(window.location.href);
      const code = urlObj.searchParams.get("code");
      if(code && !current_account?.is_facebook_connected && facebook_state && !is_integrations_modal_closed_by_user)
      {
        dispatch(setOpenIntegrationsModal(true))
      }
    },[]);

    const updateInsights = async()=>{
        if(isLoggedIn)
            await API_UPDATE_INSIGHTS(token,null)
    }
 
    useEffect(()=>{
        updateInsights()
    },[])
  return (
    <div className='app'>
      <ProjectRoutes/>
    </div>
  )
}

export default App
