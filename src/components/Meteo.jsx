import React, { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import './Code.css';
import { Link, useLocation } from 'react-router-dom';
import { Nav, NavDropdown } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Centro from './Centro';  
import PrevisioniItalia from './PrevisioniItalia';  

const API_KEY = "30aaeaea0d6c2d20535f003c28d480f3";

const Meteo = () => {
  const [city, setCity] = useState("Roma");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  // useLocation hook per ottenere il percorso corrente
  const location = useLocation();

  const handleSearch = async () => {
    if (!city) return;
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=it`
      );
      if (!res.ok) throw new Error("Città non trovata");
      const data = await res.json();
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    }
  };

  useEffect(() => {
    if (city) {
      handleSearch();
    }
  }, [city]);

  return (
      <main className="meteo-main d-flex justify-content-center mt-4 p-3">
        <div className="meteo-search">
          <input
            type="text"
            placeholder="Cerca località"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={handleSearch} className="search-btn">
            <i className="bi bi-search"></i>
          </button>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {weatherData && (
          <div className="meteo-cards">
            <div className="meteo-card">
              <div>
                <i className="bi bi-thermometer-half"></i>
                <span>{weatherData.name}</span>
              </div>
              <div>{Math.round(weatherData.main.temp)}°</div>
            </div>
          </div>
        )}
        <h2 className="meteo-title">Previsioni Meteo Italia</h2>

        <div className="meteo-social">
          <i className="bi bi-facebook"></i>
          <i className="bi bi-instagram"></i>
          <i className="bi bi-x"></i>
          <i className="bi bi-whatsapp"></i>
        </div>
      </main>
  );
};

export default Meteo;
