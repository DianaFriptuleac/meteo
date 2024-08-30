import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DaAggiornare = () => {
  const navigate = useNavigate();  //un hook che ci riporta alla pagina
  return (
    <Container>
      <Row className="justify-content-center my-5 text-light" >
        <Col xs={12} md={6}>
          <h2>Ci dispiace</h2>
          <p>
            La pagina non é stata ancora aggiornata.
          </p>
          <p>
            Rriprova più tardi.
          </p>
          <Button
            variant="info"
            onClick={() => {
              navigate("/"); //riporta a homepage
            }}
          >
            TORNA IN HOMEPAGE
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default DaAggiornare;