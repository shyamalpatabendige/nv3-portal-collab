import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsRepair, setRepairDetailsForm } from '../../../../../redux/repairSlice';
import { tabActiveKeyFunc } from '../../../../../redux/generalSlice';
const SuccessScreen = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSuccessScreen = () => {
    dispatch(dispatch(tabActiveKeyFunc('1')));
    dispatch(setRepairDetailsForm({}));
    dispatch(setIsRepair(false))
    navigate('/')
  }

  return (
  <Result
    status="success"
    title="Details Successfully Submitted"
    subTitle="Your details have been saved with us. We will contact you soon. Please allow a few moments for processing"
    extra={[
      <Button type="primary" key="home" onClick={handleSuccessScreen}>
        Go Home
      </Button>
    ]}
  />
)};
export default SuccessScreen;