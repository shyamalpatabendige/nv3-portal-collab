import {
    Form,
    Input,
  } from "antd";
import { useState } from "react";
import { novoLogin } from "../../../manageServices/services";
import { activeFormFunc } from "../../../../redux/personalDetailsFormSlice";
import { useDispatch } from "react-redux";
  

const LoginRegisterForm = () => {

  const dispatch = useDispatch();

  const [isInvalid, setIsInvalid] = useState(false);
  const [usernameVal, setUsernameVal] = useState("");
  const [passwordVal, setPasswordVal] = useState("");

  const onFinish = (e) => {
    novoLogin(usernameVal, passwordVal)
      .then((res) => {
        sessionStorage.setItem("U1PGjSQGhPkzyJOz59JAW9bb9LwpMbde", res.data);
        sessionStorage.setItem("U1PGjSQGhPkzyEmail", usernameVal);
        dispatch(activeFormFunc('perentdetailsform'));
      })
      .catch(() => {
        setIsInvalid(true);
        setTimeout(() => {
          setIsInvalid(false);
        }, 5000);
      });
  };
    
      const [form] = Form.useForm();

      const handleNewUser = () => {
        dispatch(activeFormFunc('registerform'));
      }

      return (
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{}}
          scrollToFirstError
          layout="vertical"
        >
          <div className="w-full block md:flex">
            <div className="w-12/12 md:w-6/12">
              <h3 className="font-bold text-lg py-3">Existing User?</h3>
              <div className="rizDivider"></div>
    
              <div className="flex">
                <div className="w-6/12">
                  <Form.Item
                    name="loginEmail"
                    label="Email"
                    hasFeedback
                    validateStatus={isInvalid && "error"}
                    rules={[
                      {
                        required: true,
                        message: "Please input your email address",
                      },
                      {
                        type: 'email',
                        message: "Please input email address",
                      },
                    ]}
                    className="px-2"
                  >
                    <Input onChange={(e) => setUsernameVal(e.target.value)}/>
                  </Form.Item>
                </div>
    
                <div className="w-6/12">
                  <Form.Item
                    name="loginPassport"
                    label="Password"
                    hasFeedback
                    validateStatus={isInvalid && "error"}
                    rules={[
                      {
                        required: true,
                        message: "Please input the password",
                      },
                      {
                        type: 'password',
                        message: "Please input valid password",
                      },
                    ]}
                    className="px-2"
                  >
                    <Input.Password onChange={(e) => setPasswordVal(e.target.value)} />
                  </Form.Item>
                </div>
              </div>
                    
              {isInvalid && (
            <div className="text-center text-red-500 text-base mt-[-10px]">
              Invalid username or password
            </div>
          )}

              <div className="flex justify-between mx-4">
                  <p className="text-md text-novo-blue font-bold">Forgot Password ?</p>
                  <button className="px-5 h-8 bg-novo-blue text-white">LOGIN</button>
            </div>

            </div>
            
            <div className="hidden md:flex justify-center m-2">
                    <div className="w-0.5 bg-gray-200 h-full">{" "}</div>
            </div>
            <div className="w-12/12 md:w-6/12">
            <h3 className="font-bold text-lg py-3">New Customer</h3>
              <div className="rizDivider"></div>
              <p className="text-gray-700 py-2">Please continue to create a new account during checkout</p>
              <div className="flex justify-end">
              <button type="button" className="px-5 h-9 bg-novo-blue text-white mt-9" onClick={handleNewUser}>CONTINUE</button>
              </div>
            </div>
          </div>
        </Form>
      );
    };

export default LoginRegisterForm