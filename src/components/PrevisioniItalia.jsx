import React, { useState, useEffect } from 'react';
import './Previsioni.css';
import Meteo from './Meteo';

const API_KEY = "30aaeaea0d6c2d20535f003c28d480f3";

const PrevisioniItalia = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);

  const cities = [
    { name: 'Roma', lat: 41.9028, lon: 12.4964 },
    { name: 'Milano', lat: 45.4642, lon: 9.1900 },
    { name: 'Napoli', lat: 40.8522, lon: 14.2681 },
    { name: 'Torino', lat: 45.0703, lon: 7.6869 },
    { name: 'Bologna', lat: 44.4937, lon: 11.3388 },
  ];

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const weatherPromises = cities.map(city =>
          fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric&lang=it`)
            .then(res => res.json())
        );

        const weatherResponses = await Promise.all(weatherPromises);
        setWeatherData(weatherResponses);
        setError(null);
      } catch (err) {
        setError('Errore nel recupero delle previsioni meteo');
        setWeatherData([]);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div className="previsioni-italia-container">
      <h1>Previsioni Meteo Italia</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="city-info-grid">
        {weatherData.length > 0 && weatherData.map((data, index) => (
          <div key={index} className="city-info-box">
            <h3>{data.name}</h3>
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
              alt={data.weather[0].description}
              className="weather-icon"
            />
            <p>{Math.round(data.main.temp)}°C</p>
            <p>{data.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrevisioniItalia;
