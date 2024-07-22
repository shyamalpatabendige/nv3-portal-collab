import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { novoLogin } from "../../manageServices/services";
import { useNavigate } from "react-router-dom";

const LoginNovo = () => {

    const navigate = useNavigate();

    const [isInvalid, setIsInvalid] = useState(false);
    const [usernameVal, setUsernameVal] = useState("");
    const [passwordVal, setPasswordVal] = useState("");
  
    const onFinish = (e) => {
      novoLogin(usernameVal, passwordVal)
        .then((res) => {
          sessionStorage.setItem("U1PGjSQGhPkzyJOz59JAW9bb9LwpMbde", res.data);
          sessionStorage.setItem("U1PGjSQGhPkzyEmail", usernameVal);
          window.location.reload(false);
        })
        .catch(() => {
          setIsInvalid(true);
          setTimeout(() => {
            setIsInvalid(false);
          }, 5000);
        });
    };
  
  return (
    <div>
        <h1 className="text-gray-800 text-xl font-bold mt-2">
          CHECK YOUR ORDER HISTORY
        </h1>
        <p className="py-1">
          Want to see how your orders are going ? Enter your email address and
          password below.
        </p>
        <Form
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            label="Username"
            hasFeedback
            validateStatus={isInvalid && "error"}
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input onChange={(e) => setUsernameVal(e.target.value)} placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            hasFeedback
            validateStatus={isInvalid && "error"}
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password onChange={(e) => setPasswordVal(e.target.value)} placeholder="****************"/>
          </Form.Item>

          <div className="flex justify-between">
            <Form.Item>
              <Button type="link" htmlType="button">
                Forgot your password ?
              </Button>
            </Form.Item>

            <Form.Item>
              <button
                className="bg-novo-green px-5 py-1.5 text-white"
                htmlType="submit"
              >
                LOGIN
              </button>
            </Form.Item>
          </div>
          {isInvalid && (
            <div className="text-center text-red-500 text-base mt-[-10px]">
              Invalid username or password
            </div>
          )}
        </Form>
      </div>
  )
}

export default LoginNovo