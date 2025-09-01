import axios from 'axios';

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

export const fetchStatistic = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;
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
    return renderArr;
  } catch (error) {
    return error;
  }
};
