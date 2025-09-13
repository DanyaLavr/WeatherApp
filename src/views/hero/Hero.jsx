import HeroForm from './HeroForm';
import styles from './hero.module.scss';
import { createBem } from '@/utils/createBem';

const bem = createBem('hero', styles);

const Hero = () => {
  return (
    <section id="hero" className={bem()}>
      <div className={`container ${bem('container')}`}>
        <h1 className={bem('title')}>Weather dashboard</h1>

        <div className={bem('info')}>
          <div className={bem('info-text')}>
            <p>Create your personal list of favorite cities and always be aware of the weather.</p>
          </div>
          <div className={bem('line')}></div>
          <div className={bem('info-date')}>
            <p>October 2023</p>
            <p>
              Friday, 13<sup>th</sup>
            </p>
          </div>
        </div>
        <HeroForm />
      </div>
    </section>
  );
};

export default Hero;
