import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <Container>
        <Row className="footer-row">
          <Col>
            <h5>Contact Us</h5>
            <div className="social-icons">
              <a
                href="https://www.facebook.com/people/JustFit-%D8%A7%D9%84%D8%BA%D8%B0%D8%A7%D8%A1-%D8%A7%D9%84%D8%B5%D8%AD%D9%8A/100054561604030/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.facebook.com/people/JustFit-%D8%A7%D9%84%D8%BA%D8%B0%D8%A7%D8%A1-%D8%A7%D9%84%D8%B5%D8%AD%D9%8A/100054561604030/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp />
              </a>
            </div>
          </Col>
          <Col className="address-col">
            <h5>Address</h5>
            <p>Benghazi-Libya | 092222222</p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-3">
            <p>JustFit &copy; {currentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
