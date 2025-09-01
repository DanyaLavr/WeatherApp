import { createBem } from '@/utils/createBem';
import styles from './IconButtons.module.scss';

const bem = createBem('weather-cards', styles);

export default function Button({ btnEvent, btnClass, imgSrc }) {
  return (
    <button
      onClick={btnEvent}
      className={`${bem('icon-button')} ${bem(`icon-button--${btnClass}`)}`}
    >
      <svg className={`${bem('icon')} ${bem(`icon--${btnClass}`)}`}>
        <use href={imgSrc}></use>
      </svg>
    </button>
  );
}
