import React, { Component } from "react";
import { getWeatherDate } from "../../utils/getWeatherDate.js";
import { convertCodeToCountry } from "../../utils/convertCodeToCountry.js";
import "./WeatherWidget.scss";
import { ReactComponent as WeatherWind } from "../../assets/weather_wind.svg";
import { ReactComponent as WeatherPrecipitation } from "../../assets/weather_precipitation.svg";
import { ReactComponent as WeatherRain } from "../../assets/weather_rain.svg";
import { ReactComponent as WeatherSnow } from "../../assets/weather_snow.svg";
import { ReactComponent as WeatherStorm } from "../../assets/weather_storm.svg";
import { ReactComponent as WeatherSunCloudy } from "../../assets/weather_sun_cloudy.svg";
import { ReactComponent as WeatherSun } from "../../assets/weather_sun.svg";

const weatherApi = {
  base: "https://api.openweathermap.org/data/2.5/weather?",
  units: "metric",
  key: "738217ce8e619b56bc3d050cb585575a",
};

const precipitationApi = {
  base: "https://api.openweathermap.org/data/2.5/onecall?",
  exclude: "current,minutely,hourly,alerts",
  units: "metric",
  key: "738217ce8e619b56bc3d050cb585575a",
};

const getIcon = (id) => {
  switch (id) {
    case "01d":
    case "01n":
      return <WeatherSun className="weather-icon weather-icon__sun" />;
    case "09d":
    case "09n":
    case "10d":
    case "10n":
      return <WeatherRain className="weather-icon weather-icon__rain" />;
    case "11d":
    case "11n":
      return <WeatherStorm className="weather-icon weather-icon__storm" />;
    case "13d":
    case "13n":
      return <WeatherSnow className="weather-icon weather-icon__snow" />;
    default:
      return <WeatherSunCloudy className="weather-icon weather-icon__cloudy" />;
  }
};

class WeatherWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      lat: null,
      lon: null,
      city: "",
      country: "",
      temp: null,
      about: "",
      wind: null,
      precipitation: null,
      iconId: null,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
      fetch(
        `${weatherApi.base}lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=${weatherApi.units}&appid=${weatherApi.key}`
      )
        .then((res) => res.json())
        .then((result) => {
          this.setState({
            isLoaded: true,
            city: result.name,
            country: result.sys.country,
            temp: result.main.temp,
            about: result.weather[0].main,
            wind: result.wind.speed,
            iconId: result.weather[0].icon,
          });
        });

      fetch(
        `${precipitationApi.base}lat=${this.state.lat}&lon=${this.state.lon}&exclude=${precipitationApi.exclude}&units=${precipitationApi.units}&appid=${precipitationApi.key}`
      )
        .then((res) => res.json())
        .then((result) => {
          this.setState({
            precipitation: result.daily[0].pop,
          });
        });
    });
  }

  render() {
    const {
      isLoaded,
      city,
      temp,
      about,
      wind,
      precipitation,
      country,
      iconId,
    } = this.state;

    if (!isLoaded) {
      return (
        <div className="float-right float-right--loading">
          <div className="weather-info weather-info--inactive">
            To see weather, let us know your location
          </div>
        </div>
      );
    } else {
      return (
        <div className="float-right">
          <div className="weather-info">
            <div className="weather-info__date tiny">
              {getWeatherDate(new Date())} | {city},&nbsp;
              {convertCodeToCountry(country)}
            </div>
            <div className="weather-info__current-weather thin">
              <span className="weather-info__current-temp">
                {Math.round(temp)}°
              </span>
              <h4 className="weather-info__current-description thin">
                {about}
              </h4>
            </div>
            <div className="weather-info__wind tiny">
              <WeatherWind /> {wind}&nbsp;
              <span className="weather-info__wind--space-between">m/s</span>
              <WeatherPrecipitation /> {Math.round(precipitation)} mm
            </div>
          </div>
          {getIcon(iconId)}
        </div>
      );
    }
  }
}

export default WeatherWidget;
