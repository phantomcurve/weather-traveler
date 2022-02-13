import React from 'react';
import './Styles.css';
import moment from 'moment';

const CardExampleCard = ({weatherData}) => (
  <div className="main">
        <p className="header">Region: {weatherData.name}</p>
        <div className="day">
          <p>Allegedly, it's {moment().format('dddd')}</p>
          <p>Date: {moment().format('LL')}</p>
        </div>
        <div className="conditions">
          <p>Temperature: {weatherData.main.temp} &deg;F</p>
          {/* <p>Feels like: {weatherData.main.feels_like} ºF</p> */}
          <p>Sky: {weatherData.weather[0].description}</p>
          <p>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
          <p>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
        </div>
  </div>
)

export default CardExampleCard;