import { Col, Row, Form, Input, Divider } from 'antd';
import React from 'react';
import MyButton from '../../components/Button/Button';
import MyIcon from '../../components/Icon/MyIcon';
import { IMAGES } from '../../data/ImageData';
import { PASSWORD_RULES_REQUIRED } from '../../utils/Rules';
import { API_SET_CLIENT_ACCOUNT_PASSWORD } from '../../apis/AgencyApis';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthToken, setLoggedIn } from '../../redux/AuthToken/Action';
const VerifyAccountMain = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
  const [form] = Form.useForm();
  const navigate = useNavigate()

  const onSubmit = async () => {
      const values = await form.validateFields();
      const { password, confirmPassword } = values;

      if (password !== confirmPassword) {
        form.setFields([{ name: 'confirmPassword', errors: ['Passwords do not match!']}]);
        return;
      }
      const response = await API_SET_CLIENT_ACCOUNT_PASSWORD(password,id)
      console.log(response)
      if(response)
      {
            dispatch(setAuthToken(response?.token))
            dispatch(setLoggedIn(true));
            navigate('/')
      }

  };

  return (
    <div className="generic-container">
      <Row gutter={24} align="middle" justify="center" style={{ height: '100vh' }}>
        <Col xs={24} md={12} className="form-container">
          <Form form={form} name="signupForm" className="signin-form" layout="vertical" onFinish={onSubmit} >
            <div className="account-logo-wrapper">
              <img src={IMAGES.logo_png} alt="Logo" className="account-logo" />
            </div>

            <Form.Item hasFeedback label="Password" name="password" rules={PASSWORD_RULES_REQUIRED} className="signin-form-item" >
              <Input.Password placeholder="Password" className="signin-input-field" prefix={<MyIcon type="signin_password" />} />
            </Form.Item>

            <Form.Item hasFeedback label="Confirm Password" name="confirmPassword" rules={[ { required: true, message: 'Please confirm your password!' }, ]} className="signin-form-item" >
              <Input.Password placeholder="Confirm Password" className="signin-input-field" prefix={<MyIcon type="signin_password" />} />
            </Form.Item>

            <Form.Item>
              <MyButton variant="filled" text="Set Password" htmlType="submit" w="100%" h="50px" m="0px" className="signin-submit-btn" />
            </Form.Item>

          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default VerifyAccountMain;
