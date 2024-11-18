import { Col, Row } from 'antd'
import React, { useState } from 'react'
import './styles/DashboardChatPanel.css'
import MessageBar from './MessageBar'
import AccountSetupComponent from './AccountSetupComponent'

const DashboardChatPanel = () => {
    const [isAccountSetup, setisAccountSetup] = useState(false);

  return (
    <Row className='dashboard-chat-panel-main'>
        <Col >
            {!isAccountSetup && <AccountSetupComponent/>}
        </Col>
        <Col >
            <MessageBar disabled={!isAccountSetup}/>
        </Col>
    </Row>
  )
}

export default DashboardChatPanel
