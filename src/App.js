import React, { useEffect } from 'react'
import ProjectRoutes from './utils/ProjectRoutes'
import './App.css'
import { API_UPDATE_INSIGHTS } from './apis/FacebookInsightsApis';
import { useSelector } from 'react-redux';
const App = () => {
    const { isLoggedIn, isAdmin, token, facebook_state } = useSelector((state) => state.authToken);
  
  
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const updateInsights = async()=>{
        const response = await API_UPDATE_INSIGHTS(token,null)
        console.log(response)
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
