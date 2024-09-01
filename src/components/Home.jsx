import React, { useState, useEffect } from "react";
import SingleCity from "./SingleCity";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Row, Col, Container, Carousel } from "react-bootstrap";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedCity, setSearchedCity] = useState("");
  const [cityWeather, setCityWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (searchedCity) {
      setIsLoading(true);
      setIsError(false);
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=a0e171e2bcceba5ec1cddb1c98216ec8`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.cod === 200) {
            setCityWeather({
              name: data.name,
              main: data.main,
              weather: data.weather,
            });
          } else {
            setCityWeather(null);
          }
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          setIsError(true);
        });
    }
  }, [searchedCity]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    setSearchedCity(searchQuery.trim());
    setSearchQuery("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="text-center mt-4 text-light">
      <h1>My meteo</h1>
      <h2>Aggiornamenti in tempo reale sul meteo!</h2>

      {/* Barra di ricerca */}
      <div className="mt-4 d-flex input-div">
        <form
          onSubmit={handleSubmit}
          className="d-flex align-items-center justify-content-center"
        >
          <InputGroup className="m-3">
            <Form.Control
            className="w-100 px-5"
              aria-label="Città"
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Cerca una città..."
            />
          </InputGroup>
          <Button type="submit" className="btn btn-primary px-3 h-50 align-self-center submitButton">
            Cerca
          </Button>
        </form>
      </div>

      {/* Mostro i dati della citta cercata o un messaggio di errore */}
      {isLoading && <p>Caricamento in corso...</p>}
      {isError && (
        <p>Ci dispiace, non abbiamo informazioni per la tua città.</p>
      )}

      {cityWeather && !isLoading && !isError && (
        <Container className="my-3">
          <Row className="justify-content-center">
            <Col xs={12} md={8}>
              <SingleCity meteo={cityWeather} />
            </Col>
          </Row>
        </Container>
      )}

      {/* Mostro il carosello solo se non c'e una citta cercata */}
      {!cityWeather && (
        <Container>
          <Carousel data-bs-theme="dark" className="mb-3 carousel-opacity">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://www.meteoweb.eu/wp-content/uploads/2017/09/mappa-sentinel-2.jpg"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://www.ideativi.it/public/Blog/google_maps_world_weather.png"
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://ilbolive.unipd.it/sites/default/files/2022-05/n_meteo.jpg"
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://cdn.studenti.stbm.it/images/2020/09/29/pianeta-terra-orig.jpeg"
                alt="Pianeta"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://cartadellaterra.it/wp-content/uploads/2023/09/homepage1-1.jpg"
                alt="Terra"
              />
            </Carousel.Item>
          </Carousel>
        </Container>
      )}
    </div>
  );
};

export default Home;
