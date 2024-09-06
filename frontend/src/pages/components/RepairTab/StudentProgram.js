import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSchoolCode } from "../../manageServices/services";
import { useSelector, useDispatch } from 'react-redux';
import { tabActiveKeyFunc } from "../../../redux/generalSlice";
import { schoolDataFunc } from "../../../redux/orderDetailsSlice";

const StudentProgram = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { enteredSchoolCode } = useSelector(state => state.general);

  const [isLoading, setIsLoading] = useState(false);
  const [fetchData, setFetchData] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if(!enteredSchoolCode){
      navigate("/");
    } else{
      setIsLoading(true);
      fetchSchoolCode(enteredSchoolCode)
      .then((res) => {
        setFetchData(res.data);
        setIsLoading(false);
      })
      .catch(() => navigate("/"))
      .finally(() => setIsCompleted(true))
    }
  }, [])

  const handleButton = () => {
    dispatch(schoolDataFunc(fetchData && fetchData.name));
    dispatch(tabActiveKeyFunc('2'));
  }

  return (
    <div className=" md:flex w-full">
      <div className="md:w-4/12">
        <div className=" flex justify-center">
         {isCompleted && <img src={require(`../../../assets/img/collageLogo/${fetchData.img}`)} className="w-7/12" /> }
        </div>
      </div>
      <div className="md:w-8/12">
        <h1 className="font-bold text-lg pt-4">
          {isLoading && 'Loading ...'}
          {isCompleted && fetchData.banner}
        </h1>
        <div className="rizDivider my-4"></div>
        <p className="leading-8">
          {isCompleted && fetchData.description}
        </p>
        <div className="flex justify-end">
          <button className=" bg-novo-blue px-4 py-2 text-white my-4 justify-end" onClick={handleButton} >
            SELECT DEVICE
          </button>
        </div>
       
      </div>
    </div>
  );
};


export default StudentProgram;
