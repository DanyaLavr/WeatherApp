import styles from './hero.module.scss';
import { createBem } from '@/utils/createBem';
import { fetchWeather } from '@/api/openWeather';
import { useContext, useRef } from 'react';
import { WeatherContext } from '@/context/weatherContext';

const bem = createBem('hero', styles);

const HeroInput = () => {
  const { handleAddingNewCard } = useContext(WeatherContext);
  const refInput = useRef();
  const searchWeather = async (city) => {
    const res = await fetchWeather(city);
    console.log(res);
    handleAddingNewCard(res);
  };
  return (
    <div className={bem('search_box')}>
      <input
        ref={refInput}
        className={bem('search_input')}
        type="text"
        placeholder="Search location..."
      />
      <button
        className={bem('search_button')}
        type="submit"
        onClick={() => searchWeather(refInput.current.value)}
      >
        <span className={bem('search')} role="img" aria-label="search">
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>
      </button>
    </div>
  );
};

export default HeroInput;
