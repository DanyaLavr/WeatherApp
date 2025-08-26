const fetchWeather = async (city) => {
  const API_KEY = import.meta.env.VITE_FORECAST_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch weather data: ${response.status}`);
  }
  const data = await response.json();
  return data;
};
export default fetchWeather;
