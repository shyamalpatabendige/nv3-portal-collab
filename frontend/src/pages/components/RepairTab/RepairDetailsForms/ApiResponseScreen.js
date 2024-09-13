import React from "react";
import { Button, Result } from "antd";
import { getIsRepairApiSuccess, getIsRepairApiStatus } from "../../../../redux/repairSlice";
import { useSelector } from "react-redux";
import SuccessScreen from "./ApiResponseScreens/SuccessScreen";
import ErrorScreen from "./ApiResponseScreens/ErrorScreen";
import WaitingScreen from "./ApiResponseScreens/WaitingScreen";

const ApiResponseScreen = () => {

    const isRepairApiStatus = useSelector(getIsRepairApiStatus);

  return (
    isRepairApiStatus === "SUCCESS" ? <SuccessScreen /> : isRepairApiStatus === "FAIL" ? <ErrorScreen /> : <WaitingScreen />
  );
};
export default ApiResponseScreen;
