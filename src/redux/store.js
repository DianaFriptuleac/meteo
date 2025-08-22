import { combineReducers, configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weather/reducer";

const rootReducer = combineReducers({
  weather: weatherReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefault) => getDefault({ serializableCheck: false }),  // Disattiva il controllo "serializable"
  //  dei middleware RTK (utile se nello store finiscono oggetti non serializzabili come Date/Map/Error o x redux-persist)
});
