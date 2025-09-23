import {
  MAP_SEARCH_ERROR,
  MAP_SEARCH_PENDING,
  MAP_SEARCH_SUCCESS,
  MAP_SET_CENTER,
} from "./types";
const initialState = {
  center: { lat: 41.8719, lng: 12.5674 }, // Italia
  searching: false,
  error: null,
  lastResult: null,
};

export default function mapReducer(state = initialState, action) {
  switch (action.type) {
    case MAP_SET_CENTER:
      return {
        ...state,
        center: { lat: action.payload.lat, lng: action.payload.lng },
      };
    case MAP_SEARCH_PENDING:
      return { ...state, searching: true, error: null };
    case MAP_SEARCH_SUCCESS:
      return {
        ...state,
        searching: false,
        error: null,
        lastResult: action.payload,
      };
    case MAP_SEARCH_ERROR:
      return {
        ...state,
        searching: false,
        error: action.error,
        lastResult: null,
      };
    default:
      return state;
  }
}
