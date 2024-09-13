import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchSchoolCode } from "../../manageServices/services";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { enteredSchoolCodeFunc } from "../../../redux/generalSlice";
import { setIsRepair } from "../../../redux/repairSlice";

const MagazineSchoolCode = () => {
  const dispatch = useDispatch();

  const [schoolCode, setSchoolCode] = useState("");
  const [handleDropDown, setHandleDropDown] = useState("Shop");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    return await fetchSchoolCode(schoolCode)
      .then((res) => {
        dispatch(enteredSchoolCodeFunc(schoolCode));
        if(handleDropDown === "Shop" && schoolCode === res?.data?.code){
          return navigate("/products");
        } else if (handleDropDown === "Repair" && res?.data?.isRepair){
          dispatch(setIsRepair(true));
          return navigate("/repair");
        } else {
          return message.error("Please Enter The Valid Code !!!")
        }
      })
      .catch(() => message.error("Please Enter The Valid Code !!!"));
  };

  return (
    <div className="py-3 mt-2 w-full md:w-6/12">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Group className="mb-3">
            <Form.Select onChange={(e) => setHandleDropDown(e.target.value)}>
              <option value={"Shop"}>Shop</option>
              <option value={"Repair"}>Repair</option>
            </Form.Select>
          </Form.Group>
          <Form.Control
            type="text"
            placeholder="School Code"
            required={true}
            onChange={(e) => setSchoolCode(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          {/* {     <Link to="/products">} */}
          <Button
            variant="primary"
            type="submit"
            className="bg-blue-500 w-full"
          >
            {handleDropDown === "Shop" ? handleDropDown + " Now" : handleDropDown + " Device"}
          </Button>
          {/* {  </Link>} */}
        </Form.Group>
      </Form>
    </div>
  );
};

export default MagazineSchoolCode;
