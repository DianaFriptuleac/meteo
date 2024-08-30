import React, { useState, useEffect } from "react";
import SingleCity from "./SingleCity"; 
import { Row, Col,Container } from "react-bootstrap";

const WeatherSection = () => {
  const [citiesWeather, setCitiesWeather] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Lista delle citta
  const mycities = [
    "Roma,it", "Milano,it", "Napoli,it", "Torino,it", "Palermo,it", "Genova,it", "Bologna,it", "Firenze,it", "Bari,it", 
    "Catania,it", "Verona,it", "Venezia,it", "Messina,it", "Padova,it", "Trieste,it", "Taranto,it", "Brescia,it", 
    "Parma,it", "Modena,it", "Reggio Calabria,it", "Reggio Emilia,it", "Perugia,it", "Livorno,it", 
    "Ravenna,it", "Cagliari,it", "Foggia,it", "Rimini,it", "Salerno,it", "Ferrara,it","Prato,it"
  ];

  useEffect(() => {
    fetchAllCities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAllCities = () => {
    setIsLoading(true);
    setIsError(false);

    // Fetch dati meteo per tutte le città
    const fetchPromises = mycities.map(city => 
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a0e171e2bcceba5ec1cddb1c98216ec8`)
        .then(response => response.json())
        .then(data => ({
          name: data.name,
          main: data.main,
          weather: data.weather
        }))
        .catch(() => null)
    );

    Promise.all(fetchPromises)
      .then(results => {
        setCitiesWeather(results.filter(result => result !== null));
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  };

  return (
    <Container>
    <Row className="text-center g-3">
       
      {isLoading && <p>Caricamento in corso...</p>}
      {isError && <p>Ci dispiace, non abbiamo informazioni per le città.</p>}
      {!isLoading && !isError && citiesWeather.length > 0 &&
        citiesWeather.map((meteo) => (
            <Col  xs={12}
            sm={6}
            md={4}
            lg={3} 
            xl={2} className="my-3" key={meteo.name}>
            <SingleCity meteo={meteo} />
            </Col>
        ))}
       
    </Row>
    </Container>
  );
};

export default WeatherSection;

