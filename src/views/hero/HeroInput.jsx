import styles from './hero.module.scss';
import { createBem } from '@/utils/createBem';
import { fetchWeather } from '@/api/openWeather';
import { useContext, useRef } from 'react';
import { WeatherContext } from '@/context/weatherContext';

const bem = createBem('hero', styles);

const HeroInput = () => {
  const { handleAddingNewCard, handleSearch } = useContext(WeatherContext);
  const refInput = useRef();
  const resetForm = () => {
    refInput.current.value = '';
  };
  const onSubmit = (e) => {
    e.preventDefault();
    handleSearch(refInput.current.value);
    resetForm();
  };
  return (
    <form className={bem('search_box')} onSubmit={onSubmit}>
      <input
        ref={refInput}
        className={bem('search_input')}
        type="text"
        placeholder="Search location..."
        enterKeyHint="search"
      />
      <button className={bem('search_button')} type="submit">
        <span className={bem('search')} role="img" aria-label="search">
          <i className="fa-solid fa-magnifying-glass" style={{ color: 'black' }}></i>
        </span>
      </button>
    </form>
  );
};

export default HeroInput;
