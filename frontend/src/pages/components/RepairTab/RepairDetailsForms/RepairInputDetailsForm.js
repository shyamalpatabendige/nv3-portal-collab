import { Form, Input, Col, Row, InputNumber, Checkbox, Select, DatePicker, Button } from "antd";
import { novoSubmitOrder, repairOrderSubmit } from "../../../manageServices/services";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { tabActiveKeyFunc } from "../../../../redux/generalSlice";
import { orderDataFunc } from "../../../../redux/orderDetailsSlice";
import { setRepairDetailsForm } from "../../../../redux/repairSlice";
import moment from "moment";


const RepairInputDetailsForm = () => {
  const dispatch = useDispatch();
  const Option = Select;

  const [otherDataChecked, setOtherDataChecked] = useState(false); //setOtherDataMessage
  const [otherDataMessage, setOtherDataMessage] = useState(false); //setOtherDataMessage
  const [formattedDate, setFormattedDate] = useState("");

  const handleDateChange = (date) => {
    if (date) {
      setFormattedDate(moment(date).format("DD-MM-YYYY")); 
    } else {
      setFormattedDate("");
    }
  };

  const handleSubmit = (data) => {
    let removeOtherKeyInTheArray = data?.damageCauses?.filter(data => data !== "otherDamage") || [];
    let newDamageCauses = otherDataChecked ? [...removeOtherKeyInTheArray, otherDataMessage] : removeOtherKeyInTheArray
    let modifiedData = {...data, damageCauses: newDamageCauses, dateOfIncident: formattedDate}
    console.log('Submitted', modifiedData)
    dispatch(setRepairDetailsForm(modifiedData));
    dispatch(tabActiveKeyFunc(2));
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
    <Row gutter={16}>
      {/* Ticket Number */}
      <Col span={12}>
        <Form.Item label="Ticket Number" name="ticketNumber" rules={[{ required: true, message: 'Please input the ticket number!' }]}>
          <Input />
        </Form.Item>
      </Col>

      {/* Your Name */}
      <Col span={12}>
        <Form.Item label="Your Name" name="yourName" rules={[{ required: true, message: 'Please input your name!' }]}>
          <Input />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      {/* Your Contact Number */}
      <Col span={12}>
        <Form.Item label="Your Contact Number" name="contactNumber" rules={[{ required: true, message: 'Please input your contact number!' }]}>
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
      </Col>

      {/* Your Email Address */}
      <Col span={12}>
        <Form.Item label="Your Email Address" name="email" rules={[{ required: true, message: 'Please input your email address!', type: 'email' }]}>
          <Input />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      {/* Student Name */}
      <Col span={12}>
        <Form.Item label="Student Name" name="studentName" rules={[{ required: true, message: 'Please input the student name!' }]}>
          <Input />
        </Form.Item>
      </Col>

      {/* Year Level */}
      <Col span={12}>
        <Form.Item label="Year Level" name="yearLevel" rules={[{ required: true, message: 'Please select the year level!' }]}>
          <Select placeholder="Select Year Level">
            <Option value="Year 8">Year 8</Option>
            <Option value="Year 9">Year 9</Option>
            <Option value="Year 10">Year 10</Option>
            <Option value="Year 11">Year 11</Option>
            <Option value="Year 12">Year 12</Option>
          </Select>
        </Form.Item>
      </Col>
    </Row>

    {/* Causes of Damage */}
    <Form.Item 
  label="Tick the appropriate cause/s of the damage from the options below:" 
  name="damageCauses"  // Add this line
  rules={[{ required: true, message: 'Please select at least one cause of the damage!' }]} // Updated message for clarity
>
  <Checkbox.Group>
    <Row>
      <Col span={8}>
        <Checkbox value="Dropped out of locker">Dropped out of locker</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="Liquid spill">Liquid spill</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="Tripped over cord">Tripped over cord</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="Dropped in transit">Dropped in transit</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="Stepped on/kicked/closed lid on object">Stepped on/kicked/closed lid on object</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="Knocked off desk">Knocked off desk</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="otherDamage" onChange={(e) => setOtherDataChecked(e?.target?.checked)}>Other damage</Checkbox>
      </Col>
    </Row>
  </Checkbox.Group>
</Form.Item>

    {/* Other Damages */}
    {
      otherDataChecked &&
      <Form.Item label="Please mention any other damages here:" onChange={(e) => setOtherDataMessage(e?.target?.value)} rules={[{ required: true, message: 'Please mention any other damages here' }]} name="otherDamages">
      <Input.TextArea rows={4} />
    </Form.Item>
    }

    {/* Date of Incident */}
    <Form.Item label="Date of Incident" name="dateOfIncident" rules={[{ required: true, message: 'Please select the date of incident!' }]}>
      <DatePicker 
          onChange={handleDateChange} 
          format="DD-MM-YYYY" // Display format in the picker 
          style={{ width: "100%" }} placement="topLeft" />
    </Form.Item>

    {/* Submit Button */}
    {/* Submit Button aligned to the right */}
    <Form.Item>
        <Row justify="end">
          <Col>
            <Button type="primary" htmlType="submit" className="rounded-xl bg-novo-green">
              Submit
            </Button>
          </Col>
        </Row>
      </Form.Item>
  </Form>
  );
};

export default RepairInputDetailsForm;
