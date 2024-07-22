import { Container, Row, Col, Image } from "react-bootstrap"
import MagazineBG from "../../../assets/img/Bg1.png"
import MagazineLogin from "./MagazineLogin"
import MagazineSchoolCode from "./MagazineSchoolCode"

const HomeMagazine = () => {
  //console.log('Bearer ' + sessionStorage.getItem("U1PGjSQGhPkzyJOz59JAW9bb9LwpMbde"));
  return (
    <div>
    <Image src={MagazineBG} className="hidden md:block absolute z-0 bg-contain w-full"/>
    <Container >
        <Row className=" bg-gradient-to-r from-novo-green to-lime-800">
            <Col md={6} className="px-8 md:px-1 text-white z-10">
                <h1 className="text-gray-800 text-lg font-extrabold pt-4">PARENTS PLEASE START HERE</h1>
                <h1 className="text-white text-3xl font-bold font-sans">WELCOME TO THE NOVO3</h1>
                <h1 className="text-white text-3xl font-sans mt-[-12px]">ONLINE DEVICE ORDERING PORTAL</h1>
                <h3 className="text-gray-800 font-bold text-xs my-[-5px]">PLEASE ADD YOUR SCHOOL CODE TO ACCESS YOUR SPECIFIC DEVICES</h3>
                <MagazineSchoolCode />
                <h4 className=" text-white leading-4 text-xs pb-3">Please contact the novo3 team at hello@novo3.com.au<br></br> if you have any questions regarding this device purchasing portal.</h4>
            </Col>
            <Col md={6} className="z-10">
                <div className="pb-2 sm:pb-1">
                    <MagazineLogin />
                </div>
            </Col>
        </Row>
    </Container>
    </div>
  )
}

export default HomeMagazine