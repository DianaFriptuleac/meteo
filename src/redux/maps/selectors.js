// redux/maps/selectors.js
export const selectMapCenter     = (state) => state.maps?.center ?? { lat: 41.9028, lng: 12.4964 };
export const selectMapSearching  = (state) => !!state.maps?.searching;
export const selectMapError      = (state) => state.maps?.error ?? null;
export const selectMapLastResult = (state) => state.maps?.lastResult ?? null;
