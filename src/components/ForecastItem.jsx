import { createBem } from '@/utils/createBem';
import styles from '../views/forecast/forecast.module.scss';

const bem = createBem('weather', styles);

const ForecastItem = ({ date, description, maxTemp, minTemp, imageUrl }) => {
  return (
    <li className={bem('item')}>
      <h3 className={bem('item-date')}>{date}</h3>
      <div className={bem('item-image-container')}>
        <img className={bem('item-image')} src={imageUrl} alt={description} />
        <p className={bem('item-temperature')}>
          {maxTemp}/{minTemp}°C
        </p>
      </div>
      <p className={bem('item-description')}>{description}</p>
    </li>
  );
};
export default ForecastItem;
