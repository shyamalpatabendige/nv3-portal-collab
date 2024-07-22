import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchSchoolCode } from "../../manageServices/services"
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { message } from 'antd';
import { enteredSchoolCodeFunc } from "../../../redux/generalSlice";

const MagazineSchoolCode = () => {

  const dispatch = useDispatch();

  const [schoolCode, setSchoolCode] = useState('');
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSchoolCode(schoolCode)
    .then(() => {
      dispatch(enteredSchoolCodeFunc(schoolCode));
      navigate("/products");
    })
    .catch(() => message.error('Please Enter The Valid School Code !!!')
  )
  }

  return (
    <div className="py-3 mt-2 w-full md:w-6/12">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Control type="text" placeholder="School Code" required={true} onChange={(e) => setSchoolCode(e.target.value)} />
        </Form.Group>

        <Form.Group>
     {/* {     <Link to="/products">} */}
            <Button
              variant="primary"
              type="submit"
              className="bg-blue-500 w-full"
            >
              Shop Now
            </Button>
        {/* {  </Link>} */}
        </Form.Group>
      </Form>
    </div>
  );
};

export default MagazineSchoolCode;
