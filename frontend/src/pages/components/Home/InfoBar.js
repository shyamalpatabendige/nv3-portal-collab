import {
  RiMailSendLine,
  RiPhoneLine,
  RiMapPin2Line,
} from "react-icons/ri";

import SocialConnect from "../SocialConnect"

const InfoBar = () => {
  return (
    <div className="hidden bg-[#F4F4F4] md:flex justify-center pt-1">
      <div className="w-10/12 flex flex-wrap justify-center md:justify-between">
        <div className="text-novo-green flex">
            
          <div className="flex pt-1">
            <RiMailSendLine className=" text-2xl pr-1" />
            <p className="text-gray-400 text-xs pt-1">hello@novo3.com.au</p>
          </div>

          <div className="flex pt-1 mx-6">
            <RiPhoneLine className=" text-2xl pr-1" />
            <p className="text-gray-400 text-xs pt-1"> Call Us: 1300 010 140</p>
          </div>

          <div className="flex pt-1">
            <RiMapPin2Line className=" text-2xl pr-1 " />
            <p className="text-gray-400 text-xs pt-1"> Suite 213, 12 Corporate Drive, Heatherton, VIC 3202</p>
          </div>
        </div>
          <SocialConnect />
      </div>
    </div>
  );
};

export default InfoBar;
