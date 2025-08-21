import React, { useEffect, useState } from "react";
import { Card, Alert } from "react-bootstrap";
import cityImages from "../assets/cityImages.json"; // Importa il JSON con le immagini delle città

const SingleCity = ({ meteo, onOpen, onClose, expanded = false }) => {
  // visibilita testo x expanded
  const [isTextVisible, setIsTextVisible] = useState(expanded);
  //Aggiorna quando cambia expanded
  useEffect(() => {
    setIsTextVisible(expanded);
  }, [expanded]);

  // Verificao dati meteo disponibili
  if (!meteo || !meteo.name || !meteo.main || !meteo.weather) {
    return (
      <Alert variant="danger">
        Ci dispiace, non abbiamo informazioni per la tua città.
      </Alert>
    );
  }

  // Estraggo il nome della città
  const cityName = meteo.name;

  // Recupero il percorso dell'immagine corrispondente
  const cityImage =
    cityImages[cityName] ||
    "https://meteobook.it/wp-content/uploads/2016/10/mondo.gif";

  // Gestisco il click sulla card
  const handleCardClick = () => {
    if (expanded) {
      onClose();
    } else {
      onOpen?.();
    }
  };

  return (
    <Card
      className={`h-100 cityCard ${expanded ? "cityCard-expanded" : ""}`}
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <Card.Img
        className="cards-image"
        variant="top"
        src={cityImage}
        alt={cityName}
      />
      <Card.Body>
        <Card.Title className="titleCard">{cityName}</Card.Title>
        <Card.Text className="textCart">
          {/*Converto la temperatura da Kelvin a Celsius (0 Kelvin = -273.15°C) */}
          {/*.toFixed(1)- arrotondao la temp. a una cifra decimale*/}
          <strong>Temperature:</strong> {(meteo.main.temp - 273.15).toFixed(1)}
          °C
        </Card.Text>
        <Card.Text className="textCart">
          <strong>Condition:</strong> {meteo.weather[0].description}{" "}
          {/* primo elemento dell'array  */}
        </Card.Text>
        <Card.Text
          className={
            isTextVisible ? "card-text-visible text-center" : "card-text-hidden"
          }
        >
          <strong>Humidity:</strong> {meteo.main.humidity}%
        </Card.Text>
        <Card.Text
          as="div"
          className={
            isTextVisible
              ? "card-text-visible d-flex justify-content-between"
              : "card-text-hidden"
          }
        >
          <span>
            <i className="bi bi-thermometer-snow"></i>
            <strong>Min:</strong> {(meteo.main.temp_min - 273.15).toFixed(1)}
            °C
          </span>
          <span>
            <i className="bi bi-thermometer-sun"></i> <strong>Max:</strong>{" "}
            {(meteo.main.temp_max - 273.15).toFixed(1)}°C
          </span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SingleCity;
