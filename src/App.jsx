import DetailsList from './views/details/DetailsList';
import Forecast from '../src/views/forecast/Forecast';
import MySwiper from './views/swiper/Swiper';
import News from '../src/views/news/News';
import React from 'react';
import Cards from './views/weather-cards/Cards';
import { WeatherContext } from './context/weatherContext';
import { useContext } from 'react';
const App = () => {
  const { weeklyForecast, choosenCard } = useContext(WeatherContext);
  return (
    <div className="App">
      <Cards />
      {choosenCard && <DetailsList />}
      {weeklyForecast && <Forecast />}
      <News />
      <MySwiper />
    </div>
  );
};

export default App;
