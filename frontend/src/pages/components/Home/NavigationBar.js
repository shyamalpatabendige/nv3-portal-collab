import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Container, Row, Col } from "react-bootstrap";
import Logo from "../../../assets/img/gitlab-logo-100.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import { tabActiveKeyFunc } from "../../../redux/generalSlice";
import { orderDataFunc } from "../../../redux/orderDetailsSlice";

const NavigationBar = () => {

  const handleSelect = (eventKey) => {
    console.log(`selected ${eventKey}`);
    //window.open("https://www.novo3.com.au/about-us", '_blank');
    if(eventKey === '1') {
      dispatch(tabActiveKeyFunc('1'));
      navigate("/");
  } else if(eventKey === '2') {
        window.open("https://www.novo3.com.au/about-us", '_blank');
    } else if(eventKey === '3'){
      window.open("https://www.novo3.com.au/contact-us/", '_blank');
    }
  };
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleHomeLogo = () =>{
    dispatch(tabActiveKeyFunc('1'));
    dispatch(orderDataFunc({}))
    navigate("/");
  }

  return (
    <Container>
      <Row className="mt-8 mb-8 md:mt-4 md:mb-0">
        <Col xs={4} md={8}>
          <div className="w-28">
              <img src={Logo} className="w-28 cursor-pointer" onClick={handleHomeLogo}/>
          </div>
        </Col>
        <Col md={4} className="d-none d-lg-block" >
          <Nav activeKey="0" onSelect={handleSelect} className="font-bold flex justify-between">
            <Nav.Item>
              <Nav.Link eventKey="1" className="text-novo-green border-b-4 pb-4 border-b-novo-green">
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="2" title="Item" className="text-gray-600" >
                About
              </Nav.Link>
            </Nav.Item>
            {/* <Nav.Item>
              <Nav.Link eventKey="3" className="text-gray-600">
                Products
              </Nav.Link>
            </Nav.Item> */}
            <Nav.Item>
              <Nav.Link eventKey="3" className="text-gray-600">
                Contact
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>

        <Col xs={6} className="d-block d-lg-none pt-2 pr-10">
            <NavDropdown onSelect={handleSelect} title="Menu" id="nav-dropdown" className="flex justify-end">
              <NavDropdown.Item eventKey="1">Home</NavDropdown.Item>
              <NavDropdown.Item eventKey="2">About</NavDropdown.Item>
              <NavDropdown.Item eventKey="3">Contact</NavDropdown.Item>
            </NavDropdown>
            </Col>
      </Row>
    </Container>
  );
};

export default NavigationBar;
