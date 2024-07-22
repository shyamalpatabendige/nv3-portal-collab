import { RiTruckLine, RiLogoutBoxRLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const LogoutNovo = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("U1PGjSQGhPkzyJOz59JAW9bb9LwpMbde");
    sessionStorage.removeItem("U1PGjSQGhPkzyEmail");
    sessionStorage.clear();
    navigate("/");
    window.location.reload(false);
  };

  return (
    <div>
      <h1 className="text-lg font-bold pt-2">Check Your Order History,</h1>
      <div className="flex py-2">
        <p>You are currently login as</p>
        <p className="px-1 font-bold">{sessionStorage.getItem("U1PGjSQGhPkzyEmail")}</p>
      </div>
      <div className="flex justify-between">
        <button
          className="bg-gray-600 p-2 text-white flex"
          onClick={handleLogout}
        >
          <RiLogoutBoxRLine className="text-2xl px-1" /> Logout
        </button>
        <button className="bg-novo-green p-2 text-white flex" onClick={() => navigate("/orderslist")}>
          Track your orders <RiTruckLine className="text-2xl px-1" />
        </button>
      </div>
    </div>
  );
};

export default LogoutNovo;
