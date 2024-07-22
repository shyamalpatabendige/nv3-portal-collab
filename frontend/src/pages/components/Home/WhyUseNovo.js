import { Container, Row, Col, Image } from "react-bootstrap";
import blueImage from "../../../assets/img/Bg2.png";

const WhyUseNovo = () => {
  return (
    <div>
      <Image
        src={blueImage}
        className="hidden md:block absolute z-0 w-full h-[440px] min-h-[200px] object-cover bg-gradient-to-r from-white to-gray-200"
      />
      <Container className="pt-4">
        <Row>
          <Col md={8} className="z-20">
            <div>
              <div>
                <h1 className="font-bold text-xl text-novo-blue">
                  WHY USE THE NOVO3 ONLINE ORDERING SYSTEM?
                </h1>
                <h3 className="text-gray-500 mb-2 font-bold">
                  If you are the parent or guardian of a student in a
                  participating Novo3 device program <br></br>school, this
                  portal gives you access to:
                </h3>
                <ul className="text-gray-500 font-sans">
                  <li>
                    Device bundles selected and approved for use by your school{" "}
                  </li>
                  <li>Special school student education pricing </li>
                  <li>Compatible accessories and peripherals </li>
                  <li>
                    Options for extended warranties and accidental damage
                    protection
                  </li>
                </ul>
                <p className="mt-2 text-gray-500">
                  These special offers are available to you EXCLUSIVELY ONLINE
                </p>

                <h1 className="text-novo-blue font-bold text-xl mt-7 mb-2">
                  NOTE:
                </h1>
                <p>
                  <p className="text-gray-500">
                    Due to global conditions, there are some delays in the
                    <br></br>
                    production and shipment of devices across all manufacturers.
                    <br></br>
                    Novo3 is working closely with the vendors to ensure clear
                    <br></br>
                    communication of accurate ETAs with schools and parents.
                    <br></br>
                    Expected delivery dates or delays to shipping will be
                    <br></br>
                    communicated via the email address provided during the
                    online purchase process.
                  </p>
                </p>
              </div>
            </div>
          </Col>

          <Col md={4}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default WhyUseNovo;
