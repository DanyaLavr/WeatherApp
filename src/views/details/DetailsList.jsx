import { createBem } from '@/utils/createBem';
import styles from './detailsList.module.scss';
import DetailsItem from './DetailsItem';
import { useContext } from 'react';
import { WeatherContext } from '../../context/weatherContext';
import CloseButton from '../../components/close-button/CloseButton';
const bem = createBem('details', styles);

const DetailsList = () => {
  const { choosenCard, resetChoosenCard } = useContext(WeatherContext);

  const renderedData = choosenCard && [
    { name: 'Feels Like', value: choosenCard.main?.feels_like, unit: '°C' },
    {
      value: [choosenCard.main?.temp_min, choosenCard.main?.temp_max],
      unit: '°C',
    },
    { name: 'Humidity', value: choosenCard.main?.humidity, unit: '%' },
    {
      name: 'Pressure',
      value: choosenCard.main?.pressure,
      unit: 'Pa',
    },
    { name: 'Wind Speed', value: choosenCard.wind?.speed, unit: 'm/s' },
    { name: 'Visibility', value: choosenCard.visibility, unit: 'm' },
  ];

  return (
    <section className={bem()}>
      <div className="container">
        <ul className={bem('list')}>
          <CloseButton onClick={() => resetChoosenCard()} extraMargin={false} />

          {renderedData ? (
            renderedData.map((elem, id) => <DetailsItem key={id} data={elem} />)
          ) : (
            <li className={bem('error')}>An error has happened, restart the page and try again</li>
          )}
        </ul>
      </div>
    </section>
  );
};
export default DetailsList;
