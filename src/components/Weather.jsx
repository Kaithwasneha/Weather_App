import React, { useState } from 'react'
import { FaSearch, FaWind } from "react-icons/fa";
import { BiSolidErrorCircle } from "react-icons/bi";
import { FaMapMarkerAlt } from "react-icons/fa";
import './Weather.css'
import { WiHumidity } from 'react-icons/wi';

const Weather = () => {



    const [city, setCity] = useState('');
    const [weather, setWeather] = useState();
    const [error, setError] = useState('');


    const API_KEY = "c9978606e0f9fa97415024285896eb8e";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;


    const handlerChange = (event) => {

        setCity(event.target.value)

    }


    const fetchData = async () => {
        try {
            let response = await fetch(url);
            let result = await response.json();

            if (response.ok) {
                setWeather(result);
                setError('')
                console.log(result);
            }
            else {
                setError("Please Enter valid City Name.")
            }
        }
        catch (error) {
            console.log("This is error :" + error)
        }

    }

    return (
        <div className="container">

            <div className="city">

                <input type="text" value={city} onChange={handlerChange} placeholder='Enter City Name ' />

                <button onClick={() => fetchData()}><FaSearch /></button>
            </div>
            {
                error && <p className='error-message'><BiSolidErrorCircle />  {error}</p>
            }
            {
                weather && weather.weather &&
                <div className="content">
                    <div className="weather-image">
                        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
                        <h3 className="desc">{weather.weather[0].description}</h3>
                    </div>

                    <div className="weather-temp">
                        <h2 className="temp">{weather.main.temp} <span>&deg;C</span> </h2>
                    </div>

                    <div className="weather-city">
                        <div className="location">
                            <FaMapMarkerAlt />
                        </div>
                        <p>{weather.name} <span>{weather.sys.country}</span> </p>
                    </div>

                    <div className="weather-stats">
                        <div className="wind">
                            <div className="wind-icon"><FaWind /></div>
                            <h3 className="wind-speed">{weather.wind.speed} <span>Km/h</span> </h3>
                            <h3 className="wind-heading">WIND SPEED</h3>
                        </div>

                        <div className="humidity">
                            <div className="humidity-icon"><WiHumidity /></div>
                            <h3 className="humidity-speed">{weather.main.humidity} <span>%</span> </h3>
                            <h3 className="humidity-heading">HUMIDITY</h3>
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}

export default Weather