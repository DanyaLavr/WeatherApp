import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { createBem } from '@/utils/createBem';

import styles from './statistic.module.scss';
import Loader from '@/components/loader/Loader';
import CustomTooltip from './CustomTooltip';
const bem = createBem('statistic', styles);

const chartHeight = window.innerWidth <= 480 ? 250 : window.innerWidth <= 768 ? 300 : 400;

const formatDateTime = (str) => {
  const date = new Date(str);
  const hours = date.getHours();

  if (hours === 0) {
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    return `${day} ${month}`;
  }
  if (hours > 12) return `${(hours - 12).toString()} pm`;

  return `${hours.toString()} am`;
};
const Statistic = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const apiKey = 'fcc3ac1b514a2bdf8898cc0061159146';
    const city = 'Alicante';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    const getWeather = async () => {
      try {
        const response = await axios.get(url);
        const weatherList = response.data.list;
        const renderArr = weatherList.map((elem) => {
          const weatherTime = formatDateTime(elem.dt_txt);
          return {
            time: weatherTime,
            temp: elem.main.temp.toFixed(1),
            feels_like: elem.main.feels_like.toFixed(1),
            icon: elem.weather[0].icon,
            description: elem.weather[0].description,
          };
        });
        if (window.innerWidth <= 1439 && window.innerWidth >= 834) {
          setData(renderArr.slice(0, 8));
        } else if (window.innerWidth <= 833) {
          setData(
            renderArr.slice(0, 10).filter((elem, idx) => {
              if (idx % 4 === 0) return elem;
            })
          );
        } else setData(renderArr);
      } catch (err) {
        console.error(err);
        setError('Не вдалося завантажити погоду.');
      }
    };
    getWeather();
  }, []);

  return (
    <div className={`container ${bem('container')}`}>
      <h2 className={bem('title')}>Hourly forecast</h2>
      {error ? (
        <p>{error}</p>
      ) : data.length > 0 ? (
        <ResponsiveContainer width="100%" height={chartHeight}>
          <LineChart data={data}>
            <CartesianGrid stroke="#B5B5B5" />

            <XAxis
              dataKey="time"
              orientation="top"
              axisLine={false}
              tickLine={false}
              tick={({ x, y, payload }) => (
                <text x={x} y={y - 10} textAnchor="middle" fill="#333" fontSize="10">
                  {payload.value}
                </text>
              )}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              domain={[5, 35]}
              ticks={[5, 10, 15, 20, 25, 30, 35]}
              unit="°C"
              fontSize="10"
            />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="temp" stroke="#FFA500" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Statistic;
