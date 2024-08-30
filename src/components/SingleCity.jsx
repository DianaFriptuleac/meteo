import React from "react";
import { Card, Alert } from "react-bootstrap";
import cityImages from "../assets/cityImages.json"; // Importa il JSON con le immagini delle città

const SingleCity = ({ meteo }) => {
  // Verifica se ci sono dati meteo disponibili
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
  const cityImage = cityImages[cityName] || "https://meteobook.it/wp-content/uploads/2016/10/mondo.gif"

  return (
    <Card className="h-100 cityCard">
      <Card.Img className="cards-image"
        variant="top"
        src={cityImage}
        alt={cityName}
      
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




