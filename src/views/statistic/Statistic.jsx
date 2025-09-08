import React, { useContext } from 'react';
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
import { WeatherContext } from '@/context/weatherContext';
import CloseButton from '@/components/close-button/CloseButton';
const bem = createBem('statistic', styles);

const chartHeight = window.innerWidth <= 480 ? 250 : window.innerWidth <= 768 ? 300 : 400;

const Statistic = () => {
  const { error, hourlyForecast, closeHourlyForecast } = useContext(WeatherContext);

  return (
    <section className={bem()}>
      <div className={`container ${bem('container')}`}>
        <h2 className={bem('title')}>Hourly forecast</h2>
        <CloseButton onClick={() => closeHourlyForecast()} />

        {error ? (
          <p>{error}</p>
        ) : hourlyForecast.length > 0 ? (
          <ResponsiveContainer width="100%" height={chartHeight}>
            <LineChart data={hourlyForecast}>
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
    </section>
  );
};

export default Statistic;
