import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

const API_KEY = "30aaeaea0d6c2d20535f003c28d480f3";

const Sud=() => {
    const [weatherData,setWeatherData] = useState([]);
    const [error, setError] = useState(null);

    const cities =[
            { name: 'Napoli', lat: 40.8522, lon: 14.2681 },
            { name: 'Bari', lat: 41.1171, lon: 16.8719 },
            { name: 'Palermo', lat: 38.1157, lon: 13.3615 },
            { name: 'Catania', lat: 37.5079, lon: 15.0830 },
            { name: 'Reggio Calabria', lat: 38.1144, lon: 15.6500 },
            { name: 'Potenza', lat: 40.6395, lon: 15.8056 },
            { name: 'Campobasso', lat: 41.5600, lon: 14.6600 },
            { name: 'Cagliari', lat: 39.2238, lon: 9.1217 }
          ];

    useEffect (()=> {
        const fetchWeatherData = async () => {
            try{
                const weatherPromises = cities.map (city =>  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric&lang=it`)
                .then(res => res.json())
            );
             const weatherResponses = await Promise.all(weatherPromises);
             setWeatherData(weatherResponses);
             setError(null);
            } catch(err){
                setError("Errore nel recupero delle previsioni meteo");
                setWeatherData([]);
            }
        };
        fetchWeatherData();
    },[]);
    return (
        <div className='sud-container'>
            <h1>Previsioni Meteo - Sud Italia</h1>
            {error && <p style ={{color: 'red'}}>{error}</p>}
            <div className='city-cards'>
                {weatherData.length> 0 && weatherData.map((data, index)=>(
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
            <Link to='/' className="back-btn">Torna alla home</Link>
        </div>
    )
}
export default Sud;