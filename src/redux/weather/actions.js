import { createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = process.env.REACT_APP_OPENWEATHER_KEY;

// fetch all cities
export const fetchCitiesWeather = createAsyncThunk(
  "weather/fetchCitiesWeather",
  async (cities, { rejectWithValue }) => {
    if (!API_KEY) return rejectWithValue("Missing OPENWEATHER API key");

    const requests = cities.map((city) =>
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${API_KEY}`
      )
        .then((response) => response.json())
        .then((data) =>
          data?.cod === 200
            ? { name: data.name, main: data.main, weather: data.weather }
            : null
        )
        .catch(() => null)
    );

    const results = await Promise.all(requests);
    return results.filter(Boolean);
  }
);

// fetch single city
export const fetchSingleCityWeather = createAsyncThunk(
  "weather/fetchSingleCityWeather",
  async (cityName, { rejectWithValue }) => {
    try {
      if (!API_KEY) return rejectWithValue("Missing OPENWEATHER API key");

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          cityName
        )}&appid=${API_KEY}`
      );
      const data = await response.json();

      if (data?.cod !== 200) {
        return rejectWithValue(data?.message || "City not found!");
      }

      return { name: data.name, main: data.main, weather: data.weather };
    } catch {
      return rejectWithValue("Network error!");
    }
  }
);
