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
const bem = createBem('statistic', styles);

const Statistic = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  const chartHeight = window.innerWidth <= 480 ? 250 : window.innerWidth <= 768 ? 300 : 400;

  useEffect(() => {
    const apiKey = 'fcc3ac1b514a2bdf8898cc0061159146';
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=50&lon=50&units=metric&appid=${apiKey}`;

    const getWeather = async () => {
      try {
        const response = await axios.get(url);
        console.log(response.data);
        const hourlyData = response.data.list.slice(0, 20).map((item) => {
          const date = new Date(item.dt * 1000);
          const hours = date.getHours();
          const suffix = hours >= 12 ? 'pm' : 'am';
          const formattedHour = `${hours % 12 || 12} ${suffix}`;

          return {
            time: formattedHour,
            temp: item.main.temp.toFixed(1),
            feels_like: item.main.feels_like.toFixed(1),

            description: item.weather[0].description,
          };
        });

        setData(hourlyData);
      } catch (err) {
        console.error(err);
        setError('Не вдалося завантажити погоду.');
      }
    };
    getWeather();
  }, []);
  useEffect(() => {
    console.log(data);
  }, [data]);
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const { temp, feels_like, icon, description } = payload[0].payload;
      return (
        <div
          className="custom-tooltip"
          style={{ background: '#fff', border: '1px solid #ccc', padding: 10 }}
        >
          <p>
            <strong>{label}</strong>
          </p>
          <img src={icon} alt={description} width="50" />
          <p>Температура: {temp}°C</p>
          <p>Відчувається як: {feels_like}°C</p>
          <p style={{ textTransform: 'capitalize' }}>{description}</p>
        </div>
      );
    }
    return null;
  };

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
              tick={({ x, y, payload }) => {
                const showTick = window.innerWidth > 768 || payload.index % 2 === 0;
                return showTick ? (
                  <text x={x} y={y - 10} textAnchor="middle" fill="#333" fontSize="12">
                    {payload.value}
                  </text>
                ) : null;
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              domain={[5, 35]}
              ticks={[5, 10, 15, 20, 25, 30, 35]}
              unit="°C"
            />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="temp" stroke="#FFA500" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p>Завантаження погоди...</p>
      )}
    </div>
  );
};

export default Statistic;
