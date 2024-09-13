import React from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Result, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsRepair, setRepairDetailsForm } from '../../../../../redux/repairSlice';
import { tabActiveKeyFunc } from '../../../../../redux/generalSlice';

const ErrorScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleErrorScreen = () => {
    dispatch(dispatch(tabActiveKeyFunc('1')));
    dispatch(setRepairDetailsForm({}));
    dispatch(setIsRepair(false))
    navigate('/')
  }

  return (
    <Result
      status="error"
      title="Submission Failed"
      subTitle="Please check and modify the following information before resubmitting."
      extra={[
        <Button type="primary" key="console" onClick={handleErrorScreen}>
          Go Home
        </Button>,
      ]}
    ></Result>
  );
};
export default ErrorScreen;
