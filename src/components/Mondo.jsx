import React, { useState, useEffect } from "react";
import SingleCity from "./SingleCity";
import { Row, Col, Container } from "react-bootstrap";

const Mondo = () => {
  const [citiesWeather, setCitiesWeather] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Lista delle citta
  const mycities = [
    "Paris",
    "City of London",
    "Washington D.C.",
    "Moscow",
    "Barcelona",
    "Tokyo",
    "Berlino",
    "Madrid",
    "Rio de Janeiro",
    "Ottawa",
    "Canberra",
    "Nuova Delhi",
    "Città del Messico",
    "Buenos Aires",
    "Cairo",
    "Teheran",
    "Seoul",
    "Bangkok",
    "Athens",
    "Ankara",
    "Riyadh",
    "Pretoria",
    "New York",
    "Seattle",
    "Manila",
    "Nairobi",
    "Chisinau",
    "Istanbul",
    "Oslo",
    "Monaco",
    "Lisbon",
    "Madrid",
    "Zurich",
    "Stockholm",
    "Bucharest",
    "Los Angeles",
    "Amsterdam",
    "Prague",
    "Copenhagen",
    "Vienna",
    "Brussels",
    "Warsaw"
  ];

  useEffect(() => {
    fetchAllCities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAllCities = () => {
    setIsLoading(true);
    setIsError(false);

    // Fetch dati meteo per tutte le città
    const fetchPromises = mycities.map((city) =>
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a0e171e2bcceba5ec1cddb1c98216ec8`
      )
        .then((response) => response.json())
        .then((data) => ({
          name: data.name,
          main: data.main,
          weather: data.weather,
        }))
        .catch(() => null)
    );

    Promise.all(fetchPromises)
      .then((results) => {
        setCitiesWeather(results.filter((result) => result !== null));
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  };

  return (
    <Container>
       <Row className="text-light text-center my-3">
        <h2>Aggiornamenti in tempo reale</h2>
        <h4>Trova il meteo della tua città</h4>
        </Row>
      <Row className="text-center g-3">
        {isLoading && <p className="text-light">Caricamento in corso...</p>}
        {isError && <p className="text-light">Ci dispiace, non abbiamo informazioni per le città.</p>}
        {!isLoading &&
          !isError &&
          citiesWeather.length > 0 &&
          citiesWeather.map((meteo) => (
            <Col
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2}
              className="my-3"
              key={meteo.name}
            >
              <SingleCity meteo={meteo} />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Mondo;
