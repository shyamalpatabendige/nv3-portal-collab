import { Container, Row, Col, Image } from "react-bootstrap";
import Logo from "../../assets/img/gitlab-logo-100.png";
import { RiMailSendLine, RiPhoneLine, RiMapPin2Line, RiArrowRightSLine } from "react-icons/ri";
import SocialConnect from "./SocialConnect";
import { ListGroup } from "react-bootstrap";

const FooterArea = () => {
  return (
    <div className="z-30 bottom-0 bg-black ">
      <Container>
        <Row className="p-4">
          <Col md={3} className="p-4 z-30 flex justify-center md:block">
            <Image src={Logo} className="w-32" />
            {/* { <p className="pt-4 text-gray-300 text-sm">
              If you are the parent or guardian of a student in a participating
              Novo3 device program school, this portal gives you access to
            </p>} */}
          </Col>

          <Col md={3}>
            <div className="flex justify-center md:block">
              <div className="flex flex-col">
                <div className="flex justify-center md:justify-start">
                  <RiMailSendLine className="text-novo-green text-2xl" />{" "}
                  <p className="text-gray-300 px-2">hello@novo3.com.au</p>
                </div>
                <div className="flex my-1 justify-center md:justify-start">
                  <RiPhoneLine className="text-novo-green text-2xl" />{" "}
                  <p className="text-gray-300 px-2">Call Us: 1300 010 140</p>
                </div>
                <div className="flex justify-center md:justify-start">
                  <RiMapPin2Line className="text-novo-green text-2xl" />{" "}
                  <p className="text-start  md:text-start text-gray-300 px-2 ">
                    Suite 213, 12 Corporate Drive,<br></br> Heatherton, VIC 3202
                  </p>
                </div>
              </div>
            </div>
          </Col>

          <Col md={3}>
            <div className="text-gray-300 flex justify-center md:block">
              <h1 className="font-bold text-gray-300">Useful Links</h1>
              <ul className="list-disc pt-2">
                <li className="flex"><RiArrowRightSLine className="font-xl m-1 cursor-pointer"/> <a href="https://www.novo3.com.au/contact-us/" target="_blank" className="text-gray-300 hover:text-novo-green"> Contact Us </a> </li>
                <li className="flex"><RiArrowRightSLine className="font-xl m-1"/> <a href="https://www.novo3.com.au/terms-conditions/" target="_blank" className="text-gray-300 hover:text-novo-green"> Terms & Conditions </a></li>
                <li className="flex"><RiArrowRightSLine className="font-xl m-1"/> <a href="https://www.novo3.com.au/privacy-policy/" target="_blank" className="text-gray-300 hover:text-novo-green"> Privacy Policy </a></li>
              </ul>
            </div>
          </Col>

          <Col md={3}>
            <div className="flex justify-center md:block">
              <div>
                <h2 className="text-gray-300">Connect with Us</h2>
                <div className="flex justify-center md:block">
                  <SocialConnect />
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
          <div className="flex justify-left text-gray-300">
            <p className="my-1 mx-10">Copyright © 2022 Novo3 Pty Ltd.</p>
          </div></Col>
        </Row>
      </Container>
    </div>
  );
};

export default FooterArea;
