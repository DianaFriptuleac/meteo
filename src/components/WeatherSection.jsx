import React, { useState, useEffect, useMemo } from "react";
import SingleCity from "./SingleCity";
import { Row, Col, Container, Spinner, Pagination } from "react-bootstrap";

const WeatherSection = () => {
  const [citiesWeather, setCitiesWeather] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  //Pagination
  const PAGE_NR = 12;
  const [page, setPage] = useState(1);

  // Lista delle citta
  const mycities = [
    "Roma,it",
    "Milano,it",
    "Napoli,it",
    "Torino,it",
    "Palermo,it",
    "Genova,it",
    "Bologna,it",
    "Firenze,it",
    "Bari,it",
    "Catania,it",
    "Verona,it",
    "Venezia,it",
    "Messina,it",
    "Padova,it",
    "Trieste,it",
    "Taranto,it",
    "Brescia,it",
    "Parma,it",
    "Modena,it",
    "Reggio Calabria,it",
    "Reggio Emilia,it",
    "Perugia,it",
    "Livorno,it",
    "Ravenna,it",
    "Cagliari,it",
    "Foggia,it",
    "Rimini,it",
    "Salerno,it",
    "Provincia di Ferrara,it",
    "Prato,it",
    "Pisa,it",
    "Siena,it",
    "Ancona,it",
    "Lecce,it",
    "Vicenza,it",
    "Trento,it",
  ];

  useEffect(() => {
    fetchAllCities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //parte con la prima pagina
  useEffect(() => {
    if (!isLoading && !isError) setPage(1);
  }, [isLoading, isError]);

  const fetchAllCities = () => {
    setIsLoading(true);
    setIsError(false);

    // Fetch dati meteo per tutte le citta
    const fetchPromises = mycities.map(
      (city) =>
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a0e171e2bcceba5ec1cddb1c98216ec8`
        )
          .then((response) => response.json())
          .then((data) => ({
            name: data.name, //estrago il nome e i dati principali della citta
            main: data.main,
            weather: data.weather,
          }))
          .catch(() => null) //se c'e un errore, restituisci null
    );

    Promise.all(fetchPromises)
      .then((results) => {
        setCitiesWeather(results.filter((result) => result !== null)); //filtro i risultati per rimuovere i null
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  };
  //Calcoli paginazione
  const totalPages = Math.max(1, Math.ceil(citiesWeather.length / PAGE_NR));
  const pageData = useMemo(() => {
    const start = (page - 1) * PAGE_NR;
    return citiesWeather.slice(start, start + PAGE_NR);
  }, [citiesWeather, page]);

  const goToPage = (p) => setPage(Math.min(Math.max(1, p), totalPages));
  return (
    <Container className="mt-3">
      <h2 className="text-light text-center my-3">
        Il meteo di tutte le città Italiane
      </h2>
      <Row className="text-center g-3">
        {/*gestisco isLoading e isError se sono true */}
        {isLoading && (
          <div className="d-flex justify-content-center align-items-center">
            <Spinner
              animation="border"
              role="status"
              variant="primary"
              className="me-2"
            >
              <span className="visually-hidden">Caricamento in corso...</span>
            </Spinner>
          </div>
        )}
        {isError && (
          <p className="text-light">
            Ci dispiace, non abbiamo informazioni per le città.
          </p>
        )}
        {/*se isLoading e isError sono false mostra fai il map dell'array */}
        {!isLoading &&
          !isError &&
          citiesWeather.length > 0 &&
          pageData.map((meteo, i) => (
            <Col
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2}
              className="my-3"
              key={`${meteo.name}-${i}`}
            >
              <SingleCity meteo={meteo} />
            </Col>
          ))}
      </Row>
      {citiesWeather.length > PAGE_NR && (
        <div className="d-flex justify-content-center mt-3">
          <Pagination>
            <Pagination.First
              onClick={() => goToPage(1)}
              disabled={page === 1}
            />
            <Pagination.Prev
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
            />

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Pagination.Item
                key={p}
                active={p === page}
                onClick={() => goToPage(p)}
              >
                {p}
              </Pagination.Item>
            ))}

            <Pagination.Next
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
            />
            <Pagination.Last
              onClick={() => goToPage(totalPages)}
              disabled={page === totalPages}
            />
          </Pagination>
        </div>
      )}
    </Container>
  );
};

export default WeatherSection;
