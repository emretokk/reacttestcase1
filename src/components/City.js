import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    let interval = setInterval(() => {
      fetchWeatherData();
      console.log(weatherData);
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 bg-gray-900 w-full h-screen">
      <div className="flex items-center justify-center w-72 h-72 bg-gray-800 rounded-xl">
        <div
          className="w-64 h-64 rounded-xl"
          style={{
            backgroundImage: `url(${bg1})`,
          }}
        >
          <div className="p-4 h-1/2 w-full text-white">
            <p className="text-lg">
              {weatherData.name}, {weatherData.sys.country}
            </p>
            <p className="text-sm text-gray-200"> time stuff will be here</p>
          </div>
          <div className="p-4 h-1/2 w-full">
            <div className="w-1/2 h-full text-white">
              <p className="text-4xl font-extrabold">
                {parseInt(weatherData.main.temp - 273)}°C
              </p>
              <p className="mt-2 text-sm font-bold ">
                {parseInt(weatherData.main.temp_min - 273)}°C{" / "}
                {parseInt(weatherData.main.temp_max - 273)}°C
              </p>
              <p className="capitalize">{weatherData.weather[0].description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-72 h-72 bg-gray-800 rounded-xl"></div>
      <div className="w-72 h-40 bg-gray-800 rounded-xl"></div>
    </div>
  );
}

export default City;
