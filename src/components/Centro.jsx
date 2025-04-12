import React, { useState, useEffect } from 'react';
import './Centro.css'; // Assicurati di creare un file CSS per lo stile
import { Link } from 'react-router-dom';

const API_KEY = "30aaeaea0d6c2d20535f003c28d480f3";

const Centro = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);

  // Le coordinate per alcune città del Centro Italia
  const cities = [
    { name: 'Firenze', lat: 43.7696, lon: 11.2558 },
    { name: 'Perugia', lat: 43.1107, lon: 12.3908 },
    { name: 'Ancona', lat: 43.6158, lon: 13.5180 },
    { name: 'Terni', lat: 42.5653, lon: 12.6493 },
    { name: 'Rieti', lat: 42.4021, lon: 12.8608 }
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
    <div className="centro-container">
      <h1>Previsioni Meteo - Centro Italia</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="city-cards">
        {weatherData.length > 0 && weatherData.map((data, index) => (
          <div key={index} className="city-card">
            <h2>{cities[index].name}</h2>
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

      <Link to="/" className="back-btn">Torna alla Home</Link>
    </div>
  );
};

export default Centro;
