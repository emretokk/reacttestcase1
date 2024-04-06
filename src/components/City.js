import React, { useEffect, useState } from "react";
import bg1 from "../assets/bg1.png";
import axios from "axios";
import { useLocation } from "react-router-dom";

import day2xx from "../assets/2xxDay.png";
import night2xx from "../assets/2xxNight.png";
import day5xx from "../assets/5xxDay.png";
import night5xx from "../assets/5xxNight.png";
import day800 from "../assets/800Day.png";
import night800 from "../assets/800Night.png";
import day80x from "../assets/80xDay.png";
import night80x from "../assets/80xNight.png";

function City() {
  const location = useLocation();
  const { lat, lon } = location.state;

  const [weatherData, setWeatherData] = useState();

  const calculateTime = (timestamp) => {
    const date = new Date(timestamp);
    return date;
  };

  const DayData = (
    <div className="h-full w-full text-gray-300">
      <p>Mon</p>
      <svg
        width="44"
        height="44"
        viewBox="0 0 225 220"
        fill="#22222F"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_f_303_719)">
          <rect
            x="77"
            y="77"
            width="70.0885"
            height="66"
            rx="33"
            fill="#FFEF9A"
          />
        </g>
        <g filter="url(#filter1_i_303_719)">
          <path
            d="M143 110C143 127.258 129.141 141.248 112.044 141.248C94.9477 141.248 81.0884 127.258 81.0884 110C81.0884 92.7423 94.9477 78.7522 112.044 78.7522C129.141 78.7522 143 92.7423 143 110Z"
            fill="url(#paint0_linear_303_719)"
          />
        </g>
        <defs>
          <filter
            id="filter0_f_303_719"
            x="0"
            y="0"
            width="224.089"
            height="220"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="38.5"
              result="effect1_foregroundBlur_303_719"
            />
          </filter>
          <filter
            id="filter1_i_303_719"
            x="81.0884"
            y="78.7522"
            width="61.9115"
            height="67.4956"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="5" />
            <feGaussianBlur stdDeviation="9" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.81 0"
            />
            <feBlend
              mode="normal"
              in2="shape"
              result="effect1_innerShadow_303_719"
            />
          </filter>
          <linearGradient
            id="paint0_linear_303_719"
            x1="107.342"
            y1="127.008"
            x2="133.175"
            y2="82.1253"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#FF9900" />
            <stop offset="1" stop-color="#FFEE94" />
          </linearGradient>
        </defs>
      </svg>
      <p>28°C</p>
      <p className="text-gray-500">10°C</p>
    </div>
  );
  const fetchWeatherData = async () => {
    try {
      const { data: response } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`
      );
      setWeatherData(response);
    } catch (error) {
      console.error(error.message);
    }
  };

  const detectBackgroundImg = () => {
    const hours = calculateTime(weatherData.dt * 1000).getHours();
    const isDayTime = hours > 6 && hours < 20;
    if (weatherData && isDayTime && weatherData.weather[0].id === 800)
      return day800;
    else if (weatherData && !isDayTime && weatherData.weather[0].id === 800)
      return night800;
    else if (weatherData && isDayTime && weatherData.weather[0].id > 800)
      return day80x;
    else if (weatherData && !isDayTime && weatherData.weather[0].id > 800)
      return night80x;
    else if (weatherData && isDayTime && weatherData.weather[0].id < 299)
      return day2xx;
    else if (weatherData && !isDayTime && weatherData.weather[0].id < 299)
      return night2xx;
    else if (
      weatherData &&
      isDayTime &&
      weatherData.weather[0].id < 599 &&
      weatherData.weather[0].id > 499
    )
      return day5xx;
    else if (
      weatherData &&
      !isDayTime &&
      weatherData.weather[0].id < 599 &&
      weatherData.weather[0].id > 499
    )
      return night5xx;
  };

  useEffect(() => {
    fetchWeatherData();
    console.log(weatherData);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 bg-gray-900 w-full h-screen">
      <div className="flex items-center justify-center w-72 h-72 p-2 bg-gray-800 rounded-xl">
        <div
          className="w-full h-full rounded-xl"
          style={{
            backgroundImage: `url(${
              weatherData ? detectBackgroundImg() : bg1
            })`,
          }}
        >
          <div className="p-4 h-1/2 w-full text-white">
            <p className="text-lg">
              {weatherData
                ? `${weatherData.name}, ${weatherData.sys.country}`
                : "yukleniyor"}
            </p>
            <p className="text-sm text-gray-200">
              {weatherData
                ? calculateTime(weatherData.dt * 1000).toDateString()
                : "yukleniyor"}
            </p>
          </div>
          <div className="p-4 h-1/2 w-full">
            <div className="w-1/2 h-full text-white">
              <p className="text-4xl font-extrabold">
                {weatherData
                  ? `${parseInt(weatherData.main.temp)}°C`
                  : "yukleniyor"}
              </p>
              <p className="mt-2 text-sm font-bold ">
                {weatherData
                  ? `${parseInt(weatherData.main.temp_min)}°C`
                  : "yukleniyor"}{" "}
                {" / "}
                {weatherData
                  ? `${parseInt(weatherData.main.temp_max)}°C`
                  : "yukleniyor"}
              </p>
              <p className="capitalize text-nowrap">
                {weatherData
                  ? weatherData.weather[0].description
                  : "yukleniyor"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-72 h-72 bg-gray-800 rounded-xl">
        <ul className="px-4 text-sm flex flex-col justify-evenly w-full h-full text-gray-200">
          <li className="flex border-b pb-2 border-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#22222F"
              viewBox="0 0 256 256"
            >
              <path d="M136,153V88a8,8,0,0,0-16,0v65a32,32,0,1,0,16,0Zm-8,47a16,16,0,1,1,16-16A16,16,0,0,1,128,200Zm40-66V48a40,40,0,0,0-80,0v86a64,64,0,1,0,80,0Zm-40,98a48,48,0,0,1-27.42-87.4A8,8,0,0,0,104,138V48a24,24,0,0,1,48,0v90a8,8,0,0,0,3.42,6.56A48,48,0,0,1,128,232Z"></path>
            </svg>
            <p className="ml-2 grow">Thermal sensation</p>
            <p>{weatherData ? weatherData.main.feels_like : "yukleniyor"}</p>
          </li>
          <li className="flex border-b pb-2 border-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#22222F"
              viewBox="0 0 256 256"
            >
              <path d="M158.66,196.44l-32,48a8,8,0,1,1-13.32-8.88l32-48a8,8,0,0,1,13.32,8.88ZM232,92a76.08,76.08,0,0,1-76,76H132.28l-29.62,44.44a8,8,0,1,1-13.32-8.88L113.05,168H76A52,52,0,0,1,76,64a53.26,53.26,0,0,1,8.92.76A76.08,76.08,0,0,1,232,92Zm-16,0A60.06,60.06,0,0,0,96,88.46a8,8,0,0,1-16-.92q.21-3.66.77-7.23A38.11,38.11,0,0,0,76,80a36,36,0,0,0,0,72h80A60.07,60.07,0,0,0,216,92Z"></path>
            </svg>
            <p className="ml-2">Probability of rain</p>
          </li>
          <li className="flex border-b pb-2 border-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#22222F"
              viewBox="0 0 256 256"
            >
              <path d="M184,184a32,32,0,0,1-32,32c-13.7,0-26.95-8.93-31.5-21.22a8,8,0,0,1,15-5.56C137.74,195.27,145,200,152,200a16,16,0,0,0,0-32H40a8,8,0,0,1,0-16H152A32,32,0,0,1,184,184Zm-64-80a32,32,0,0,0,0-64c-13.7,0-26.95,8.93-31.5,21.22a8,8,0,0,0,15,5.56C105.74,60.73,113,56,120,56a16,16,0,0,1,0,32H24a8,8,0,0,0,0,16Zm88-32c-13.7,0-26.95,8.93-31.5,21.22a8,8,0,0,0,15,5.56C193.74,92.73,201,88,208,88a16,16,0,0,1,0,32H32a8,8,0,0,0,0,16H208a32,32,0,0,0,0-64Z"></path>
            </svg>
            <p className="ml-2 grow">Wind speed</p>
            <p>{weatherData ? weatherData.wind.speed : "yukleniyor"} m/s</p>
          </li>
          <li className="flex border-b pb-2 border-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#22222F"
              viewBox="0 0 256 256"
            >
              <path d="M174,47.75a254.19,254.19,0,0,0-41.45-38.3,8,8,0,0,0-9.18,0A254.19,254.19,0,0,0,82,47.75C54.51,79.32,40,112.6,40,144a88,88,0,0,0,176,0C216,112.6,201.49,79.32,174,47.75ZM128,216a72.08,72.08,0,0,1-72-72c0-57.23,55.47-105,72-118,16.53,13,72,60.75,72,118A72.08,72.08,0,0,1,128,216Zm55.89-62.66a57.6,57.6,0,0,1-46.56,46.55A8.75,8.75,0,0,1,136,200a8,8,0,0,1-1.32-15.89c16.57-2.79,30.63-16.85,33.44-33.45a8,8,0,0,1,15.78,2.68Z"></path>
            </svg>
            <p className="ml-2 grow">Air humidity</p>
            <p>{weatherData ? weatherData.main.humidity : "yukleniyor"}</p>
          </li>
          <li className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#22222F"
              viewBox="0 0 256 256"
            >
              <path d="M120,40V32a8,8,0,0,1,16,0v8a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-8-8A8,8,0,0,0,50.34,61.66Zm0,116.68-8,8a8,8,0,0,0,11.32,11.32l8-8a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l8-8a8,8,0,0,0-11.32-11.32l-8,8A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l8,8a8,8,0,0,0,11.32-11.32ZM40,120H32a8,8,0,0,0,0,16h8a8,8,0,0,0,0-16Zm88,88a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-8A8,8,0,0,0,128,208Zm96-88h-8a8,8,0,0,0,0,16h8a8,8,0,0,0,0-16Z"></path>
            </svg>
            <p className="ml-2">UV Index</p>
          </li>
        </ul>
      </div>
      <div className="flex w-72 h-40 p-4 gap-2 bg-gray-800 rounded-xl">
        {DayData}
        {DayData}
        {DayData}
        {DayData}
        {DayData}
      </div>
    </div>
  );
}

export default City;
