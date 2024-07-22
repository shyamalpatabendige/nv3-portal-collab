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
import { selectedProductListFunc } from "../../../redux/selectedProductSlice";

const DevicesAccessories = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { enteredSchoolCode } = useSelector((state) => state.general);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchData, setFetchData] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!enteredSchoolCode) {
      navigate("/");
    } else {
      setIsLoading(true);
      fetchDevices(enteredSchoolCode)
        .then((res) => {
          setFetchData(res.data);
          setIsLoading(false);
        })
        .catch(() => navigate("/"))
        .finally(() => setIsCompleted(true));
    }
  }, []);

  const handleSelect = (selectID, deviceName, deviceFeatures, devicePrice) => {
    // dispatch(selectedProductIdFunc(selectID));
    const selectedProduct = fetchData.filter((fData) => fData.id === selectID);
    const accessoriesAvailability = (selectedProduct.map((data) => data.accessories.length));
    // dispatch(selectedProductListFunc(selectedProduct));
    // dispatch(tabActiveKeyFunc("3"));
    if(accessoriesAvailability >= 1) {
        dispatch(selectedProductListFunc(selectedProduct));
        dispatch(tabActiveKeyFunc("3"));
    } else{

      const deviceDetails = {
        deviceName: deviceName,
        deviceFeatures: deviceFeatures,
        devicePrice: devicePrice,
        accessoriesIds: [],
      };
      dispatch(tabActiveKeyFunc("4"));
      dispatch(selectedProductIdFunc(selectID));
      dispatch(deviceDataFunc(deviceDetails));
    }
  };

  return (
    <Spin spinning={isLoading} tip="Getting Devices and Accessories list...">
      <div>
        {fetchData &&
          isCompleted &&
          fetchData.map((data) => {
            return (
              <div>
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
                      <div className="">
                        <h1 className="font-bold text-lg">{data.name}</h1>
                        <div className="rizDivider"></div>
                        <div>
                          <h4 className="font-bold">Key Features</h4>
                          <ul className="list-disc ml-10 leading-6 m-0 pl-8">
                            {data.features.map((featuresData, i) => {
                              return <li key={i} className="ml-6 pl-4">{featuresData}</li>;
                            })}
                            <p className="my-3 ">{data.notes}</p>
                          </ul>
                          <div className="font-bold text-lg flex justify-between">
                            <h1 className="font-bold">
                              {data.linkDescription}
                            </h1>
                            <h2 className="text-novo-blue font-bold">
                              <a
                                href={require(`../../../assets/downloads/${data.link}`)}
                                target="_blank"
                                className="text-novo-blue hover:text-novo-green ml-4"
                              >
                                Download PDF{" "}
                              </a>
                            </h2>
                          </div>

                                { data.name === 'Lenovo ThinkPad L13 Yoga Gen 4' ? (
                                    <div className="font-bold text-lg flex justify-between">
                                      <p className="font-bold">
                                        Lenovo TDM for Accidental Damage Protection
                                      </p>
                                      <h2 className="text-novo-blue font-bold">
                                        <a
                                          href={require(`../../../assets/downloads/TMD_Lenovo_Accidental_Damage_and_Lenovo_Accidental_Damage_with_Theft_Insurance_Final.pdf`)}
                                          target="_blank"
                                          className="text-novo-blue hover:text-novo-green ml-4"
                                        >
                                          Download PDF{" "}
                                        </a>
                                      </h2>
                                    </div>
                                  ):(
                                  <p/>
                                  )}


                          {
                            // <button
                            //   className="font-bold text-lg text-novo-blue pt-36"
                            //   onClick={() => dispatch(tabActiveKeyFunc("1"))}
                            // >
                            //   Back to Devices
                            // </button>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* --------------Grid 02 end-------------------- */}

                  {/* --------------Grid 03 start-------------------- */}
                  <div>
                    <div className="flex justify-center mx-4 flex-col">
                      <div id="fullHeight">
                        <div className=" bg-[#88B24B] w-full min-h-full py-[90px]">
                          <div className="flex justify-center flex-col text-center">
                            <h1 className="text-white font-bold text-3xl">
                              ${data.price}.00
                            </h1>
                            {/* <p className="text-white text-xs pt-6">
                            (includes credit card surcharge)
                          </p> */}
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-center flex-col">
                            <button
                              className="bg-novo-blue text-white p-2"
                              onClick={() =>
                                handleSelect(
                                  data.id,
                                  data.name,
                                  data.features,
                                  data.price
                                )
                              }
                            >
                              CONTINUE
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* --------------Grid 03 end-------------------- */}
                </div>
                {/* --------------G2 start-------------------- */}
                <div className="my-8">
                  {/* --------------G2 Grid 01 start-------------------- */}
                  {/* <div>
                    <div className="grid grid-cols-4">
                      <div></div>

                      <div className="col-span-2">
                        <button
                          className="font-bold text-lg text-novo-blue pt-1"
                          onClick={() => dispatch(tabActiveKeyFunc("1"))}
                        >
                          Back to Devices
                        </button>
                      </div>

                      <div>
                        <div className="flex justify-center mx-4 flex-col">
                          <button
                            className="bg-novo-blue text-white p-2"
                            onClick={() =>
                              handleSelect(
                                data.id,
                                data.name,
                                data.features,
                                data.price
                              )
                            }
                          >
                            CONTINUE
                          </button>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <div className="rizDivider mt-4 mb-4"></div>
                  {/* --------------G2 Grid 03 end-------------------- */}
                </div>
                {/* --------------G2 end-------------------- */}
              </div>
            );
          })}
        <div className="col-span-2">
          <button
            className="font-bold text-lg text-novo-blue m-5"
            onClick={() => dispatch(tabActiveKeyFunc("1"))}
          >
            Back
          </button>
        </div>
      </div>
    </Spin>
  );
};

export default DevicesAccessories;
