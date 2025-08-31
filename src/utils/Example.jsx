import { createBem } from '@/utils/createBem';
import styles from './example.module.scss';

const bem = createBem('header', styles); //* Створення початкового класу

const Example = () => {
  return (
    <header className={bem()}>
      //* Присвоєння початковго класу
      <h1 className={bem('title')}>Header</h1> //* Створення вкладеності класу
    </header>
  );
};
<<<<<<< HEAD
=======

export default Example
>>>>>>> future-main
