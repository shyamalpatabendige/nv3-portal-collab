import {
  Form,
  Col,
  Row,
  Checkbox,
  Button,
  Typography
} from "antd";
import { useSelector } from "react-redux";
import { getRepairFormDetails } from "../../../../redux/repairSlice";


const RepairConfirmDetailsForm = () => {
  const { Title } = Typography;

  const {
    contactNumber,
    damageCauses,
    dateOfIncident,
    email,
    studentName,
    ticketNumber,
    yearLevel,
    yourName    
  } = useSelector(getRepairFormDetails);

  return (
    <Form layout="vertical">
      
      <center>
          <Title className="m-5 text-novo-blue" level={2}>Confirm Details</Title>
      </center>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Ticket Number">
            <Title level={5}>{ticketNumber}</Title></Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Your Name">
            <Title level={5}>{yourName}</Title></Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Your Contact Number">
            <Title level={5}>{contactNumber}</Title></Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Your Email Address">
            <Title level={5}>{email}</Title></Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Student Name">
            <Title level={5}>{studentName}</Title></Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Year Level">
            <Title level={5}>{yearLevel}</Title></Form.Item>
        </Col>
      </Row>

      {/* Causes of Damage */}
      <Form.Item label="Tick the appropriate cause/s of the damage from the options below:">
        <Title level={5}>
          <ol>
            {damageCauses?.map((data) => <li key={data}>{data}</li>)}
          </ol>
        </Title>
      </Form.Item>

      {/* Date of Incident */}
      <Form.Item label="Date of Incident">
        <Title level={5}>{dateOfIncident}</Title></Form.Item>

      {/* Submit Button */}
      {/* Submit Button aligned to the right */}
      <Form.Item>
        <Row justify="end">
          <Col>
            <Button
              type="primary"
              htmlType="submit"
              className="rounded-xl bg-novo-green"
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
