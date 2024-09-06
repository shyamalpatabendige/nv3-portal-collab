import { useSelector } from "react-redux";
import FooterArea from "./components/FooterArea";
import InfoBar from "./components/Home/InfoBar";
import NavigationBar from "./components/Home/NavigationBar";
import ProductArea from "./components/ProductTab/ProductArea";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RepairArea from "./components/RepairTab/RepairArea";


const RepairTab = () => {

  const navigate = useNavigate();
  const { isRepair } = useSelector(state => state.repair);

  useEffect(() => {
    if(!isRepair) {
      navigate("/")
    }
  }, [])
 
  return (
    <div>
      <div className="min-h-[90vh]">
        <InfoBar />
        <NavigationBar />
        <RepairArea />
      </div>
      <div className="min-h-[10vh]">
        <FooterArea />
      </div>
    </div>
  );
};

export default RepairTab;
