import { Col, Container, Row } from "react-bootstrap"

const MyFooter = () => {
  return (
    <Container fluid className="myFooter">
      <Row className="justify-content-center align-items-center text-center">
        <Col  className="text-secondary my-2">
          <div className="media-icon">
            <i className="bi bi-facebook footer-icon me-2"></i>
            <i className="bi bi-instagram footer-icon me-2"></i>
            <i className="bi bi-twitter-x footer-icon me-2"></i>
            <i className="bi bi-youtube footer-icon"></i>
          </div>
          <p className="mb-0">Privacy</p>
          <p className="mb-0">Contact Us</p>
          <p className="mb-0">MyMeteo Copyright 2024 MyMeteo </p>
        </Col>
      </Row>
    </Container>
  )
}

export default MyFooter
