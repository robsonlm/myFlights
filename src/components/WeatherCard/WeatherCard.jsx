import React from "react";
import "./WeatherCard.scss";

const WeatherCard = ({ weatherInfo }) => {
  function ChangeFormateDate(oldDate) {
    return oldDate.toString().split("-").reverse().join("/");
  }

  console.log(weatherInfo.current);

  return (
    <div>
      {weatherInfo.current ? (
        <div className="weather-card">
          <div className="weather-card__wrapper">
            <div className="weather-card__top">
              <div className="weather-card__header">
                <h2 className="weather-card__header-title">
                  <span className="weather-card__header-city">
                    {weatherInfo?.location.name}
                  </span>
                  <span className="weather-card__header-date">
                    {" "}
                    {`${ChangeFormateDate(
                      weatherInfo.forecast.forecastday[0].date
                    )}`}
                  </span>
                </h2>
                <div className="weather-card__header-conditions">
                  <span className="weather-card__header-temp">
                    {weatherInfo.current.temp_c}°C
                  </span>
                  <div className="weather-card__header-desc">
                    <img
                      className="weather-card__header-image"
                      src={`https:${weatherInfo.current.condition.icon}`}
                      alt="condition"
                    />
                    <span className="weather-card__header-text">
                      {weatherInfo.current.condition.text}
                    </span>
                  </div>
                </div>
              </div>
              <div className="weather-card__forecast">
                <ul className="weather-card__forecast-list">
                  <li className="weather-card__forecast-list-item">
                    <h3 className="weather-card__forecast-day">Today</h3>
                    <img
                      className="weather-card__forecast-img"
                      src={`https:${weatherInfo.forecast.forecastday[0].day.condition.icon}`}
                      alt="today condition"
                    ></img>
                    <p className="weather-card__forecast-temperature">
                      {weatherInfo.forecast.forecastday[0].day.mintemp_c}° /{" "}
                      {weatherInfo.forecast.forecastday[0].day.maxtemp_c}°
                    </p>
                  </li>
                  <li className="weather-card__forecast-list-item">
                    <h3 className="weather-card__forecast-day">Tomorrow</h3>
                    <img
                      className="weather-card__forecast-img"
                      src={`https:${weatherInfo.forecast.forecastday[1].day.condition.icon}`}
                      alt="tomorrow condition"
                    ></img>
                    <p className="weather-card__forecast-temperature">
                      {" "}
                      {weatherInfo.forecast.forecastday[1].day.mintemp_c}° /{" "}
                      {weatherInfo.forecast.forecastday[1].day.maxtemp_c}°
                    </p>
                  </li>
                  <li className="weather-card__forecast-list-item">
                    <h3 className="weather-card__forecast-day">Next day</h3>
                    <img
                      className="weather-card__forecast-img"
                      src={`https:${weatherInfo.forecast.forecastday[1].day.condition.icon}`}
                      alt="next day condition"
                    ></img>
                    <p className="weather-card__forecast-temperature">
                      {" "}
                      {weatherInfo.forecast.forecastday[2].day.mintemp_c}° /{" "}
                      {weatherInfo.forecast.forecastday[2].day.maxtemp_c}°
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default WeatherCard;
