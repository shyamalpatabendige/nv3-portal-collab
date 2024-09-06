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
import RepairInputDetailsForm from "./RepairDetailsForms/RepairInputDetailsForm";//RepairConfirmDetailsForm
import RepairConfirmDetailsForm from "./RepairDetailsForms/RepairConfirmDetailsForm";

const { Step } = Steps;
//const { TabPane } = Tabs;

// const onChange = (key) => {
//   console.log(key);
// };

const RepairArea = () => {
  const { tabActiveKey } = useSelector((state) => state.general);
console.log(typeof(tabActiveKey))
  return (
    <Container>
      <Row>
        <Col>
          <div className="bg-gray-100 p-3 my-8">
            <Steps current={parseInt(tabActiveKey) - 1}>
              <Step
                title="Repair Program"
               // description="This is a description."
              />
              <Step
                title="Confirm Details"
               // subTitle="Left 00:00:08"
                //description="This is a description."
              />
              <Step
                title="Successfully Submitted"
               // subTitle="Left 00:00:08"
                //description="This is a description."
              />
            </Steps>
          </div>
          {
          parseInt(tabActiveKey) === 1 ? (
           <RepairInputDetailsForm />
          ) : parseInt(tabActiveKey) === 2 ? (
            <RepairConfirmDetailsForm />
          ) : parseInt(tabActiveKey) === 3 ? (
            <RepairConfirmDetailsForm />
          ) :parseInt(tabActiveKey) === 4 ? (
            // <PersonalDetails />
            <></>
          ) : (
            // <ReviewOrder />
            <></>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default RepairArea;
