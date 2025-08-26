import { createContext, useState, useEffect } from 'react';
import fetchWeather from '@/api/openWeather';
import { useMaxCards } from '@/hooks/useMaxCards';

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [cardsArr, setCardsArray] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [dailyForecast, setDailyForecast] = useState(false);
  const [weeklyForecast, setWeeklyForecast] = useState(false);
  const [weeklyForecastCordinates, setWeeklyForecastCordinates] = useState({});
  const [choosenCard, setChoosenCard] = useState(null);
  const maxCards = useMaxCards();

  const handleAddingNewCard = (card) => {
    setCardsArray((prev) => {
      if (prev.some((c) => c.name.toLowerCase() === card.name.toLowerCase())) {
        return prev;
      }
      const newCards = prev.length >= maxCards ? prev.slice(0, maxCards - 1) : prev;
      return [card, ...newCards];
    });
  };
  const handleWeeklyForecast = (obj) => {
    setWeeklyForecastCordinates(obj);
  };
  const deleteLastCard = () => {
    setCardsArray((prev) => prev.slice(0, -1));
  };

  const getCard = (id) => {
    console.log(id, cardsArr);
    return cardsArr.find((card) => card.id === id);
  };

  const toggleDailyForecast = () => setDailyForecast((prev) => !prev);
  const toggleWeeklyForecast = () => setWeeklyForecast((prev) => !prev);

  const handleChooseCard = (id) => setChoosenCard(getCard(id));
  const resetChoosenCard = () => setChoosenCard(null);
  useEffect(() => {
    const loadCities = async () => {
      try {
        let cities = ['Kyiv'];
        if (maxCards >= 2) cities.push('Lviv');
        if (maxCards >= 3) cities.push('Berlin');

        const data = await Promise.all(cities.map((city) => fetchWeather(city)));

        setCardsArray(data);
      } catch (err) {
        console.error('Failed to fetch initial city weather:', err);
      }
    };
    loadCities();
  }, [maxCards]);
  const handleSearch = async () => {
    const newCity = inputValue.trim();
    if (!newCity) return;

    setInputValue('');

    try {
      const newWeather = await fetchWeather(newCity);

      setCardsArray((prev) => {
        if (prev.some((card) => card.name.toLowerCase() === newWeather.name.toLowerCase()))
          return prev;
        const allBaseCities = ['Kyiv', 'Lviv', 'Berlin'];
        const onlyBase = prev.every((card) => allBaseCities.includes(card.name));
        if (onlyBase) {
          return [newWeather];
        }
        const newArr = [...prev, newWeather];
        if (newArr.length > maxCards) {
          return newArr.slice(-maxCards);
        }
        return newArr;
      });
    } catch (err) {
      console.error('Failed to fetch new city weather:', err);
    }
  };
  const deleteCardByName = (name) => {
    setCardsArray((prev) => prev.filter((card) => card.name !== name));
  };

  return (
    <WeatherContext.Provider
      value={{
        cardsArr,
        inputValue,
        setInputValue,
        handleSearch,
        handleAddingNewCard,
        deleteCardByName,
        deleteLastCard,

        dailyForecast,
        toggleDailyForecast,

        weeklyForecast,
        weeklyForecastCordinates,
        handleWeeklyForecast,
        toggleWeeklyForecast,

        choosenCard,
        handleChooseCard,
        resetChoosenCard,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
