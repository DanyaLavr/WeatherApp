import { createContext, useState } from 'react';

export const WeatherContext = createContext();
export const WeatherProvider = ({ children }) => {
  const [cardsArr, setCardsArray] = useState([]);
  const [dailyForecast, setDailyForecast] = useState(false);
  const [weeklyForecast, setWeeklyForecast] = useState(false);
  const [choosenCard, setChoosenCard] = useState(null);

  
  const deleteLastCard = () => {
    setCardsArray((prev) => prev.slice(0, -1));
  };
  const addNewCard = (card) => {
    setCardsArray((prev) => [card, ...prev]);
  };
  const handleAddingNewCard = (card) => {
    if (cardsArr.length === 3) {
      deleteLastCard();
    }
    addNewCard(card);
  };
  const getCard = (id) => {
    return cardsArr.find((card) => card.dt === id);
  };
  const toggleDailyForecast = () => setDailyForecast((prev) => !prev);
  const toggleWeeklyForecast = () => setWeeklyForecast((prev) => !prev);

  const handleChooseCard = (id) => {
    setChoosenCard(getCard(id));
  };
  return (
    <WeatherContext.Provider
      value={{
        cardsArr,
        handleAddingNewCard,
        deleteLastCard,
        addNewCard,

        dailyForecast,
        toggleDailyForecast,

        weeklyForecast,
        toggleWeeklyForecast,

        choosenCard,
        handleChooseCard,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
