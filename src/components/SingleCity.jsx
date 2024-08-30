import React from "react";
import { Card } from "react-bootstrap";
import cityImages from "../assets/cityImages.json"; // Importa il JSON con le immagini delle città

const SingleCity = ({ meteo }) => {
  // Estrai il nome della città
  const cityName = meteo.name;

  // Recupera il percorso dell'immagine corrispondente
  const cityImage = cityImages[cityName] || "./assets/default.jpg"; // Usa un'immagine di default se non c'è corrispondenza

  return (
    <Card className="h-100 cityCard">
      <Card.Img
        variant="top"
        src={cityImage}
        alt={cityName}
        style={{ width: "100%", height: "200px", objectFit: "cover" }} // Adatta l'immagine alla card
      />
      <Card.Body>
        <Card.Title>{cityName}</Card.Title>
        <Card.Text>
          <strong>Temperature:</strong> {(meteo.main.temp - 273.15).toFixed(1)}°C
        </Card.Text>
        <Card.Text>
          <strong>Condition:</strong> {meteo.weather[0].description}
        </Card.Text>
        <Card.Text>
          <strong>Humidity:</strong> {meteo.main.humidity}%
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SingleCity;

