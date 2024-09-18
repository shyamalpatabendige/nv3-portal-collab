import { Form, Col, Row, Button, Typography } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  getRepairFormDetails,
  setIsRepairApiSuccess,
  setIsRepairApiStatus
} from "../../../../redux/repairSlice";
import { tabActiveKeyFunc } from "../../../../redux/generalSlice";
import moment from "moment";
import { repairOrderSubmit } from "../../../manageServices/services";

const RepairConfirmDetailsForm = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();

  // Extract form details from the Redux store
  const formDetails = useSelector(getRepairFormDetails);

  // Destructure form details and set default values if data is missing
  const {
    phone = "N/A",
    reason = "N/A",
    incidentDate = "N/A",
    email = "N/A",
    studentName = "N/A",
    ticketNumber = "N/A",
    level = "N/A",
    name = "N/A",
  } = formDetails;

  // Format the date if available and valid
  const formattedDate =
    incidentDate && moment(incidentDate, "DD-MM-YYYY").isValid()
      ? moment(incidentDate, "DD-MM-YYYY").format("DD-MM-YYYY")
      : "N/A";

  const handleEdit = () => {
    dispatch(tabActiveKeyFunc(1));
  };

  const handleConfirmForm = async () => {
    dispatch(setIsRepairApiStatus("PENDING"));
    dispatch(tabActiveKeyFunc(3));
    return await repairOrderSubmit(formDetails)
      .then((res) => {
        console.log(res);
        dispatch(setIsRepairApiStatus("SUCCESS"));
      })
      .catch((err) => {
        console.error(":::", err);
        dispatch(setIsRepairApiStatus("FAIL"));
      });
  };

  return (
    <Form layout="vertical">
      <center>
        <Title className="m-5 text-novo-blue" level={2}>
          Confirm Details
        </Title>
      </center>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Ticket Number">
            <Title level={5}>{ticketNumber}</Title>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Your Name">
            <Title level={5}>{name}</Title>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Your Contact Number">
            <Title level={5}>{phone}</Title>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Your Email Address">
            <Title level={5}>{email}</Title>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Student Name">
            <Title level={5}>{studentName}</Title>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Year Level">
            <Title level={5}>{level}</Title>
          </Form.Item>
        </Col>
      </Row>

      {/* Causes of Damage */}
      <Form.Item label="Tick the appropriate cause/s of the damage from the options below:">
        <Title level={5}>
          <ol>
            {reason?.map((eachReason) => (
              <li key={eachReason}>{eachReason}</li>
            ))}
          </ol>
        </Title>
      </Form.Item>

      {/* Date of Incident */}
      <Form.Item label="Date of Incident">
        <Title level={5}>{formattedDate}</Title>
      </Form.Item>

      {/* Buttons aligned to the right */}
      <Form.Item>
        <Row justify="end" gutter={16}>
          <Col>
            <Button type="default" onClick={handleEdit} className="rounded-xl">
              Edit
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              htmlType="submit"
              className="rounded-xl bg-novo-green"
              onClick={handleConfirmForm}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default RepairConfirmDetailsForm;
