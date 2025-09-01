import styles from './closeButton.module.scss';
import Cross from './close-button.svg';
export default function CloseButton({ onClick, extraMargin = true }) {
  return (
    <button
      className={`${styles['close-button']} ${extraMargin ? styles['close-button--extra-margin'] : ''}`}
      onClick={onClick}
    >
      <Cross />
    </button>
  );
}
