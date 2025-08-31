import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './style/reset.css';
import './style/global.scss';
import App from './App.jsx';
import { WeatherProvider } from './context/weatherContext.jsx';
import { UserProvider } from './context/userContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <WeatherProvider>
        <App />
      </WeatherProvider>
    </UserProvider>
  </StrictMode>
);
