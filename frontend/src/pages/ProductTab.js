import FooterArea from "./components/FooterArea";
import InfoBar from "./components/Home/InfoBar";
import NavigationBar from "./components/Home/NavigationBar";
import ProductArea from "./components/ProductTab/ProductArea";

const ProductTab = () => {
  return (
    <div>
      <div className="min-h-[90vh]">
        <InfoBar />
        <NavigationBar />
        <ProductArea />
      </div>
      <div className="min-h-[10vh]">
        <FooterArea />
      </div>
    </div>
  );
};

export default ProductTab;
