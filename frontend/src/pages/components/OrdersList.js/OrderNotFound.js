import OrderNFImage from "../../../assets/img/orderNotFound.svg";
import { Link } from "react-router-dom";

const OrderNotFound = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col">
        <div className="text-center">
          <h2 className="font-bold text-xl pt-8">We Apologise</h2>
          <h3 className="text-base">No Orders Found</h3>
        </div>
        <img src={OrderNFImage} className="w-80" />
        <Link to="/" className="flex justify-center">
          <button className="font-bold text-base text-novo-blue text-center py-4">
            {"< RETURN HOME"}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OrderNotFound;
