import DetailsList from './views/details/DetailsList';
// import MySwiper from './views/swiper/Swiper';
import Header from './views/header/Heder';
import Footer from './views/footer/Footer';
import Forecast from '../src/views/forecast/Forecast';
import News from '../src/views/news/News';
import Main from './components/hero/Hero';
import React from 'react';
import Cards from './views/weather-cards/Cards';
import { WeatherContext } from './context/weatherContext';
import { useContext } from 'react';
const App = () => {
  const { weeklyForecast, choosenCard } = useContext(WeatherContext);
  return (
    <div className="App">
      <Header />
      <Main />
      <Cards />
      {choosenCard && <DetailsList />}
      {weeklyForecast && <Forecast />}
      <News />
      {/* <MySwiper /> */}
      <Footer />
    </div>
  );
};

export default App;
