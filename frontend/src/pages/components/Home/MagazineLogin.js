import LoginNovo from "./LoginNovo";
import LogoutNovo from "./LogoutNovo";

const MagazineLogin = () => {

  return (
    <div className="bg-white bg-opacity-50 p-3 md:w-10/12 mt-4">
        {!sessionStorage.getItem("U1PGjSQGhPkzyJOz59JAW9bb9LwpMbde") ? <LoginNovo /> : <LogoutNovo />}
    </div>
  );
};

export default MagazineLogin;
