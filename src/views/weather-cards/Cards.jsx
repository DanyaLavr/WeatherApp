import Card from './Card';
import styles from './Cards.module.scss';
export default function Cards() {
  return (
    <ul className={styles['weather-cards']}>
      <Card />
    </ul>
  );
}
