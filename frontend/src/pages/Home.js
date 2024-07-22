import InfoBar from "./components/Home/InfoBar"
import NavigationBar from "./components/Home/NavigationBar"
import HomeMagazine from "./components/Home/HomeMagazine"
import WhyUseNovo from "./components/Home/WhyUseNovo"
import FooterArea from "./components/FooterArea"


const Home = () => {
  return (
    <>
        <InfoBar />
        <NavigationBar />
        <HomeMagazine />
        <WhyUseNovo />
        <FooterArea />
    </>
  )
}

export default Home