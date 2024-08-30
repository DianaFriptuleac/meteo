import React, { useState, useEffect } from "react";
import SingleCity from "./SingleCity"; 
import { Form, InputGroup } from "react-bootstrap"; 
import { Row, Col,Container } from "react-bootstrap";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedCity, setSearchedCity] = useState(""); // Stato per la città cercata
  const [cityWeather, setCityWeather] = useState(null); // Stato per i dati meteo della città cercata
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (searchedCity) {
      setIsLoading(true);
      setIsError(false);
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=a0e171e2bcceba5ec1cddb1c98216ec8`)
        .then(response => response.json())
        .then(data => {
          if (data.cod === 200) {
            setCityWeather({
              name: data.name,
              main: data.main,
              weather: data.weather
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
  };

  return (
    <div className="text-center mt-4 text-light">
      <h1>Benvenuti in Mymeteo!</h1>
      <h2>Aggiornamenti in tempo reale sul meteo!</h2>

      {/* Barra di ricerca */}
      <div className="mt-4">
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
          <Form.Control
            aria-label="Città"
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Cerca una città..."
            style={{ width: "300px", marginRight: "10px" }}
          />
        </InputGroup>

        <button onClick={handleSearch} className="btn btn-primary">
          Cerca
        </button>
      </div>

      {/* Mostro i dati della citta cercata o un messaggio di errore */}
      {isLoading && <p>Caricamento in corso...</p>}
      {isError && <p>Ci dispiace, non abbiamo informazioni per la tua città.</p>}
      {cityWeather && !isLoading && !isError && (
        <Container className="my-3">
            <Row className="justify-content-center">
                <Col xs={12} md={8}>
                <SingleCity meteo={cityWeather} />
                </Col>
            </Row>
         
        </Container>
      )}
      {!cityWeather && !isLoading && !isError && searchedCity && (
        <p>Ci dispiace, non abbiamo informazioni per la tua città.</p>
      )}
    </div>
  );
};

export default Home;


