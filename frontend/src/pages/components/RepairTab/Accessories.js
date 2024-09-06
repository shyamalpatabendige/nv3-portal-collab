import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDevices } from "../../manageServices/services";
import { useSelector, useDispatch } from "react-redux";
import { Spin } from "antd";
import {
  selectedProductIdFunc,
  tabActiveKeyFunc,
} from "../../../redux/generalSlice";
import { deviceDataFunc } from "../../../redux/orderDetailsSlice";

const Accessories = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { enteredSchoolCode } = useSelector((state) => state.general);
  const { selectedProductList } = useSelector((state) => state.selectedProduct);

  const [selectedAccessoriesList, setSelectedAccessories] = useState([]);

  useEffect(() => {
    if (!enteredSchoolCode) {
      navigate("/");
    } else {
    }
  }, []);

  const handleSelect = () => {
    const deviceDetails = {
      deviceName: selectedProductList[0].name,
      deviceFeatures: selectedProductList[0].features,
      devicePrice: selectedProductList[0].price,
      accessoriesIds: [...(selectedAccessoriesList ?? "")],
    };
    dispatch(tabActiveKeyFunc("4"));
    dispatch(selectedProductIdFunc(selectedProductList[0].id));
    dispatch(deviceDataFunc(deviceDetails));
  };

  const accessoriesManager = (fullData) => {
    let selectedId = [...selectedAccessoriesList];
    const findId = () => selectedId.filter((data) => data.id === fullData.id);
    const removeId = () => selectedId.filter((data) => data.id !== fullData.id);
    const addId = () => {
      selectedId.push(fullData);
      return selectedId;
    };
    const func = findId().length >= 1 ? removeId() : addId();
    setSelectedAccessories(func);
  };

  const isAdded = (id) => {
    let selectedId = [...selectedAccessoriesList];
    const findId = selectedId.filter((data) => data.id === id);
    return findId.length >= 1 ? "Remove" : "Add";
  };

  return (
    <Spin
      spinning={!selectedProductList}
      tip="Getting Devices and Accessories list..."
    >
      <div>
        {selectedProductList &&
          selectedProductList.map((data, i) => {
            return (
              <>
                <div key={i}>
                  <div className="grid grid-cols-4">
                    {/* --------------Grid 01 start-------------------- */}
                    <div>
                      <div className="flex justify-center">
                        {
                          <img
                            src={require(`../../../assets/img/deviceImages/${data.img}`)}
                            alt="Device"
                            className="w-10/12"
                          />
                        }
                      </div>
                    </div>

                    {/* --------------Grid 01 end-------------------- */}

                    {/* --------------Grid 02 start-------------------- */}
                    <div className="col-span-2">
                      <div className="flex justify-center">
                        <div className="flex justify-start">
                          <div>
                            <h1 className="font-bold text-lg">{data.name}</h1>
                            <div className="rizDivider"></div>
                            <div>
                              <h4 className="font-bold">Key Features</h4>
                              <ul className="list-disc ml-10 leading-6 m-0 pl-8">
                                {data.features.map((featuresData, i) => {
                                  return (
                                    <li key={i} className="pl-4">
                                      {featuresData}
                                    </li>
                                  );
                                })}

                                <p className="my-3 ">{data.notes}</p>
                              </ul>
                              <div className="font-bold text-lg flex justify-between">
                                <h1 className="font-bold">
                                  {data.linkDescription}
                                </h1>
                                <h2 className="text-novo-blue font-bold absolute right-80">
                                  <a
                                    href={require(`../../../assets/downloads/${data.link}`)}
                                    target="_blank"
                                    className="text-novo-blue hover:text-novo-green px-4"
                                  >
                                    Download PDF{" "}
                                  </a>
                                </h2>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* --------------Grid 02 end-------------------- */}

                    {/* --------------Grid 03 start-------------------- */}
                    <div>
                      <div className="flex justify-center mx-4 flex-col">
                        <div>
                          <div className=" bg-[#88B24B] w-full">
                            <div className="flex justify-center flex-col text-center">
                              <h1 className="text-white font-bold text-3xl py-20">
                                ${data.price}.00
                              </h1>
                              {/* <p className="text-white text-xs pt-6">
                            (includes credit card surcharge)
                          </p> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* --------------Grid 03 end-------------------- */}
                  </div>
                  {/* --------------G2 start-------------------- */}
                  <div className="my-8">
                    <div className="rizDivider mt-4 mb-4"></div>
                    {/* --------------G2 Grid 03 end-------------------- */}
                  </div>
                  {/* --------------G2 end-------------------- */}
                </div>
                {/* --------------------------------------------------- Accessories area ------------------------------------------------ */}
                {data.accessories &&
                  data.accessories.map((accessories, i) => {
                    return (
                      <div key={i}>
                        <div className="grid grid-cols-4">
                          {/* --------------Grid 01 start-------------------- */}
                          <div>
                            <div className="flex justify-center">
                              {
                                <img
                                  src={require(`../../../assets/img/accessoriesImages/${accessories.img}`)}
                                  alt="Device"
                                  className="w-10/12"
                                />
                              }
                            </div>
                          </div>

                          {/* --------------Grid 01 end-------------------- */}

                          {/* --------------Grid 02 start-------------------- */}
                          <div className="col-span-2">
                            <div className="flex justify-center pr-12">
                              <div className="flex justify-end">
                                <div>
                                  <h1 className="font-bold text-lg">
                                    {accessories.shortDescription}
                                  </h1>
                                  <div className="rizDivider"></div>
                                  <div>
                                    <h4 className="font-bold">
                                      {accessories.name}
                                    </h4>
                                    <ul className="list-disc ml-10 leading-6 m-0 pl-8">
                                      {accessories.features.map(
                                        (featuresData, i) => {
                                          return (
                                            // <li key={i} className="pl-4">
                                            //    {danger}
                                            // </li>
                                            <li
                                              key={i}
                                              className="pl-4"
                                              dangerouslySetInnerHTML={{
                                                __html: featuresData,
                                              }}
                                            ></li>
                                          );
                                        }
                                      )}
                                    </ul>
                                    {/* <p className="my-3 ">{data.notes}</p> */}
                                    {/* <div className="font-bold text-md flex justify-between">
                                      <h1 className="font-bold">
                                        {accessories.linkDescription}
                                      </h1>
                                    </div> */}

                                    <div className="font-bold flex justify-between pt-3">
                                      <h1 className="font-bold text-md w-72">
                                        {accessories.linkDescription}
                                      </h1>
                                      <h2 className="text-novo-blue font-bold absolute right-80 text-lg">
                                        <a
                                          href={require(`../../../assets/downloads/${accessories.link}`)}
                                          target="_blank"
                                          className="text-novo-blue hover:text-novo-green px-4"
                                        >
                                          Download PDF{" "}
                                        </a>
                                      </h2>
                                    </div>

                                    {/*-------------------------- NEW ----------------------------------*/}
                                    <div className="font-bold flex justify-between pt-3">
                                    <h1 className="text-md w-72">
                                      Is this insurance product appropriate for you? <b>Access the Chubb TMD via the provided link.</b>
                                    </h1>
                                      <h2 className="text-novo-blue font-bold absolute right-80 text-lg">
                                        <a
                                          href={require('../../../assets/downloads/chubb-education-equipment-insurance-policy-studentcomm-tmd.pdf')}
                                          target="_blank"
                                          className="text-novo-blue hover:text-novo-green px-4"
                                        >
                                          Download PDF{" "}
                                        </a>
                                      </h2>
                                    </div>

                                    <div className="font-bold flex justify-between pt-3">
                                      <h1 className="text-md w-72">
                                        <b>Deferred sales Model Legislation for insurance -</b> access prescribed Customer Information via link
                                      </h1>
                                      <h2 className="text-novo-blue font-bold absolute right-80 text-lg">
                                        <a
                                          href={require('../../../assets/downloads/deferred-sales-model-legislation-information-for-add-on-insurance.pdf')}
                                          target="_blank"
                                          className="text-novo-blue hover:text-novo-green px-4"
                                        >
                                          Download PDF{" "}
                                        </a>
                                      </h2>
                                    </div>
                                    {/*---------------------------------------------------------------------*/}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* --------------Grid 02 end-------------------- */}

                          {/* --------------Grid 03 start-------------------- */}
                          <div>
                            <div className="flex justify-center mx-4 flex-col">
                              <div>
                                <div className=" bg-[#88B24B] w-full h-58">
                                  <div className="flex justify-center flex-col text-center">
                                    <h1 className="text-white font-bold text-3xl pt-12">
                                      ${accessories.price}.00
                                    </h1>
                                    <p className="text-white text-xs">
                                      {/* (includes credit card surcharge) */}
                                    </p>
                                  </div>
                                  <div className="flex justify-center p-2 ">
                                    {/* <button
                                      className={`${
                                        isAdded(accessories.id) === "Add"
                                          ? "bg-novo-blue"
                                          : "bg-gray-800"
                                      } text-white p-2 w-40 transition-all`}
                                      onClick={() =>
                                        accessoriesManager(accessories)
                                      }
                                    >
                                      {isAdded(accessories.id)}
                                    </button> */}
                                    <div className="bg-novo-blue flex justify-center flex-col text-center">
                                    <p className="text-white text-xs p-1">
                                      {'Insurance can only be added 5 days after the device is ordered. An email link to ADD/PURCHASE the optional insurance will be sent 5 days after ordering the device'}
                                    </p>
                                    </div>
                                  </div>
                                </div>
                                <div></div>
                              </div>
                            </div>
                          </div>
                          {/* --------------Grid 03 end-------------------- */}
                        </div>
                        {/* --------------G2 start-------------------- */}
                        <div className="my-8">
                          <div className="rizDivider mt-4 mb-4"></div>
                          {/* --------------G2 Grid 03 end-------------------- */}
                        </div>
                      </div>
                    );
                  })}
              </>
            );
          })}
        {/* --------------G2 end-------------------- */}
        <div className="col-span-2">
          <div className="flex justify-between">
            <button
              className="font-bold text-lg text-novo-blue mx-5 mb-5"
              onClick={() => dispatch(tabActiveKeyFunc("2"))}
            >
              Back to Devices
            </button>

            <button
              className="bg-novo-blue text-white p-2 h-10 w-2/12 mx-5 mb-5"
              onClick={() => handleSelect()}
            >
              CONTINUE
            </button>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Accessories;
