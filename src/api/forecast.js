const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export async function fetchWeeklyForecast(weeklyForecastCordinates) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${weeklyForecastCordinates?.lat}&lon=${weeklyForecastCordinates?.lon}&units=metric&appid=${API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch forecast:', error);
  }
}
