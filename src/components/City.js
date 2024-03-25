import React, { useState } from "react";
import bg1 from "../assets/bg1.png";
import axios from "axios";
import { useLocation } from "react-router-dom";

function City() {
  const location = useLocation();
  const { lat, lon } = location.state;

  const [weatherData, setWeatherData] = useState([]);

  const fetchWeatherData = async () => {
    try {
      const { data: response } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`
      );
      setWeatherData(response);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 bg-gray-900 w-full h-screen">
      <div className="flex items-center justify-center w-72 h-72 bg-gray-800 rounded-xl">
        <div
          className="w-64 h-64 rounded-xl"
          style={{
            backgroundImage: `url(${bg1})`,
          }}
        >
          <p className="text-white m-4">Istanbul, TR</p>
          <button
            className="w-8 h-8 bg-white"
            onClick={(e) => {
              fetchWeatherData(e.target.value);
              console.log(weatherData);
            }}
          ></button>
        </div>
      </div>
      <div className="w-72 h-72 bg-gray-800 rounded-xl"></div>
      <div className="w-72 h-40 bg-gray-800 rounded-xl"></div>
    </div>
  );
}

export default City;
