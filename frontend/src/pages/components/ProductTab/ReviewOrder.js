import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  tabActiveKeyFunc,
  viewProductIdFunc,
} from "../../../redux/generalSlice";
import { novoSubmitOrder } from "../../manageServices/services";
import { useState } from "react";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const ReviewOrder = () => {
  const navigate = useNavigate();
  const { orderData, schoolData, deviceData } = useSelector(
    (state) => state.orderDetails
  );

  const { selectedProductId, enteredSchoolCode } = useSelector(
    (state) => state.general
  );
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    novoSubmitOrder(
      orderData.pfirstName,
      orderData.psurname,
      orderData.paddressLineOne,
      orderData.paddressLineTwo,
      orderData.psuburb,
      orderData.pstate,
      orderData.ppostcode,
      orderData.pemail,
      orderData.pcontactNumber,
      orderData.stuFirstName,
      orderData.stuPreferredName,
      orderData.stuSurname,
      orderData.studentID,
      orderData.studentYearLevel,
      [selectedProductId.toString()],
      enteredSchoolCode,
      [...orderData.selectedAccessories]
    )
      .then((res) => {
        // localStorage.setItem("novoOrderID", res.data)
        dispatch(viewProductIdFunc(res.data));
        navigate("/orderSubmitted");
        dispatch(tabActiveKeyFunc("1"));
      })
      .catch((err) => { 
        const { confirm } = Modal;
        confirm({
          title: "Your session has expired.",
          icon: <ExclamationCircleOutlined />,
          content: "To get back in, please login again.",
          okText: "Login",
          onOk() {
            sessionStorage.clear();
            navigate("/");
            dispatch(tabActiveKeyFunc("1"));
          },

          onCancel() {
            sessionStorage.clear();
            navigate("/");
            dispatch(tabActiveKeyFunc("1"));
          },
        });
      });
  };

  const accessoriesPriceGetter = () => {
    let fullPrice = [];
    orderData.selectedAccessories.map((data) => fullPrice.push(parseInt(data.price)) )
    let result = fullPrice.reduce((a, b) => a + b);
    return result;
  }
  //navigate("/orderSubmitted")
  return (
    <Container>
      <Row>
        <Col>
          <div className="w-full">
            <div>
              <h1 className="font-bold text-xl">Order Summary</h1>
              <div className="rizDivider"></div>
              <div className="w-9/12">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold text-lg my-2">
                      Parent/Guardian Details
                    </h3>
                    <table className="border-separate my-table-spacing">
                      <thead></thead>
                      <tbody>
                        <tr className="row">
                          <td className="col w-72">First Name:</td>
                          <td className="col">{orderData.pfirstName}</td>
                        </tr>
                        <tr className="row">
                          <td className="col">Surname:</td>
                          <td className="col">{orderData.psurname}</td>
                        </tr>
                        <tr className="row">
                          <td className="col">Email:</td>
                          <td className="col">{orderData.pemail}</td>
                        </tr>

                        <tr className="row">
                          <td className="col">Mobile Number:</td>
                          <td className="col">{orderData.pcontactNumber}</td>
                        </tr>

                        <tr className="row">
                          <td className="col">Address:</td>
                          <td className="col">
                            {orderData.paddressLineOne +
                              " " +
                              orderData.paddressLineTwo +
                              ", " +
                              orderData.psuburb +
                              ", " +
                              orderData.pstate +
                              " " +
                              orderData.ppostcode}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg my-2 text-center">
                      Student Information
                    </h3>
                    <table className="border-separate my-table-spacing text-right w-72">
                      <thead></thead>
                      <tbody>
                        <tr className="row">
                          <td className="col">First Name:</td>
                          <td className="col text-start">
                            {orderData.stuFirstName}
                          </td>
                        </tr>
                        <tr className="row">
                          <td className="col">Preferred Name:</td>
                          <td className="col text-start">
                            {orderData.stuPreferredName}
                          </td>
                        </tr>
                        <tr className="row">
                          <td className="col">Surname:</td>
                          <td className="col text-start">
                            {orderData.stuSurname}
                          </td>
                        </tr>

                        <tr className="row">
                          <td className="col">School:</td>
                          <td className="col text-start">{schoolData}</td>
                        </tr>

                        { orderData.studentID &&
                          <tr className="row">
                          <td className="col">Student ID :</td>
                          <td className="col text-start">
                            {orderData.studentID}
                          </td>
                        </tr>
                        }

                        <tr className="row">
                          <td className="col">Student Year in 2024:</td>
                          <td className="col text-start">
                            {orderData.studentYearLevel}
                          </td>
                        </tr>

                        {/* {<tr>
                          <td>Program:</td>
                          <td>{deviceData.deviceName}</td>
                        </tr>} */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="rizDivider"></div>

              <div>
                <h1 className="font-bold text-lg my-4">Payment Instructions</h1>
                {/* <p className="leading-4">
                  {orderData.paddressLineOne +
                    " " +
                    orderData.paddressLineTwo +
                    " " +
                    orderData.psuburb +
                    " " +
                    orderData.pstate}
                </p> */}

                {schoolData.startsWith("Melbourne Grammar School") ?
                  <p className="w-11/12 my-4">Once you have confirmed your order, you will receive an email from Novo3 with payment instructions to secure your order. You will also receive additional information regarding the optional add-on full insurance products available for the Melbourne Grammar School device program.
                  <br></br>Check your Spam or Junk Mail folder if you do not receive an email from us within 3 working days.</p>
               :
                <p className="w-11/12 my-4">You will receive an email from Novo3 in 5 working days with payment instructions for the $250 deposit to secure your order.
                <br></br>Check your Spam or Junk Mail folder if you do not receive an email from us within 5 working days.</p>
                }

              </div>

              <div className="rizDivider"></div>

              <div>
                <h1 className="font-bold text-lg my-4">Products</h1>
                {/* ---------------------------------------------------- Devices ----------------------------------------------------------- */}
                <div className="w-full flex">
                  <div className="w-2/12">Device</div>

                  <div className="w-5/12 font-bold">
                    {/* {<ui className="w-10 text-ellipsis">
                      {deviceData.deviceFeatures.map((deviceDetail, i) => {
                        return (
                          <li key={i} className="flex">
                            {deviceDetail} /
                          </li>
                        );
                      })}
                    </ui>} */}
                    {deviceData.deviceName}
                  </div>

                  <div className="w-3/12 text-center">In Stock</div>

                  <div className="w-4/12 font-bold flex justify-end">
                    ${deviceData.devicePrice}.00 inc GST
                  </div>
                </div>

                {/* ---------------------------------------------------- Accessories ----------------------------------------------------------- */}

                {orderData.selectedAccessories.length >= 1 &&
                  orderData.selectedAccessories.map((data, i) => {
                    return (
                        <div className="w-full flex" key={i}>
                          <div className="w-2/12">Accessories</div>
                          <div className="w-5/12 font-bold">{data.name}</div>
                          <div className="w-3/12 text-center">In Stock</div>
                          <div className="w-4/12 font-bold flex justify-end">
                            ${data.price}.00 inc GST
                          </div>
                        </div>
                    );
                  })}

                {/* <div className="rizDivider"></div>
                <div className="flex ">
                  <div className="w-2/12">Other</div>
                  <div className="w-8/12">Delivery Charge</div>
                  <div className="w-4/12">Delivery Charge</div>
                </div> */}
                <div className="rizDivider"></div>

                <div className="flex justify-between">
                  <div>
                    <h1 className="text-xl font-bold">Order Total</h1>
                    <h3 className="font-bold">Total inc GST</h3>
                  </div>

                  <div>
                    <h1 className="text-xl font-bold mt-3">
                      {/* ${deviceData.devicePrice}.00 inc GST */}
                      ${
                        orderData.selectedAccessories.length >= 1 ? deviceData.devicePrice + accessoriesPriceGetter(): deviceData.devicePrice
                      }.00 inc GST
                    </h1>
                  </div>
                </div>

                <div className="rizDivider"></div>

                <div className="flex justify-between mt-10 mb-3">
                  <div className="flex">
                    <input
                      className="h-4 w-4 mt-0.5 cursor-pointer"
                      type={"checkbox"}
                      onChange={(e) => setIsChecked(!isChecked)}
                    />

                    <p className="px-2">
                      I have read and agree to the terms and conditions and
                      privacy policy.{" "}
                      <a
                        href="https://www.novo3.com.au/privacy-policy/"
                        target="_blank"
                      >
                        Read terms and conditions
                      </a>
                    </p>
                  </div>

                  <div>
                    <button
                      className="px-5 py-2 bg-novo-blue text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
                      onClick={handleSubmit}
                      disabled={!isChecked}
                    >
                      CONFIRM YOUR ORDER
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-lg font-bold text-novo-blue my-8"
                  onClick={() => dispatch(tabActiveKeyFunc("4"))}
                >
                  Back to Personal Details
                </button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ReviewOrder;
