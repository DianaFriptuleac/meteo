import { Card } from "react-bootstrap"

const SingleCity = ({meteo}) => {
    return(
        <Card className="h-100">
      <Card.Body>
        <Card.Title>{meteo.name}</Card.Title>
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