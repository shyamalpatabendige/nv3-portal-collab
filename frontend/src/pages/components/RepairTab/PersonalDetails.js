import React from "react";
import LoginRegisterForm from "./RepairDetailsForms/LoginRegisterForm";
import ParentStudentDetails from "./RepairDetailsForms/RepairInputDetailsForm";
import RegisterUser from "./RepairDetailsForms/RegisterUser";
import { useSelector } from "react-redux/es/exports";

const PersonalDetails = () => {
  const { activeForm } = useSelector((state) => state.pdForm);

  return (
    <div>
      {!sessionStorage.getItem("U1PGjSQGhPkzyJOz59JAW9bb9LwpMbde") ? (
        activeForm === "loginregisterform" ? (
          <LoginRegisterForm />
        ) : activeForm === "registerform" ? (
          <RegisterUser />
        ) : (
          <ParentStudentDetails />
        )
      ) : (
        <ParentStudentDetails />
      )}
    </div>
  );
};

export default PersonalDetails;
