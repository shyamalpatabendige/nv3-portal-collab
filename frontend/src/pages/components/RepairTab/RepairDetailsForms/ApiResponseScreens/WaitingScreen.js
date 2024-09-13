import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
const WaitingScreen = () => (
  <Result
    icon={<SmileOutlined />}
    title="Almost here, we are adding your details"
  />
);
export default WaitingScreen;