import React, { useState } from 'react';
import "./weatherApp.css";

// Import Images
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/rain.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";

const WeatherApp = () => {


    let api_key = "a27631cd8a2f1bf3d628fb14db7be50c";

    const [wicon, setWicon] = useState(cloud_icon);

    const search = async () => {
        const element = document.getElementsByClassName("cityInput");
        if(element[0].value === "") {
            return 0;
        }

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

        let response = await fetch(url);
        let data = await response.json();

        const humidity = document.getElementsByClassName("humidityPercent");
        const wind = document.getElementsByClassName("windRate");
        const temprature = document.getElementsByClassName("weatherTemp");
        const location = document.getElementsByClassName("weatherLocation");

        humidity[0].innerHTML = data.main.humidity + " %";
        wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
        temprature[0].innerHTML = Math.floor(data.main.temp) + "&deg;c";
        location[0].innerHTML = data.name;

        if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
            setWicon(clear_icon);
        }
        else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
            setWicon(cloud_icon);
        }
        else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
            setWicon(drizzle_icon);
        }
        else if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
            setWicon(drizzle_icon);
        }
        else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
            setWicon(rain_icon);
        }
        else if(data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
            setWicon(rain_icon);
        }
        else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
            setWicon(snow_icon);
        }
        else {
            setWicon(clear_icon);
        }

    }

  return (
    <div className='container'>

        {/* Search Bar */}
        <div className="top-bar">
            <input type="text" className="cityInput" placeholder='search' />
            <div className="searchIcon" onClick={() => {search()}}>
                <img src={search_icon} alt="search Icon" />
            </div>
        </div>

        {/* Weather Images */}
        <div className="weatherImage">
            <img src={wicon} alt="cloud Icon" className='cloudImage' />
        </div>
        <div className="weatherTemp">24&deg;c</div>
        <div className="weatherLocation">London</div>

        {/* Data Container */}
        <div className="dataContainer">
            <div className="element">
                <img src={humidity_icon} alt="" className='icon' />
                <div className="data">
                    <div className="humidityPercent">64%</div>
                    <div className="text">Humidity</div>
                </div>
            </div>

            <div className="element">
                <img src={wind_icon} alt="" className='icon' />
                <div className="data">
                    <div className="windRate">18 km/h</div>
                    <div className="text">Wind Speed</div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default WeatherApp;
