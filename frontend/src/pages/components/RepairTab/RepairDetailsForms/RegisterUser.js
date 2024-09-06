import { Form, Input } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { activeFormFunc } from "../../../../redux/personalDetailsFormSlice";
import { novoRegister } from "../../../manageServices/services";

const RegisterUser = () => {
  const dispatch = useDispatch();

  const [isInvalid, setIsInvalid] = useState(false);

  const onFinish = (values) => {
    novoRegister(
      values.registerEmail,
      values.registerConfirmEmail,
      values.registerPassword,
      values.confirmRegisterPassword
    )
      .then((res) => {
        dispatch(activeFormFunc("loginregisterform"));
        sessionStorage.setItem("U1PGjSQGhPkzyJOz59JAW9bb9LwpMbde", res.data);
        sessionStorage.setItem("U1PGjSQGhPkzyEmail", values.registerEmail);
      })
      .catch(() => {
        setIsInvalid(true);
        setTimeout(() => {
          setIsInvalid(false);
        }, 5000);
      });
  };

  const [form] = Form.useForm();

  const handleLogin = () => {
    dispatch(activeFormFunc("loginregisterform"));
  };

  return (
    <Form
      form={form}
      name="register"
      onSubmit={(e) => e.preventDefault()}
      onFinish={onFinish}
      initialValues={{}}
      scrollToFirstError
      layout="vertical"
    >
      <div className="w-full block md:flex">
        <div className="w-12/12 md:w-6/12">
          <h3 className="font-bold text-lg py-3">Register User ?</h3>
          <div className="rizDivider"></div>

          <div className="flex">
            <div className="w-6/12">
              <Form.Item
                name="registerEmail"
                label="Email Address"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please input your email address",
                  },
                  {
                    type: "email",
                    message: "Please input valid email address",
                  },
                ]}
                className="px-2"
              >
                <Input />
              </Form.Item>
            </div>

            <div className="w-6/12">
              <Form.Item
                name="registerConfirmEmail"
                label="Confirm Email Address"
                dependencies={["registerEmail"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please Confirm You Email Address",
                  },
                  {
                    type: "email",
                    message: "Please input valid email address",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("registerEmail") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("The email that you entered do not match!")
                      );
                    },
                  }),
                ]}
                className="px-2"
              >
                <Input />
              </Form.Item>
            </div>
          </div>

          <div className="flex">
            <div className="w-6/12">
              <Form.Item
                name="registerPassword"
                label="Password"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please input the Password",
                  },{ 
                    min: 8, message: "Password must be minimum 8 characters." 
                  },
                ]}
                className="px-2"
              >
                <Input type={"password"} />
              </Form.Item>
            </div>

            <div className="w-6/12">
              <Form.Item
                name="confirmRegisterPassword"
                label="Confirm Password"
                dependencies={["registerPassword"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please input the Confirm Password",
                  },
                  {
                    type: "password",
                    message: "Please input valid password",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (
                        !value ||
                        getFieldValue("registerPassword") === value
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("The Password that you entered do not match!")
                      );
                    },
                  }),
                ]}
                className="px-2"
              >
                <Input type={"password"} />
              </Form.Item>
            </div>
          </div>
          {isInvalid && (
            <div className="text-center text-red-500 text-base mt-[-10px] ">
              Invalid user details. Please use login option if you have an account.
            </div>
          )}

          <div className="flex justify-between mx-4">
            <p className="text-md text-novo-blue font-bold">
              Forgot Password ?
            </p>
            <button className="px-5 h-8 bg-novo-blue text-white">
              REGISTER
            </button>
          </div>
        </div>

        {
          // <div className="w-6/12">
          // <div className="flex justify-center pt-28">
          //   <div className="text-center">
          //   <h1 className="text-base font-bold text-center">
          //       already have an account?
          //   </h1>
          //   <button className="px-5 h-8 bg-novo-blue text-white" >Login</button>
          //   </div>
          // </div>
          // </div>
        }

        <div className="hidden md:flex justify-center m-2">
          <div className="w-0.5 bg-gray-200 h-full"> </div>
        </div>

        <div className="w-12/12 md:w-6/12">
          <h3 className="font-bold text-lg py-3">Already have an account?</h3>
          <div className="rizDivider"></div>
          <p className="text-gray-700 py-2">
            Please continue to login your account with your credentials{" "}
          </p>
          <div className="flex justify-end">
            <button
              type="button"
              className="px-5 h-9 bg-novo-blue text-white mt-9"
              onClick={handleLogin}
            >
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default RegisterUser;
