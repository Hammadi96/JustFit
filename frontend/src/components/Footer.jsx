import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            <h6>تواصل معنا</h6>
            <p>ايميل: info@JUSTFIT.com</p>
            <p>واتساب: 0922222222</p>
          </Col>
          <Col className="text-center py-3">
            <h6>العنوان</h6>
            <p>بنغازي - ليبيا</p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-3">
            <p>JUSTFIT &copy; {currentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
