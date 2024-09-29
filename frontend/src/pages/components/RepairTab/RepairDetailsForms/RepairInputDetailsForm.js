import {
  Form,
  Input,
  Col,
  Row,
  InputNumber,
  Select,
  DatePicker,
  Button,
  Checkbox,
  Typography
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { tabActiveKeyFunc } from "../../../../redux/generalSlice";
import {
  setRepairDetailsForm,
  getRepairFormDetails,
  getRepairProgramDetails,
} from "../../../../redux/repairSlice";
import moment from "moment";
import bcc22 from "../../../../assets/img/collageLogo/bcc22.jpg"
import mGS22 from "../../../../assets/img/collageLogo/MGS22.jpg"

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
  const repairProgramDetails = useSelector(getRepairProgramDetails);

  const { Title } = Typography;

  useEffect(() => {
    if (Object.keys(formDetails).length > 0) {
      const selectedReasons = Array.isArray(formDetails.reason)
        ? formDetails.reason
        : [formDetails.reason];
      const isOtherDamage = selectedReasons.some(
        (reason) => !damageOptions.includes(reason)
      );
      setOtherDataChecked(isOtherDamage);
      setOtherDataMessage(
        isOtherDamage
          ? selectedReasons.find((reason) => !damageOptions.includes(reason))
          : ""
      );

      setFormattedDate(
        formDetails.incidentDate ? formDetails.incidentDate : ""
      );

      form.setFieldsValue({
        ...formDetails,
        incidentDate: formDetails.incidentDate
          ? moment(formDetails.incidentDate, "DD-MM-YYYY")
          : null,
        reason: isOtherDamage
          ? [
              ...selectedReasons.filter((reason) =>
                damageOptions.includes(reason)
              ),
              "otherDamage",
            ]
          : selectedReasons,
      });
    }
  }, [formDetails, form]);

  const handleDateChange = (date) => {
    if (date) {
      setFormattedDate(moment(date).format("DD-MM-YYYY"));
    }
  };

  // const handleSubmit = (data) => {
  //   let newDamageCauses = data.reason;
  //   if (data.reason === "Other damage") {
  //     newDamageCauses = otherDataMessage; // Use the message from the "Other damage" field
  //   }

  //   let modifiedData = {
  //     ...data,
  //     reason: newDamageCauses,
  //     incidentDate: formattedDate,
  //   };

  //   console.log('Submitted', modifiedData);
  //   dispatch(setRepairDetailsForm(modifiedData));
  //   dispatch(tabActiveKeyFunc(2));
  // };
  // -----------------------
  const handleSubmit = (data) => {
    let removeOtherKeyInTheArray =
      data?.reason?.filter((data) => data !== "otherDamage") || [];
    let newDamageCauses = otherDataChecked
      ? [...removeOtherKeyInTheArray, otherDataMessage]
      : removeOtherKeyInTheArray;
    let modifiedData = {
      ...data,
      reason: newDamageCauses,
      incidentDate: formattedDate,
    };
    console.log("Submitted", modifiedData);
    dispatch(setRepairDetailsForm(modifiedData));
    dispatch(tabActiveKeyFunc(2));
  };

  // -------------
  console.log("CLG CLG ", repairProgramDetails);

  const { coveredList, name, img } = repairProgramDetails;

  return (
    <>
    <center>
    <img style={{width: '20%'}} src={img === "MGS22.jpg" ? mGS22 : bcc22} alt="" />
      <div className="mb-2">
      <Title level={4}>{name}</Title>
      </div>
    </center>
    What is covered
        <div className="mb-5" style={{display: 'block'}}>
        {
          coveredList?.map((data, i) => (
            <><li key={data}>{data}</li></>
          ))
        }
        </div>

      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Row gutter={16}>
          {/* Ticket Number */}
          <Col span={12}>
            <Form.Item
              label="Ticket Number"
              name="ticketNumber"
              rules={[
                { required: true, message: "Please provide the ticket number!" },
                {
                  min: 9,
                  max: 12,
                  message: "Ticket number must be between 9 and 12 characters!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          {/* Your Name */}
          <Col span={12}>
            <Form.Item
              label="Your Name"
              name="name"
              rules={[{ required: true, message: "Please provide your name!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          {/* Your Contact Number */}
          <Col span={12}>
            <Form.Item
              label="Your Contact Number"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please provide your contact number!",
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          {/* Your Email Address */}
          <Col span={12}>
            <Form.Item
              label="Your Email Address"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please provide your email address!",
                  type: "email",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          {/* Student Name */}
          <Col span={12}>
            <Form.Item
              label="Student Name"
              name="studentName"
              rules={[
                { required: true, message: "Please provide the student name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          {/* Year Level */}
          <Col span={12}>
            <Form.Item
              label="Year Level"
              name="level"
              rules={[
                { required: true, message: "Please select the year level!" },
              ]}
            >
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
        {/* <Form.Item 
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
      </Form.Item> */}

        {/* Causes of Damage */}
        <Form.Item
          label="Tick the appropriate cause/s of the damage from the options below:"
          name="reason"
          rules={[
            {
              required: true,
              message: "Please select at least one cause of the damage!",
            },
          ]}
        >
          <Checkbox.Group>
            <Row>
              <Col span={8}>
                <Checkbox value="Dropped out of locker">
                  Dropped out of locker
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="Liquid spill">Liquid spill</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="Tripped over cord">Tripped over cord</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="Dropped in transit">
                  Dropped in transit
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="Stepped on/kicked/closed lid on object">
                  Stepped on/kicked/closed lid on object
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="Knocked off desk">Knocked off desk</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  value="otherDamage"
                  onChange={(e) => setOtherDataChecked(e?.target?.checked)}
                >
                  Other damage
                </Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Form.Item>

        {/* Other Damages */}
        {otherDataChecked && (
          <Form.Item
            label="Please mention any other damages here:"
            rules={[
              {
                required: true,
                message: "Please mention any other damages here",
              },
            ]}
            name="otherDamages"
          >
            <Input.TextArea
              rows={4}
              onChange={(e) => setOtherDataMessage(e.target.value)}
              value={otherDataMessage}
            />
          </Form.Item>
        )}

        <Row gutter={16}>
        <Col span={12}>
        {/* Date of Incident */}
        <Form.Item
          label="Date of Incident"
          name="incidentDate"
          rules={[
            { required: true, message: "Please select the date of incident!" },
          ]}
        >
          <DatePicker
            onChange={handleDateChange}
            format="DD-MM-YYYY"
            style={{ width: "100%" }}
            placement="topLeft"
          />
        </Form.Item>
        
        </Col>
        </Row>

        {/* Submit Button */}
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
    </>
  );
};

export default RepairInputDetailsForm;
