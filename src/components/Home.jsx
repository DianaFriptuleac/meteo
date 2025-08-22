import React, { useState, useEffect } from "react";
import SingleCity from "./SingleCity";
import { Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { Row, Col, Container, Carousel } from "react-bootstrap";
import "../CSS/Home.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSingleCity,
  selectSingleError,
  selectSingleLoading,
} from "../redux/weather/selectors";
import { clearSingle } from "../redux/weather/reducer";
import { fetchSingleCityWeather } from "../redux/weather/actions";

const Home = () => {
  const dispatch = useDispatch();

  //il valore attuale del campo di input della ricerca
  const [searchQuery, setSearchQuery] = useState("");
  const [carouselImg, setCarouselImg] = useState([]);

  const cityWeather = useSelector(selectSingleCity);
  const isLoading = useSelector(selectSingleLoading);
  const isError = useSelector(selectSingleError);

  //Carousel Img
  useEffect(() => {
    fetch("/assets/file_json/home_img.json")
      .then((resp) => resp.json())
      .then((data) => setCarouselImg(data.home_images))
      .catch((err) => console.log("Errore caricamento carousel img!", err));
  }, []);

  //Aggiorno il searchQuery ogni volta che scrivo nel input
  const handleInputChange = (event) => {
    const v = event.target.value;
    setSearchQuery(v);
    if (v.trim() === "") {
      dispatch(clearSingle()); //quando si svuota l'input, nasconde la card
    }
  };

  //prevengo il comportamento orenedinito del Form
  //chiamo handleSearch() per fare la ricerca
  const handleSubmit = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    dispatch(fetchSingleCityWeather(q));
    setSearchQuery("");
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
          <Button
            type="submit"
            className="btn btn-primary px-3 h-50 align-self-center submitButton"
          >
            Cerca
          </Button>
        </form>
      </div>

      {/* Mostro i dati della citta cercata o un messaggio di errore */}
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
      {!cityWeather && carouselImg.length > 0 && (
        <Container>
          <Carousel data-bs-theme="dark" className="mb-3 carousel-opacity">
            {carouselImg.map((src, i) => (
              <Carousel.Item key={i}>
                <img
                  className="d-block w-100"
                  src={src}
                  alt={`carousel_img_${i + 1}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Container>
      )}
    </div>
  );
};

export default Home;
