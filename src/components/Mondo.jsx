import React, { useState, useEffect, useMemo } from "react";
import SingleCity from "./SingleCity";
import { Row, Col, Container, Pagination } from "react-bootstrap";
import "../CSS/WeatherSection.css"

const Mondo = () => {
  const [citiesWeather, setCitiesWeather] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [expanded, setExpanded] = useState(null);

  //Pagination
  const PAGE_NR = 12;
  const [page, setPage] = useState(1);

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
    "Warsaw",
    "Sydney",
    "Hong Kong",
    "Toronto",
    "Dubai",
    "Jakarta",
    "San Francisco"
  ];

  useEffect(() => {
    fetchAllCities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Carica la prima pagina
  useEffect(() => {
    if (!isLoading && !isError) setPage(1);
  }, [isLoading, isError]);

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

  //Calcoli paginazione
  const totalPages = Math.max(1, Math.ceil(citiesWeather.length / PAGE_NR));
  /* Math.ceil = arrotonda per eccesso (se servono 2.3 pagine → 3)
       Math.max(1, ...) = garantisce almeno 1 pagina anche quando l’array è vuoto
       Ex: 35 città con PAGE_NR = 12 → 35/12 = 2.916… → ceil = 3 → totalPages = 3 */

  const pageData = useMemo(() => {
    const start = (page - 1) * PAGE_NR;
    return citiesWeather.slice(start, start + PAGE_NR);
  }, [citiesWeather, page]);
  /*useMemo() → restituisce un valore memoizzato 
     slice(start, start + PAGE_NR) prende al massimo PAGE_NR elementi a partire da start
    */

  const goToPage = (p) => setPage(p);

  return (
    <Container>
      <Row className="text-light text-center my-3">
        <h2>Aggiornamenti in tempo reale</h2>
        <h4>Trova il meteo della tua città</h4>
      </Row>
      {/*Gestione griglia sfocata al expanded della card */}
      <div className={expanded ? "grid-dim" : ""}>
        <Row className="text-center g-3">
          {isLoading && <p className="text-light">Caricamento in corso...</p>}
          {isError && (
            <p className="text-light">
              Ci dispiace, non abbiamo informazioni per le città.
            </p>
          )}
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
                <SingleCity
                  meteo={meteo}
                  on
                  onOpen={() => setExpanded(meteo)}
                />
              </Col>
            ))}
        </Row>
        {citiesWeather.length > PAGE_NR && (
          <div className="d-flex justify-content-center mt-3">
            <Pagination className="pagination_btn">
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
            </Pagination>
          </div>
        )}
      </div>
      {expanded && (
        <div className="card-overlay" onClick={() => setExpanded(null)}>
          <div
            className="card-overlay-inner"
            onClick={(e) => e.stopPropagation()}
          >
            {/* La card in versione “expanded”: passo prop expanded per cambiare il comportamento di click */}
            <SingleCity
              meteo={expanded}
              expanded
              onClose={() => setExpanded(null)}
            />
          </div>
        </div>
      )}
    </Container>
  );
};

export default Mondo;
