export const selectWeatherList = (state) => state.weather.list;
export const selectWeatherListLoading = (state) => state.weather.loadingList;
export const selectWeatherListError = (state) => state.weather.errorList;

export const selectSingleCity = (state) => state.weather.single;
export const selectSingleLoading = (state) => state.weather.loadingSingle;
export const selectSingleError = (state) => state.weather.errorSingle;
