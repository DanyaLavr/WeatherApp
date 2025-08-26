import { useState, useContext } from 'react';
import { WeatherContext } from '@/context/weatherContext';
import styles from './Cards.module.scss';
import Loader from '@/components/loader/Loader';
import { createBem } from '@/utils/createBem';
import fetchWeather from '@/api/openWeather';
import Button from '../../components/iconsButton/IconButtons';
const bem = createBem('weather-cards', styles);

function timeNow() {
  return new Date().toLocaleTimeString('uk-UA', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function Card() {
  const {
    cardsArr,
    handleAddingNewCard,
    deleteCardByName,
    handleSearch,
    inputValue,
    setInputValue,
    handleWeeklyForecast,
    toggleWeeklyForecast,
    weeklyForecast,
    handleChooseCard,
  } = useContext(WeatherContext);
  const [time, setTime] = useState(timeNow());
  const date = new Date();
  const dayOfWeek = date.getDay();
  const handleRefresh = async () => {
    try {
      const refreshedCards = await Promise.all(cardsArr.map((card) => fetchWeather(card.name)));
      refreshedCards.forEach((card) => handleAddingNewCard(card));
      setTime(timeNow());
    } catch (err) {
      console.error('Failed to refresh weather:', err);
    }
  };
  const handleDelete = (cityName) => {
    deleteCardByName(cityName);
  };

  const handleAddToFavorites = (e) => {
    const className = bem('icon-heart--active');
    const isActive = e.target.classList.contains(className);

    if (isActive) {
      e.target.classList.remove(className);
    } else {
      e.target.classList.add(className);
    }
  };
  if (!cardsArr) return <Loader />;
  return (
    <>
      {cardsArr.map((item) => {
        const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
        const countryName = regionNames.of(item.sys.country);

        return (
          <li key={item.id} className={bem('item')}>
            <div className={bem('country-info-container')}>
              <p className={bem('country-info')}>{item.name}</p>
              <p className={bem('country-info')}>{countryName}</p>
            </div>

            <p className={bem('weather__time')}>{time}</p>

            <div className={bem('button-wrapper')}>
              <button className={bem('button')}>Hourly forecast</button>
              <button
                className={bem('button')}
                onClick={() => {
                  console.log('click');
                  console.log(weeklyForecast);
                  toggleWeeklyForecast();
                  handleWeeklyForecast(item.coord);
                }}
              >
                Weekly forecast
              </button>
            </div>

            <div className={bem('date-wrapper')}>
              <p className={bem('date')}>{date.toLocaleDateString('uk-UA')}</p>
              <hr className={bem('date__line')} />
              <p className={bem('date')}>{daysOfWeek[dayOfWeek]}</p>
            </div>

            <div className={bem('img-wrapper')}>
              <img
                className={bem('img')}
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt="weather icon"
              />
            </div>

            <p className={bem('temperature')}>{item.main.temp.toFixed()}°C</p>

            <div className={bem('icons-wrapper')}>
              <Button
                btnEvent={handleRefresh}
                btnClass="spinner"
                imgSrc="/images/weather-cards/sprite.svg#icon-spinner"
              />
              <Button
                btnEvent={(e) => handleAddToFavorites(e, item.name)}
                btnClass="heart"
                imgSrc="/images/weather-cards/sprite.svg#icon-heart"
              />
              <button
                className={`${bem('button')} ${bem('button-more')}`}
                onClick={() => {
                  console.log(item.id);

                  handleChooseCard(item.id);
                }}
              >
                See more
              </button>
              <Button
                btnEvent={() => handleDelete(item.name)}
                btnClass="trash"
                imgSrc="/images/weather-cards/sprite.svg#icon-trash"
              />
            </div>
          </li>
        );
      })}
    </>
  );
}
