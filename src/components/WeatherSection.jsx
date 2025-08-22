import React, { useState, useEffect, useMemo } from "react";
import SingleCity from "./SingleCity";
import { Row, Col, Container, Spinner, Pagination } from "react-bootstrap";
import "../CSS/WeatherSection.css"
import { useDispatch, useSelector } from "react-redux";
import { selectWeatherList,selectWeatherListError,selectWeatherListLoading } from "../redux/weather/selectors";
import { fetchCitiesWeather } from "../redux/weather/actions";
import { usePagination } from "../hooks/usePagination";

const WeatherSection = () => {
  const dispatch = useDispatch();
  const citiesWeather = useSelector(selectWeatherList);
  const isLoading = useSelector(selectWeatherListLoading)
  const isError = useSelector(selectWeatherListError);

  const [expanded, setExpanded] = useState(null);
  const PAGE_NR = 12;


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
   dispatch(fetchCitiesWeather(mycities))
  }, [dispatch]);

  //Carica la prima pagina
  useEffect(() => {
    if (!isLoading && !isError) setPage(1);
  }, [isLoading, isError]);

 const { page, setPage, totalPages, pageData, goToPage } =
  usePagination(citiesWeather, PAGE_NR, { resetOnItemsChange: true });



  return (
    <Container className="mt-3">
      <h2 className="text-light text-center my-3">
        Il meteo di tutte le città Italiane
      </h2>
      {/*Gestione griglia sfocata al expanded della card */}
      <div className={expanded ? "grid-dim" : ""}>
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
                <SingleCity meteo={meteo} onOpen={() => setExpanded(meteo)} />
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

export default WeatherSection;
