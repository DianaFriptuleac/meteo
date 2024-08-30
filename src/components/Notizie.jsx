import { Card, Col, Container, Row } from "react-bootstrap";

const Notizie = () => {
  return (
    <Container>
      <Row className="justify-content-center my-3 g-3">
        <Col sm={12} md={6}>
          <Card>
            <Card.Img
              className="h-50"
              variant="top"
              src="https://www.meteoweb.eu/wp-content/uploads/2024/08/allerta-meteo-oggi-30-agosto-2024.jpg.webp"
            ></Card.Img>
            <Card.Body>
              <Card.Title className="text-center">
                {" "}
                Allerta Meteo: nuovo round di forti temporali e grandinate nel
                pomeriggio, ecco dove
              </Card.Title>
              <Card.Text>
                {" "}
                <strong>Nuova Allerta Meteo</strong> per temporali pomeridiani
                con piogge intense e grandinate. In considerazione della
                situazione, il servizio PRETEMP - gruppo di lavoro che si pone
                l'obiettivo di studiare e prevedere i fenomeni temporaleschi
                severi sul territorio italiano ha pubblicato un nuovo bollettino
                di previsioni probabilistiche. Di seguito tutti i dettagli e la
                mappa con le aree a rischio.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={6}>
          <Card>
            <Card.Img
              className="h-50"
              variant="top"
              src="https://www.meteoweb.eu/wp-content/uploads/2024/08/maltempo-4-1200x661.jpg.webp"
            ></Card.Img>
            <Card.Body>
              <Card.Title className="text-center">
                {" "}
                Ancora temporali al Centro-Sud: nubifragi in Campania e Sicilia,
                grandine in Puglia
              </Card.Title>
              <Card.Text>
                {" "}
                Altra giornata di instabilità sulle aree interne del Centro-Sud.
                Attualmente, violenti temporali stanno colpendo parti di
                Campania, Basilicata e Puglia, in maniera più limitata il sud
                del Lazio e l'Appennino emiliano. Colpita anche la Toscana. In
                Campania, le piogge più intense si registrano tra le province di
                Avellino e Benevento: sono caduti 70mm a Bisaccia, 59mm a
                Benevento contrada Ciancelle, 54mm a Morcone, 50mm a
                Montevergine, 49mm a Benevento centro, Mercogliano, Monte
                Partenio, 47mm a Cesinali, 40mm a Summonte, 37mm ad Ariano
                Irpino, Ospedaletto d'Alpinolo, 34mm ad Andretta, 32mm a
                Monteforte Irpino, 24mm a Avellino.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={12} md={8}>
          <Card>
            <Card.Img
              className="h-50"
              variant="top"
              src="https://www.meteoweb.eu/wp-content/uploads/2024/08/grandine-sicilia-3-1200x595.jpg.webp"
            ></Card.Img>
            <Card.Body>
              <Card.Title className="text-center">
                {" "}
                Maltempo Sicilia: la grandine danneggia uliveti e vigneti nel
                Trapanese.
              </Card.Title>
              <Card.Text>
                {" "}
                All'indomani del temporale che si è abbattuto anche nella Valle
                del Belìce, in Sicilia, si fa la conta dei danni. Questa zona è
                stata colpita da nubifragi ma soprattutto da grandine di grandi
                dimensioni, che ha provocato ulteriori danni. “Uliveti e vigneti
                nella zona di Salaparuta, Poggioreale e Gibellina sono stati
                seriamente compromessi. Da una prima stima non si esclude che il
                danno possa aggirarsi attorno a 1,5 milioni di euro”, dice
                Pietro Scalia, Presidente del Consorzio tutela vini doc
                Salaparuta. “Ha piovuto grandine dalla grandezza di palline da
                ping pong - spiega - ho trovato a terra numerosissime olive e
                quelle rimaste sull'albero oggi bisognerà capire in che
                condizioni sono”.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default Notizie;
