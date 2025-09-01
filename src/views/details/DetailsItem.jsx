import { createBem } from '@/utils/createBem';
import styles from './detailsList.module.scss';
import Humidity from './icons/humidity.svg';
import Pressure from './icons/pressure.svg';
import Temp from './icons/temp.svg';
import Visibility from './icons/visibility.svg';
import Wind from './icons/wind.svg';
const bem = createBem('details', styles);
const icons = {
  'Feels Like': <Temp />,
  Humidity: <Humidity />,
  Pressure: <Pressure />,
  'Wind Speed': <Wind />,
  Visibility: <Visibility />,
};

const DetailsItem = ({ data }) => {
  return (
    <li className={bem('item')}>
      {Array.isArray(data?.value) ? (
        <>
          <div className={bem('content')}>
            <h3 className={bem('title')}>Min {data.unit}</h3>
            <span className={bem('value')}>{data.value[0]}</span>
          </div>
          <div className={bem('content')}>
            <h3 className={bem('title')}>Max {data.unit}</h3>
            <span className={bem('value')}>{data.value[1]}</span>
          </div>
        </>
      ) : (
        <>
          <div className={bem('content')}>
            <h3 className={bem('title')}>{data.name}</h3>
            <span className={bem('value')}>
              {data.value} {data?.unit}
            </span>
          </div>
          <div className={bem('icon')}>{icons[data.name]}</div>
        </>
      )}
    </li>
  );
};
export default DetailsItem;
