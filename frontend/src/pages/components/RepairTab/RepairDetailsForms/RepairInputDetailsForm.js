import { Form, Input, Col, Row, InputNumber, Select, DatePicker, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { tabActiveKeyFunc } from "../../../../redux/generalSlice";
import { setRepairDetailsForm, getRepairFormDetails } from "../../../../redux/repairSlice";
import moment from "moment";

const damageOptions = [
  "Dropped out of locker",
  "Liquid spill",
  "Tripped over cord",
  "Dropped in transit",
  "Stepped on/kicked/closed lid on object",
  "Knocked off desk",
  "Other damage",
];

const RepairInputDetailsForm = () => {
  const [otherDataChecked, setOtherDataChecked] = useState(false);
  const [otherDataMessage, setOtherDataMessage] = useState("");
  const [formattedDate, setFormattedDate] = useState("");

  const dispatch = useDispatch();
  const { Option } = Select;
  const formDetails = useSelector(getRepairFormDetails);
  const [form] = Form.useForm();

  useEffect(() => {
    if (Object.keys(formDetails).length > 0) {
      console.log('edit data', formDetails);
      
      // Check if the damageCause from formDetails exists in damageOptions or is "Other damage"
      const isOtherDamage = !damageOptions.includes(formDetails.reason);
      setOtherDataChecked(isOtherDamage);
      setOtherDataMessage(isOtherDamage ? formDetails.reason : "");

      setFormattedDate(formDetails.incidentDate ? formDetails.incidentDate : "");

      form.setFieldsValue({
        ...formDetails,
        incidentDate: formDetails.incidentDate ? moment(formDetails.incidentDate, "DD-MM-YYYY") : null,
        reason: isOtherDamage ? "Other damage" : formDetails.reason
      });
    }
  }, [formDetails, form]);

  const handleDateChange = (date) => {
    if (date) {
      setFormattedDate(moment(date).format("DD-MM-YYYY"));
    }
  };

  const handleSubmit = (data) => {
    let newDamageCauses = data.reason;
    if (data.reason === "Other damage") {
      newDamageCauses = otherDataMessage; // Use the message from the "Other damage" field
    }

    let modifiedData = {
      ...data,
      reason: newDamageCauses,
      incidentDate: formattedDate,
    };

    console.log('Submitted', modifiedData);
    dispatch(setRepairDetailsForm(modifiedData));
    dispatch(tabActiveKeyFunc(2));
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleSubmit}>
      <Row gutter={16}>
        {/* Ticket Number */}
        <Col span={12}>
          <Form.Item 
            label="Ticket Number" 
            name="ticketNumber" 
            rules={[
              { required: true, message: 'Please input the ticket number!' },
              { min: 9, max: 12, message: 'Ticket number must be between 9 and 12 characters!' }
              ]}>
            <Input />
          </Form.Item>
        </Col>

        {/* Your Name */}
        <Col span={12}>
          <Form.Item label="Your Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        {/* Your Contact Number */}
        <Col span={12}>
          <Form.Item label="Your Contact Number" name="phone" rules={[{ required: true, message: 'Please input your contact number!' }]}>
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
          <Form.Item label="Year Level" name="level" rules={[{ required: true, message: 'Please select the year level!' }]}>
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
        label="Select the appropriate cause of the damage from the options below:" 
        name="reason"
        rules={[{ required: true, message: 'Please select the cause of the damage!' }]}
      >
        <Select
          placeholder="Select cause of damage"
          onChange={(value) => {
            setOtherDataChecked(value === "Other damage");
            form.setFieldsValue({ damageCauses: value });
          }}
        >
          {damageOptions.map(option => (
            <Option key={option} value={option}>{option}</Option>
          ))}
        </Select>
      </Form.Item>

      {/* Other Damages */}
      {otherDataChecked && (
        <Form.Item 
          label="Please mention any other damages here:" 
          rules={[{ required: true, message: 'Please mention any other damages here' }]} 
          name="otherDamages"
        >
          <Input.TextArea rows={4} onChange={(e) => setOtherDataMessage(e.target.value)} value={otherDataMessage} />
        </Form.Item>
      )}

      {/* Date of Incident */}
      <Form.Item label="Date of Incident" name="incidentDate" rules={[{ required: true, message: 'Please select the date of incident!' }]}>
        <DatePicker 
          onChange={handleDateChange} 
          format="DD-MM-YYYY" 
          style={{ width: "100%" }} 
          placement="topLeft" 
        />
      </Form.Item>

      {/* Submit Button */}
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
