import "antd/dist/antd.css";
import { Col, Container, Row } from "react-bootstrap";
//import { Tabs } from "antd";
import StudentProgram from "./StudentProgram";
import DevicesAccessories from "./DevicesAccessories";
import PersonalDetails from "./PersonalDetails";
import ReviewOrder from "./ReviewOrder";
import { useSelector } from "react-redux/es/exports";
import { Steps } from "antd";
import Accessories from "./Accessories";

const { Step } = Steps;
//const { TabPane } = Tabs;

// const onChange = (key) => {
//   console.log(key);
// };

const ProductArea = () => {
  const { tabActiveKey } = useSelector((state) => state.general);

  // console.log(tabActiveKey)

  return (
    <Container>
      <Row>
        <Col>
          <div className="bg-gray-100 p-3 my-8">
            <Steps current={parseInt(tabActiveKey) - 1}>
              <Step
                title="Student Program"
               // description="This is a description."
              />
              <Step
                title="Devices"
               // subTitle="Left 00:00:08"
                //description="This is a description."
              />
              <Step
                title="Accessories"
               // subTitle="Left 00:00:08"
                //description="This is a description."
              />
              <Step
                title="Personal Details"
               // subTitle="Left 00:00:08"
                //description="This is a description."
              />
              <Step title="Review Order" 
              //description="This is a description." 
              />
            </Steps>
          </div>
          {
          tabActiveKey === "1" ? (
            <StudentProgram />
          ) : tabActiveKey === "2" ? (
            <DevicesAccessories />
          ) : tabActiveKey === "3" ? (
            <Accessories />
          ) :tabActiveKey === "4" ? (
            <PersonalDetails />
          ) : (
            <ReviewOrder />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductArea;
