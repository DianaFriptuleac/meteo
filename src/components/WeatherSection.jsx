import React, { useState, useEffect } from "react";
import { Col, Container, Row, Spinner, Alert } from "react-bootstrap";
import SingleCity from "./SingleCity"; 

const WeatherSection = () => {
  const [mymeteo, setMymeteo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const mycities = [
    "Roma,it", "Milano,it", "Napoli,it", "Torino,it", "Palermo,it", "Genova,it", "Bologna,it", "Firenze,it", "Bari,it",
    "Catania,it", "Verona,it", "Venezia,it", "Messina,it", "Padova,it", "Trieste,it", "Taranto,it", "Brescia,it",
    "Parma,it", "Riccione,it", "Modena,it", "Reggio Calabria,it", "Reggio Emilia,it", "Perugia,it", "Livorno,it",
    "Ravenna,it", "Cagliari,it", "Foggia,it", "Rimini,it", "Salerno,it", "Ferrara,it"
  ];

  useEffect(() => {
    fetchAllMyCities();
 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMyCities = (city) => {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=a0e171e2bcceba5ec1cddb1c98216ec8`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Errore nel recupero dei dati per ${city}`);
        }
      })
      .catch((error) => {
        console.error(`Errore nella richiesta per ${city}:`, error);
        setIsError(true);
        setIsLoading(false);
         // Restituisce null nel caso in cui la citta non e nel elenco
        return null;
      });
  };

  const fetchAllMyCities = () => {
    const promises = mycities.map(city => fetchMyCities(city));
    Promise.all(promises)
      .then((resp) => {
         // Filtro i risultati di nulli
        const filteredResults = resp.filter(resp => resp !== null);
        setMymeteo(filteredResults);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Errore nel recuperare i dati meteo:", error);
        setIsError(true);
        setIsLoading(false);
      });
  };

  return (
    <Container className="my-5">
      <Row className="mb-3">
        <Col>
          <h4 className="text-light">Il meteo delle città italiane</h4>
        </Col>
      </Row>
      <Row>
        {isLoading && (
          <Col className="d-flex justify-content-center">
            <Spinner animation="border" variant="secondary" />
          </Col>
        )}
        {isError && (
          <Col className="d-flex justify-content-center">
            <Alert variant="danger">Errore nel recupero dei dati meteo!</Alert>
          </Col>
        )}
        {!isLoading &&
          !isError &&
          mymeteo.length > 0 &&
          mymeteo.map((meteo) => (
            <Col
              xs={12}
              sm={6}
              md={4}
              lg={2}
              key={meteo.id}
              className="mb-4"
            >
              <SingleCity meteo={meteo} />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default WeatherSection;
