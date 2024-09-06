import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductTab from "./pages/ProductTab";
import Home from "./pages/Home";
import OrderSubmitted from "./pages/OrderSubmitted";
import OrdersList from "./pages/OrdersList";
import RepairTab from "./pages/RepairTab";

const ReactRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductTab />} />
            <Route path="/repair" element={<RepairTab />} />
            <Route path="/orderSubmitted" element={<OrderSubmitted />} />
            <Route path="/ordersList" element={<OrdersList />} />
            <Route path="*" element={"Page not found"} />
            <Route exact path="/test" element={"testing page"} />
        </Routes>
    </BrowserRouter>
  )
}

export default ReactRouter