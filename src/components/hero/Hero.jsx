import styles from "./hero.module.scss"
import { createBem } from '@/utils/createBem';
import HeroInput from "./Hero_input";
const bem = createBem('hero', styles);

const Hero = () => {
  return (

    <section className={bem()}>
      <div className="container">
        <h1 className={bem("title")}>Weather dashboard</h1>

        <div className={bem("hero_info")}>
          <div className={bem("info_text")}>
            <p>Create your personal list of favorite cities and always be aware of the weather.</p>
          </div>
          <div className={bem("line")}></div>
          <div className={bem("info_date")}>
            <p>October 2023</p>
            <p>Friday, 13<sup>th</sup></p>
          </div>
        </div>

        <div className={bem("search_box")}>
          <input className={bem("search_input")} type="text" placeholder="Search location..." />
          <button className={bem("search_button")} type="submit">
            <span className={bem("search")} role="img" aria-label="search"><i className="fa-solid fa-magnifying-glass"></i></span>
          </button>
        </div>
      </div >
    </section>
  );
};

export default Hero;