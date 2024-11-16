import React, { useEffect } from 'react'
import ProjectRoutes from './utils/ProjectRoutes'
import './App.css'
// import './PreWrittenCode/css/bootstrap.min.css'
// import './PreWrittenCode/css/normalize.css'
// import './PreWrittenCode/css/owl.carousel.min.css'
// import './PreWrittenCode/css/owl.theme.default.min.css'
// import './PreWrittenCode/css/responsive.css'
// import './PreWrittenCode/css/style.css'

import { Flex } from 'antd'

const App = () => {
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  return (
    <div className='app'>
      <ProjectRoutes/>
    </div>
  )
}

export default App
