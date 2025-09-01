import Card from './Card';
import { useContext } from 'react';
import { WeatherContext } from '@/context/weatherContext';
import styles from './Cards.module.scss';
export default function Cards() {
  const { error } = useContext(WeatherContext);
  return (
    <section id="weather-card" className={styles['weather-cards-section']}>
      {error && <h3 className={styles['weather-cards-error-message']}>{error}</h3>}
      <ul className={styles['weather-cards']}>
        <Card />
      </ul>
    </section>
  );
}
