import Card from './Card';
import { useContext } from 'react';
import { WeatherContext } from '@/context/weatherContext';
import { createBem } from '@/utils/createBem';
const bem = createBem('weather-cards', styles);

import styles from './Cards.module.scss';
export default function Cards() {
  const { error } = useContext(WeatherContext);
  return (
    <section id="weather-card" className={bem()}>
      <div className={`container ${bem('container')}`}>
        {error && <h3 className={styles['weather-cards-error-message']}>{error}</h3>}
        <ul className={bem('list')}>
          <Card />
        </ul>
      </div>
    </section>
  );
}
