import React, { useState } from "react";
import axios from "axios";

const MainInput = () => {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [date, setDate] = useState("");

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const getCurrentDate = () => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date();
        return today.toLocaleDateString('uk-UA', options);
    };

    const fetchWeather = async (city) => {
        const apiKey = "68aeb7aee71cfe3522c426b199a4af3f";
        const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

        try {
            const response = await axios.get(url);
            setWeather(response.data);
        } catch (error) {
            console.error("Error fetching weather data", error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (city) {
            fetchWeather(city);
            setDate(getCurrentDate());
        }
    };

    return (
        <section className="main">
            <h1 className="title">Weather dashboard</h1>
            <div className="main_info">
                <div className="info_text">
                    <p>Create your personal list of favorite cities and always be aware of the weather.</p>
                </div>
                <div className="line"></div>
                <div className="info_date">
                    <p>{date}</p>
                </div>
            </div>

            <div className="search_box">
                <input
                    className="search_input"
                    type="text"
                    placeholder="Search location..."
                    value={city}
                    onChange={handleCityChange}
                />
                <button className="search_button" type="submit" onClick={handleSearch}>
                    <span className="search" role="img" aria-label="search">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </span>
                </button>
            </div>

            {weather && (
                <div className="weather_info">
                    <h2>{weather.name}</h2>
                    <p>{weather.main.temp}°C</p>
                    <p>{weather.weather[0].description}</p>
                </div>
            )}
        </section>
    );
};

export default MainInput;
