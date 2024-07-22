import { Form, Input } from "antd";
import { novoSubmitOrder } from "../../../manageServices/services";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { tabActiveKeyFunc } from "../../../../redux/generalSlice";
import { orderDataFunc } from "../../../../redux/orderDetailsSlice";

const ParentStudentDetails = () => {
  const dispatch = useDispatch();
  const { selectedProductId } = useSelector(state => state.general);
  const { orderData, schoolData, deviceData } = useSelector(
    (state) => state.orderDetails
  );

  const [isInvalid, setIsInvalid] = useState('');
  const onFinish = (values) => {
    const submittedData = {
          pfirstName: values.pfirstName,
          psurname: values.psurname,
          paddressLineOne: values.paddressLineOne,
          paddressLineTwo: values.paddressLineTwo,
          psuburb: values.psuburb,
          pstate: values.pstate,
          ppostcode: values.ppostcode,
          pemail: values.pemail,
          pcontactNumber: values.pcontactNumber,
          stuFirstName: values.stuFirstName,
          stuPreferredName: values.stuPreferredName,
          stuSurname: values.stuSurname,
          studentID: values.studentID,
          studentYearLevel: values.studentYearLevel,
          selectedProductId: [selectedProductId.toString()],
          selectedAccessories: [...deviceData.accessoriesIds?? '']
    }
    dispatch(orderDataFunc(submittedData));
    dispatch(tabActiveKeyFunc('5'));
  };
  //selectedProductId
  const [form] = Form.useForm();

  const exitingOrderData = () => {
      return JSON.stringify(orderData) === '{}' ? {} : ({
        pfirstName: orderData.pfirstName,
        psurname: orderData.psurname,
        paddressLineOne: orderData.paddressLineOne,
        paddressLineTwo: orderData.paddressLineTwo,
        psuburb: orderData.psuburb,
        pstate: orderData.pstate,
        ppostcode: orderData.ppostcode,
        pemail: orderData.pemail,
        pcontactNumber: orderData.pcontactNumber,
        stuFirstName: orderData.stuFirstName,
        stuPreferredName: orderData.stuPreferredName,
        stuSurname: orderData.stuSurname,
        studentID: orderData.studentID,
        studentYearLevel: orderData.studentYearLevel,
  })
  }

  return (
    <Form
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={exitingOrderData()}
      scrollToFirstError
      layout="vertical"
    >
      <div className="w-full block md:flex">
        <div className="w-12/12 md:w-6/12">
          <h1 className="font-bold text-xl">Parent/Guardian Details</h1>
          <div className="rizDivider"></div>

          <div className="flex">
            <div className="w-6/12">
              <Form.Item
                name="pfirstName"
                label="First Name"
                rules={[
                  {
                    required: true,
                    message: "Please input your First Name",
                  },
                  {
                    pattern: new RegExp("^[a-z,A-Z ]*$"),
                    message: "Please input valid First Name",
                  },
                ]}
                className="px-2"
              >
                <Input />
              </Form.Item>
            </div>

            <div className="w-6/12">
              <Form.Item
                name="psurname"
                label="Surname"
                rules={[
                  {
                    required: true,
                    message: "Please input your Last Name",
                  },
                  {
                    pattern: new RegExp("^[a-z,A-Z ]*$"),
                    message: "Please input valid Surname",
                  },
                ]}
                className="px-2"
              >
                <Input />
              </Form.Item>
            </div>
          </div>

          {/* -------------------------------------------Line Two-------------------------------------- */}

          <div className="flex">
            <div className="w-6/12">
              <Form.Item
                name="paddressLineOne"
                label="Address"
                rules={[
                  {
                    required: true,
                    message: "Please input your Address first line",
                  },
                ]}
                className="px-2"
              >
                <Input placeholder="Address line 1" />
              </Form.Item>
            </div>

            <div className="w-6/12">
              <Form.Item name="paddressLineTwo" label={" "} className="px-2">
                <Input placeholder="Address line 2" />
              </Form.Item>
            </div>
          </div>

          <div className="w-full flex">
            <div className="w-4/12">
              <Form.Item name="psuburb" label={"Suburb"} rules={[
                  {
                    required: true,
                    message: "Please input Suburb",
                  }]}
                  className="px-2">
                <Input />
              </Form.Item>
            </div>
            <div className="w-4/12">
              <Form.Item name="pstate" label={"State"} rules={[
                  {
                    required: true,
                    message: "Please input your state",
                  }]} className="px-2">
                <Input />
              </Form.Item>
            </div>
            <div className="w-4/12">
              <Form.Item name="ppostcode" label={"Postcode"} rules={[
                  {
                    required: true,
                    message: "Please input the postal code",
                  }]} className="px-2">
                <Input />
              </Form.Item>
            </div>
          </div>

          <Form.Item
            name="pemail"
            label={"Email"}
            className="px-2"
            rules={[
              {
                required: true,
                message: "Please input your Email Address",
              },
              {
                type: "email",
                message: "Please Enter Valid Email Address",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="pcontactNumber"
            label={"Contact Number"}
            className="px-2"
            rules={[
              {
                required: true,
                message: "Please input your contact number",
              },
              {
                pattern: new RegExp("^[0-9,*+]*$"),
                message: "Please input valid contact number",
              },
              {
                min: 9,
                message: "Contact number should be 9-12 digits in length"
              },
              {
                max: 12,
                message: "Contact number should be 9-12 digits in length"
              }
            ]}
          >
            <Input />
          </Form.Item>
        </div>

        <div className="hidden md:flex justify-center m-2">
          <div className="w-0.5 bg-gray-200 h-full"> </div>
        </div>
        <div className="w-12/12 md:w-6/12">
          <h1 className="font-bold text-xl">Student Details</h1>
          <div className="rizDivider"></div>
          <Form.Item
            name="stuFirstName"
            label="First Name"
            rules={[
              {
                required: true,
                message: "Please input Student First Name",
              },
              {
                pattern: new RegExp("^[a-z,A-Z ]*$"),
                message: "Please input valid Student Name",
              },
            ]}
            className="px-2"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="stuPreferredName"
            label="Preferred Name"
            rules={[
              {
                required: true,
                message: "Please input Preferred Name",
              },
              {
                pattern: new RegExp("^[a-z,A-Z ]*$"),
                message: "Please input valid Preferred Name",
              },
            ]}
            className="px-2"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="stuSurname"
            label="Surname"
            rules={[
              {
                required: true,
                message: "Please input Student's Surname",
              },
              {
                pattern: new RegExp("^[a-z,A-Z ]*$"),
                message: "Please input valid Surname",
              },
            ]}
            className="px-2"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="studentID"
            label="Student ID"
            className="px-2"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="studentYearLevel"
            label="Student Year Level in 2024"
            rules={[
              {
                required: true,
                message: "Please input Student Year Level",
              },
            ]}
            className="px-2"
          >
            <Input placeholder="Ex: Year 8"/>
          </Form.Item>
        </div>
      </div>
      <div className="flex justify-between m-8">
        <button type="button" className="text-lg font-bold text-novo-blue" onClick={() => dispatch(tabActiveKeyFunc('2'))}>Back to Devices</button>
        {/* { isInvalid && <p className="text-red-500 text-base">{JSON.stringify(isInvalid)}</p>} */}
        <button type="submit" className="px-4 py-1 bg-novo-blue text-white">
          Review the order
        </button>
      </div>
    </Form>
  );
};

export default ParentStudentDetails;
