import Header from './views/header/Heder';
import Hero from './views/hero/Hero';
import Cards from './views/weather-cards/Cards';
import DetailsList from './views/details/DetailsList';
import Statistic from './views/statistic/Statistic';
import Forecast from './views/forecast/Forecast';
import News from './views/news/News';
// import MySwiper from './views/swiper/Swiper';
import Footer from './views/footer/Footer';

import { WeatherContext } from './context/weatherContext';
import { useContext } from 'react';

const App = () => {
  const { weeklyForecast, choosenCard, hourlyForecast } = useContext(WeatherContext);
  return (
    <div className="App">
      <Header />
      {/* <main>
        <Hero />
        <Cards />
        {choosenCard && <DetailsList />}
        {hourlyForecast && <Statistic />}
        {weeklyForecast && <Forecast />}
        <News />
        <MySwiper />
      </main>
      <Footer /> */}
    </div>
  );
};

export default App;
