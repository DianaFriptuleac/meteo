import {
  MAP_SEARCH_ERROR,
  MAP_SEARCH_PENDING,
  MAP_SEARCH_SUCCESS,
  MAP_SET_CENTER,
} from "./types";
import { fetchForecastByCoord, fetchSingleCityWeather} from "../weather/actions";
//Centro mappa
export const setMapCenter = (lat, lng) => ({
  type: MAP_SET_CENTER,
  payload: { lat, lng },
});

export const searchCityAndSelect = (query) => {
  return async (dispatch) => {
    const apiKey = process.env.REACT_APP_OPENWEATHER_KEY;
    const q = (query || "").trim();
    if (!q || !apiKey) return;

    try {
      dispatch({ type: MAP_SEARCH_PENDING });
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
          q
        )}&limit=1&appid=${apiKey}`
      );
      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) {
        dispatch({ type: MAP_SEARCH_ERROR, error: "City not found" });
        return;
      }
      const { lat, lon, country, name } = data[0];

      //aggiorna il centro mappa
      dispatch(setMapCenter(lat, lon));

      //Salva risultato ricerca
      dispatch({
        type: MAP_SEARCH_SUCCESS,
        payload: { lat, lon, name, country: (country || "IT").toUpperCase() },
      });

      //Carica il meteo corrente della citta
      const cc = (country || "IT").toLowerCase();
      dispatch(fetchSingleCityWeather(`${name},${cc}`));
      dispatch(fetchForecastByCoord({lat, lon}));
    } catch (e) {
      dispatch({ type: MAP_SEARCH_ERROR, error: "Error search" });
    }
  };
};
