import React, { useState } from "react";
import { Card, Alert } from "react-bootstrap";
import cityImages from "../assets/cityImages.json"; // Importa il JSON con le immagini delle città

const SingleCity = ({ meteo }) => {
  // Stato per gestire la visibilita del testo
  const [isTextVisible, setIsTextVisible] = useState(false);

  // Verificao se ci sono dati meteo disponibili
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
    setIsTextVisible((prevState) => !prevState);
  };

  return (
    <Card
      className="h-100 cityCard"
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
          <strong>Temperature:</strong> {(meteo.main.temp - 273.15).toFixed(1)}
          °C
        </Card.Text>
        <Card.Text className="textCart">
          <strong>Condition:</strong> {meteo.weather[0].description}
        </Card.Text>
        <Card.Text
          className={isTextVisible ? "card-text-visible" : "card-text-hidden"}
        >
          <strong>Humidity:</strong> {meteo.main.humidity}%
        </Card.Text>
        <Card.Text
          className={isTextVisible ? "card-text-visible" : "card-text-hidden"}
        >
          <div className="d-flex justify-content-between">
          <p><i class="bi bi-thermometer-snow"></i><strong>Min:</strong> {(meteo.main.temp_min - 273.15).toFixed(1)}°C</p>
         <p><i class="bi bi-thermometer-sun"></i> <strong>Max:</strong> {(meteo.main.temp_max - 273.15).toFixed(1)}°C</p>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SingleCity;
