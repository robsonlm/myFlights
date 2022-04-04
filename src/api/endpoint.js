export const GET_AUTOCOMPLETE_API_URL = (city) =>
  `https://aviation-edge.com/v2/public/autocomplete?key=${process.env.REACT_APP_AVIATIONEDGEAPI}&city=${city}`;

export const GET_FUTUREFLIGHT_API_URL = (departure, arrival, number) =>
  `https://api.aviationstack.com/v1/routes?access_key=${process.env.REACT_APP_AVIATIONSTACKAPI}&dep_iata=${departure}&arr_iata=${arrival}&flight_number=${number}`;

export const GET_REALTIMEFLIGHT_API_URL = (departure, arrival, number, date) =>
  `https://api.aviationstack.com/v1/flights?access_key=${process.env.REACT_APP_AVIATIONSTACKAPI}&dep_iata=${departure}&arr_iata=${arrival}&flight_number=${number}&flight_date=${date}`;

export const GET_WEATHER_API_URL = (iata) =>
  `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHERAPI}&q=iata:${iata}&days=3&aqi=no&alerts=no`;
