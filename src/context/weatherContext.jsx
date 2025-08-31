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
  const [error, setError] = useState('');

  const maxCards = useMaxCards();

  const trimPreservingFavorites = (arr, max) => {
    if (!Array.isArray(arr)) return [];
    if (arr.length <= max) return arr;
    const favourites = arr.filter((c) => c.isFavorite);
    const nonFavourites = arr.filter((c) => !c.isFavorite);
    const availableSlots = Math.max(0, max - favourites.length);
    const keptNonFav = nonFavourites.slice(0, availableSlots);
    const keptNonFavNames = new Set(keptNonFav.map((c) => c.name));
    const result = [];
    for (const item of arr) {
      if (item.isFavorite) {
        result.push(item);
      } else if (keptNonFavNames.has(item.name)) {
        result.push(item);
        keptNonFavNames.delete(item.name);
      }
    }

    return result;
  };

  const handleAddingNewCard = (card) => {
    const cardWithFav = { ...card, isFavorite: card.isFavorite ?? false };
    setCardsArray((prev) => {
      const base = Array.isArray(prev) ? prev : [];
      if (base.some((c) => c.name.toLowerCase() === cardWithFav.name.toLowerCase())) {
        return base;
      }
      const newArr = [cardWithFav, ...base];
      return trimPreservingFavorites(newArr, maxCards);
    });
  };

  const handleWeeklyForecast = (obj) => {
    setWeeklyForecastCordinates(obj);
  };
  const deleteLastCard = () => {
    setCardsArray((prev) => {
      const base = Array.isArray(prev) ? prev : [];
      return base.slice(0, -1);
    });
  };

  const getCard = (id) => {
    if (!Array.isArray(cardsArr)) return null;
    return cardsArr.find((card) => card.id === id);
  };

  const toggleDailyForecast = () => setDailyForecast((prev) => !prev);
  const toggleWeeklyForecast = () => setWeeklyForecast((prev) => !prev);

  const handleChooseCard = (id) => setChoosenCard(getCard(id));
  const resetChoosenCard = () => setChoosenCard(null);

  useEffect(() => {
    const loadCities = async () => {
      try {
        const savedCards = JSON.parse(localStorage.getItem('cardsArr'));
        if (savedCards && savedCards.length > 0) {
          setCardsArray(savedCards);
          return;
        }
        const allDefault = ['Kyiv', 'Lviv', 'Berlin'];
        const cities = allDefault.slice(0, maxCards);
        const data = await Promise.all(cities.map((city) => fetchWeather(city)));
        const cardsWithFav = data.map((card) => ({ ...card, isFavorite: false }));
        setCardsArray(cardsWithFav);
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
    setError('');
    try {
      const newWeather = await fetchWeather(newCity);
      const cardWithFav = { ...newWeather, isFavorite: false };

      setCardsArray((prev) => {
        const base = Array.isArray(prev) ? prev : [];
        if (base.some((card) => card.name.toLowerCase() === cardWithFav.name.toLowerCase())) {
          return base;
        }
        const newArr = [cardWithFav, ...base];
        return trimPreservingFavorites(newArr, maxCards);
      });
    } catch (err) {
      setError(`City "${newCity}" not found!`);
    }
  };
  const deleteCardByName = (name) => {
    setCardsArray((prev) => {
      const base = Array.isArray(prev) ? prev : [];
      return base.filter((card) => card.name !== name);
    });
  };
  const toggleFavorite = (cityName) => {
    setCardsArray((prev) => {
      const base = Array.isArray(prev) ? prev : [];
      const updated = base.map((card) =>
        card.name === cityName ? { ...card, isFavorite: !card.isFavorite } : card
      );
      return updated;
    });
  };
  useEffect(() => {
    if (Array.isArray(cardsArr)) {
      try {
        localStorage.setItem('cardsArr', JSON.stringify(cardsArr));
      } catch (e) {
        console.error('Failed to save cards to localStorage', e);
      }
    }
  }, [cardsArr]);
  useEffect(() => {
    setCardsArray((prev) => trimPreservingFavorites(prev, maxCards));
  }, [maxCards]);
  return (
    <WeatherContext.Provider
      value={{
        cardsArr,
        setCardsArray,
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

        toggleFavorite,
        error,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
