import axios from "axios";

let getToken = () => "Bearer " + sessionStorage.getItem("U1PGjSQGhPkzyJOz59JAW9bb9LwpMbde");
const baseURL = process.env.REACT_APP_API_BASE_URL;

const fetchSchoolCode = async (schoolId) => {
  return await axios({
    method: "get",
    url: baseURL + "/api/school/" + schoolId,
  });
};

const fetchDevices = async (schoolId) => {
  return await axios({
    method: "get",
    url: baseURL + "/api/product/" + schoolId,
  });
};

const novoLogin = async (username, password) => {
  return await axios({
    method: "post",
    url: baseURL + "/user/login",
    headers: {},
    data: {
      username: username,
      password: password,
    },
  });
};

const novoRegister = async (
  username,
  confirmEmail,
  password,
  confirmPassword
) => {
  return await axios({
    method: "post",
    url: baseURL + "/user/register",
    headers: {},
    data: {
      username: username,
      confirmEmail: confirmEmail,
      password: password,
      confirmPassword: confirmPassword,
    },
  });
};

const novoSubmitOrder = async (
  pfirstName,
  plastName,
  paddress1,
  paddress2,
  psuburb,
  pstate,
  ppostcode,
  pemail,
  pcontactNumber,
  sfirstName,
  spreferredName,
  slastName,
  sid,
  slevel,
  productIds,
  schoolCode,
  accessoriesIds
) => {
  return await axios({
    method: "post",
    url: baseURL + "/api/order",
    headers: {
      Authorization: getToken(),
    },
    data: {
      "parent": {
        "firstName": pfirstName,
        "lastName": plastName,
        "address": {
          "address1": paddress1,
          "address2": paddress2,
          "suburb": psuburb,
          "state": pstate,
          "postcode": ppostcode,
        },
        "email": pemail,
        "contactNumber": pcontactNumber,
      },
      "student": {
        "firstName": sfirstName,
        "preferredName": spreferredName,
        "lastName": slastName,
        "id": sid,
        "level": slevel,
      },
      "productIds": productIds,
      "accessoryIds": (accessoriesIds.length >= 1 ? accessoriesIds.map(ids => ids.id.toString()) : []),
      "school" :{
        "code": schoolCode,
    },
    },
  });
};

const getUniqueOrderDetails = async (orderID) => {
  return await axios({
    method: "get",
    url: baseURL + "/api/order/" + orderID,
    headers: {
      Authorization: getToken(),
    },
  });
};

const getAllProduct = async () => {
  return await axios({
    method: "get",
    url: baseURL + "/api/order/",
    headers: {
      Authorization: getToken(),
    },
  });
};

const repairOrderSubmit = async (data) => {
  return await axios({
    method: "POST",
    url: baseURL + "/api/repair/ticket",
    headers: {
      Authorization: getToken(),
    },
    body: data
  });
};

export {
  fetchSchoolCode,
  fetchDevices,
  novoLogin,
  novoRegister,
  novoSubmitOrder,
  getUniqueOrderDetails,
  getAllProduct,
  repairOrderSubmit
};
