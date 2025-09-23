import { createSlice } from "@reduxjs/toolkit";
import { fetchCitiesWeather, fetchSingleCityWeather, fetchForecastByCoord } from "./actions";

const initialState = {
  list: [],
  single: null,
  loadingList: false,
  loadingSingle: false,
  errorList: null,
  errorSingle: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    clearSingle(state) {
      state.single = null;
      state.errorSingle = null;
    },
    resetWeather(){
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      //all cities
      .addCase(fetchCitiesWeather.pending, (s) => {
        s.loadingList = true;
        s.errorList = null;
      })
      .addCase(fetchCitiesWeather.fulfilled, (s, a) => {
        s.loadingList = false;
        s.list = a.payload;
      })
      .addCase(fetchCitiesWeather.rejected, (s, a) => {
        s.loadingList = false;
        s.errorList = a.error?.message || "Error";
      })
      //single city
      .addCase(fetchSingleCityWeather.pending, (s) => {
        s.loadingSingle = true;
        s.errorSingle = null;
      })
      .addCase(fetchSingleCityWeather.fulfilled, (s, a) => {
        s.loadingSingle = false;
        s.single = a.payload;
      })
      .addCase(fetchSingleCityWeather.rejected, (s, a) => {
        s.loadingSingle = false;
        s.single = null;
        s.errorSingle = a.payload || a.error?.message || "Error";
      })
      .addCase(fetchForecastByCoord.pending, (s) => {
        s.loadingList = true;
        s.errorList = null;
      })
      .addCase(fetchForecastByCoord.fulfilled, (s, a ) => {
        s.loadingList = false;
        s.list = a.payload;
      })
      .addCase(fetchForecastByCoord.rejected, (s, a) => {
        s.loadingList = false;
        s.errorList = a.payload || a.error?.message || "Error";
      });
      
  },
});

export const { clearSingle, resetWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
