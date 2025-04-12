import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import './Nord.css'; 

const API_KEY = "30aaeaea0d6c2d20535f003c28d480f3";
const Nord =() => {
    const [weatherData, setWeatherData] = useState([]);
    const [error, setError] = useState (null);
    const cities =[
        { name: 'Milano', lat: 45.4642, lon: 9.1900 },
        { name: 'Torino', lat: 45.0703, lon: 7.6869 },
        { name: 'Venezia', lat: 45.4408, lon: 12.3155 },
        { name: 'Genova', lat: 44.4056, lon: 8.9463 },
        { name: 'Trento', lat: 46.0700, lon: 11.1190 },
        { name: 'Trieste', lat: 45.6495, lon: 13.7768 },
        { name: 'Aosta', lat: 45.7370, lon: 7.3201 },
        { name: 'Bologna', lat: 44.4949, lon: 11.3426 }
    ];

useEffect (()=> {
    const fetchWeatherData= async () => {
        try {
            const weatherPromises = cities.map(city => fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric&lang=it`)
            .then(res => res.json())
        );
        const weatherResponses = await Promise.all(weatherPromises);
        setWeatherData(weatherResponses);
        setError(null);
        }catch (err){
            setError('Errore nel recupero delle previsioni meteo');
            setWeatherData([]);
        }
    };
    fetchWeatherData();
}, []);
return (
    <div className='nord-container'>
        <h1 className="text-light">Previsione Meteo - Nord Italia</h1>
        {error && <p style={{ color: 'blue'}}>{error}</p>}
        <div className='city-cards'>
            {weatherData.length > 0 && weatherData.map((data,index)=>(
                <div key={index} className='city-card'>
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
        <Link to='/' className="back-btn">Torna alla Home</Link>
    </div>
);
};
 export default Nord;
