import React, { useState, useEffect, useMemo } from "react";
import SingleCity from "./SingleCity";
import { Row, Col, Container, Pagination } from "react-bootstrap";
import "../CSS/WeatherSection.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectWeatherList,
  selectWeatherListError,
  selectWeatherListLoading,
} from "../redux/weather/selectors";
import { fetchCitiesWeather } from "../redux/weather/actions";
import { usePagination } from "../hooks/usePagination";

const Mondo = () => {
  const dispatch = useDispatch();
  const citiesWeather = useSelector(selectWeatherList);
  const isLoading = useSelector(selectWeatherListLoading);
  const isError = useSelector(selectWeatherListError);

  const [expanded, setExpanded] = useState(null);
  const PAGE_NR = 12;

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
    "San Francisco",
  ];

  useEffect(() => {
    dispatch(fetchCitiesWeather(mycities));
  }, [dispatch]);

  //Carica la prima pagina
  useEffect(() => {
    if (!isLoading && !isError) setPage(1);
  }, [isLoading, isError]);

  const { page, setPage, totalPages, pageData, goToPage } = usePagination(
    citiesWeather,
    PAGE_NR,
    { resetOnItemsChange: true }
  );

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
