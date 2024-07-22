import { Container, Row, Col } from "react-bootstrap";
import InfoBar from "./components/Home/InfoBar";
import FooterArea from "./components/FooterArea";
import NavigationBar from "./components/Home/NavigationBar";
import { getUniqueOrderDetails } from "./manageServices/services";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const OrderSubmitted = ({ fromModel }) => {
  const navigate = useNavigate();
  const [invalidId, setInvalidId] = useState(true);
  const [OrderDetails, setOrderDetails] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  //const orderId = localStorage.getItem("novoOrderID");

  const { viewProductId } = useSelector((state) => state.general);

  useEffect(() => {
    if (!viewProductId) {
      navigate("/orderslist");
    } else {
      setInvalidId(false);
      getUniqueOrderDetails(viewProductId)
        .then((res) => setOrderDetails(res.data))
        .catch(() => navigate("/orderslist"))
        .finally(() => setIsCompleted(true));
    }
  }, [viewProductId]);

  const accessoriesPriceGetter = () => {
    let fullPrice = [];
    OrderDetails.accessories.map((data) => fullPrice.push(parseInt(data.price)) )
    let result = fullPrice.reduce((a, b) => a + b);
    return result;
  }
  
  return (
    <div>
      {!fromModel && <InfoBar />}
      {!fromModel && <NavigationBar />}
      <Container>
        <Row>
          {isCompleted && OrderDetails ? (
            <Col>
              <div className={"w-full p-5" + !fromModel ? "my-10" : "my-0"}>
                {!fromModel && (
                  <h1 className="font-bold text-2xl text-novo-green">
                    Your Order Submitted Successfully
                  </h1>
                )}
                <div className="text-xl flex my-4">
                  <h1 className="pr-2 font-bold">Order Status</h1>
                  <h1 className="font-bold text-novo-blue">
                    {OrderDetails.status}
                  </h1>
                </div>
                <div>
                  <h1 className="font-bold text-xl">Order Summary</h1>
                  <div className="rizDivider"></div>
                  <div className="w-9/12">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-bold text-lg my-2">Parent/Guardian Details</h3>
                        <table className="border-separate my-table-spacing">
                          <thead></thead>
                          <tbody>
                            
                            <tr className="row">
                              <td className="col  w-72">First Name:</td>
                              <td className="col">{OrderDetails.parent.firstName}</td>
                            </tr>
                            <tr className="row">
                              <td className="col">Surname:</td>
                              <td className="col">{OrderDetails.parent.lastName}</td>
                            </tr>
  
                            <tr className="row">
                              <td className="col">Email:</td>
                              <td className="col">{OrderDetails.parent.email}</td>
                            </tr>

                            <tr className="row">
                              <td className="col">Mobile Number:</td>
                              <td className="col">{OrderDetails.parent.contactNumber}</td>
                            </tr>

                            <tr className="row">
                              <td className="col">Address:</td>
                              <td className="col">
                                {OrderDetails.parent.address.address1 +
                                  " " +
                                  OrderDetails.parent.address.address2 + ", "+OrderDetails.parent.address.suburb +
                                  ", " +
                                  OrderDetails.parent.address.state +
                                  ". " +
                                  OrderDetails.parent.address.postcode}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div>
                        <h3 className="font-bold text-lg my-2  text-center">
                          Student Information
                        </h3>
                        <table className="border-separate my-table-spacing text-right w-72">
                          <thead></thead>
                          <tbody>
                            <tr className="row">
                              <td className="col">First Name:</td>
                              <td className="col text-start">{OrderDetails.student.firstName}</td>
                            </tr>
                            <tr className="row">
                              <td className="col">Preferred Name:</td>
                              <td className="col text-start">{OrderDetails.student.preferredName}</td>
                            </tr>
                            <tr className="row">
                              <td className="col">Surname:</td>
                              <td className="col text-start">{OrderDetails.student.lastName}</td>
                            </tr>

                            <tr className="row">
                              <td className="col">School:</td>
                              <td className="col text-start">{OrderDetails.school.name}</td>
                            </tr>

                           { OrderDetails.student.id && 
                           <tr className="row">
                              <td className="col">Student ID :</td>
                              <td className="col text-start">{OrderDetails.student.id}</td>
                            </tr>
                            }

                            <tr className="row">
                              <td className="col">Student Year in 2024:</td>
                              <td className="col text-start">{OrderDetails.student.level}</td>
                            </tr>

                            {/* { <tr>
                            <td>Program:</td>
                            <td>{OrderDetails.products[0].name}</td>
                          </tr>} */}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="rizDivider"></div>

                  <div>
                    <h1 className="font-bold text-lg my-4">
                      Payment Instructions
                    </h1>
                    {/* <p className="leading-4">
                  {
                                OrderDetails.parent.address.address2 + " " +
                                OrderDetails.parent.address.suburb + " " +
                                OrderDetails.parent.address.state + " " +
                                OrderDetails.parent.address.postcode
                  }
                  </p> */}
                    {OrderDetails.school.name.startsWith("Melbourne Grammar School") ?
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
                    <div className="w-full flex">
                      <div className="w-2/12">Device</div>

                      <div className="w-5/12 font-bold">
                        {/* {<ui className="w-10 text-ellipsis">
                    {isCompleted && OrderDetails.products[0].features.map((deviceDetail, i) => {
                        return (
                          <li key={i} className="flex">
                            {deviceDetail} /
                          </li>
                        );
                      })}
                    </ui>} */}
                        {OrderDetails.products[0].name}
                      </div>

                      <div className="w-3/12 text-center">In Stock</div>

                      <div className="w-4/12 font-bold flex justify-end">
                        ${OrderDetails.products[0].price}.00 inc GST
                      </div>
                    </div>

                     {/* ---------------------------------------------------- Accessories ----------------------------------------------------------- */}

                {OrderDetails.accessories.length >= 1 &&
                  OrderDetails.accessories.map((data, i) => {
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
                          {/* ${OrderDetails.products[0].price}.00 inc GST */}
                            ${
                          OrderDetails.accessories.length >= 1 ? OrderDetails.products[0].price + accessoriesPriceGetter(): OrderDetails.products[0].price
                        }.00 inc GST
                        </h1>
                      </div>
                    </div>

                    <div className="rizDivider"></div>
                  </div>
                </div>
              </div>
            </Col>
          ) : (
            <Col>No Product Found</Col>
          )}
        </Row>
      </Container>
      {!fromModel && <FooterArea />}
    </div>
  );
};

export default OrderSubmitted;
