import { useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMapCenter,
  selectMapError,
  selectMapSearching,
} from "../redux/maps/selectors";
import {
  selectSingleCity,
  selectWeatherList,
} from "../redux/weather/selectors";
import { useState } from "react";
import { searchCityAndSelect } from "../redux/maps/actions";
import {
  Container,
  InputGroup,
  Form,
  Button,
  Alert,
  Card,
  Row,
  Col,
  Table,
} from "react-bootstrap";
import "../CSS/Map.css";
import { resetWeather } from "../redux/weather/reducer";

const MapUpdater = ({ lat, lng, zoom = 12 }) => {
  const map = useMap();
  useEffect(() => {
    if (typeof lat === "number" && typeof lng === "number") {
      map.setView([lat, lng], zoom, { animate: true });
    }
  }, [lat, lng, zoom, map]);
  return null;
};
const pinIcon = new L.Icon({
  iconUrl:
    "https://e7.pngegg.com/pngimages/409/413/png-clipart-map-drawing-pin-map-marker-angle-heart-thumbnail.png",
  iconSize: [15, 20],
  iconAnchor: [8, 20],
});

const DEFAULT_ZOOM = 6;
const DEFAULT_CENTER = { lat: 41.9028, lng: 12.4964 }; // Roma

//icone
const getWeatherIcon = (description) => {
  if (description.includes("clear")) return "🌞 ";
  if (description.includes("cloud")) return "☁️ ";
  if (description.includes("rain")) return "🌧️ ";
  if (description.includes("snow")) return "❄️ ";
  return "🌦️";
};

const Map = function () {
  const dispatch = useDispatch();
  const center = useSelector(selectMapCenter);
  const searching = useSelector(selectMapSearching);
  const error = useSelector(selectMapError);

  const single = useSelector(selectSingleCity);
  const cities = useSelector(selectWeatherList);
  const [query, setQuery] = useState("");

  //Stato meteto pulito al mount della pagina
  useEffect(() => {
    dispatch(resetWeather());
  }, [dispatch]);
  const handleSearch = () => {
    if (query.trim()) {
      dispatch(searchCityAndSelect(query));
      setQuery("");
    }
  };

  const getDailyForecasts = () => {
    if (!Array.isArray(cities) || cities.length === 0) return [];
    const daysMap = {};
    cities.forEach((f) => {
      const day = new Date(f.dt * 1000).toLocaleDateString(); // raggruppa per giorno
      (daysMap[day] ||= []).push(f);
    });
    // prende l'orario più vicino alle 12:00 per ogni giorno
    const perDay = Object.values(daysMap).map(
      (arr) =>
        arr.sort(
          (a, b) =>
            Math.abs(new Date(a.dt * 1000).getHours() - 12) -
            Math.abs(new Date(b.dt * 1000).getHours() - 12)
        )[0]
    );
    return perDay.slice(0, 5);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col>
          <h2 className="text-center text-white my-2">
            Search for a city and check the weather
          </h2>
          <InputGroup className="mb-2 mx-auto search-bar">
            <Form.Control
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button
              onClick={handleSearch}
              disabled={searching}
              variant="primary"
            >
              <i className="bi bi-search"></i>
            </Button>
          </InputGroup>
          {error && (
            <Alert variant="danger" className="mb-3">
              {error}
            </Alert>
          )}

          <Card className="shadow-sm">
            <Card.Body className="p-0">
              <div style={{ height: "350px", width: "100%" }}>
                <MapContainer
                  center={[
                    center?.lat || DEFAULT_CENTER.lat,
                    center?.lng || DEFAULT_CENTER.lng,
                  ]}
                  zoom={DEFAULT_ZOOM}
                  scrollWheelZoom
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                  />
                  {center && (
                    <Marker
                      position={[center.lat, center.lng]}
                      icon={pinIcon}
                    />
                  )}
                  {center && (
                    <MapUpdater lat={center.lat} lng={center.lng} zoom={12} />
                  )}
                </MapContainer>
              </div>
            </Card.Body>
          </Card>
          {/* Tabella meteo */}
          {Array.isArray(cities) && cities.length > 0 && (
            <Card className="shadow-sm my-3 weather-table-card">
              <Card.Body>
                <h4 className="text-center mb-3">
                  5-day Forecast for {single?.name}
                </h4>
                <Table bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Day</th>
                      <th>Temp (°C)</th>
                      <th>Clouds</th>
                      <th>Humidity</th>
                      <th>Weather</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getDailyForecasts().map((f, i) => (
                      <tr key={i}>
                        <td>
                          {new Date(f.dt * 1000).toLocaleDateString([], {
                            weekday: "long",
                          })}
                        </td>
                        <td>{f.main.temp}°C</td>

                        <td>{f.clouds?.all ?? 0}%</td>

                        <td>{f.main.humidity}%</td>
                        <td>
                          {getWeatherIcon(f.weather[0].description)}{" "}
                          {f.weather[0].description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};
export default Map;
