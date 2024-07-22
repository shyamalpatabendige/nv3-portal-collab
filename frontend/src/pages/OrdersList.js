
import { Container, Row, Col } from "react-bootstrap";
import FooterArea from "./components/FooterArea";
import InfoBar from "./components/Home/InfoBar";
import NavigationBar from "./components/Home/NavigationBar";
import { Tabs } from "antd";
import OrderHistory from "./components/OrdersList.js/OrderHistory";

const OrdersList = () => {
    const { TabPane } = Tabs;

    const onChange = () => {
       
    }

  return (
    <div>
      <InfoBar />
      <NavigationBar />
      <Container className="min-h-screen">
        <Row>
          <Col>

    <h1 className="font-bold text-xl pt-4">My Account</h1>
    <div className="rizDivider my-4"></div>

            <Tabs
              onChange={onChange}
      
              defaultActiveKey="1"
        
             >
              <TabPane tab="Order History" key="1">
                <OrderHistory />
              </TabPane>
              {/* <TabPane tab="Account Settings" key="2">
                hi
              </TabPane>
              <TabPane tab="Warranty and Insurance" key="3">
                hi
              </TabPane>
              <TabPane tab="Logout" key="4">
                hi
              </TabPane> */}
            </Tabs>
            
          </Col>
        </Row>
      </Container>
      <FooterArea />
    </div>
  );
};

export default OrdersList;
