import React from 'react';
import './Styles.css';
import moment from 'moment';
import { Button } from 'semantic-ui-react';
import { css, jsx } from '@emotion/react';

const refresh = () => {
  window.location.reload();
}

const WeatherCard = ({weatherData}) => (
  <div className="main">
    <p className="header">Region: {weatherData.name}</p>
    <Button className="button" inverted color='blue' circular icon='refresh' onClick={refresh} />
    <div className="flex">
      <p className="day">Allegedly, it's {moment().format('dddd')}</p>
      <p className="day">Date: {moment().format('LL')}</p>
    </div>
    <div className="flex">
      <p className="conditions">Temperature: {weatherData.main.temp} &deg;F</p>
      {/* <p>Feels like: {weatherData.main.feels_like} ºF</p> */}
      <p className="conditions">Sky: {weatherData.weather[0].description}</p>
      <p className="conditions">Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
      <p className="conditions">Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
    </div>
  </div>
)

export default WeatherCard;