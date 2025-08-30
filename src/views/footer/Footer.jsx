import { createBem } from '@/utils/createBem';
import Logo from '../../../public/images/icons/logo.svg';
import Instagram from '../../../public/images/icons/medias/instagram.svg';
import Facebook from '../../../public/images/icons/medias/facebook.svg';
import Whatsapp from '../../../public/images/icons/medias/whatsapp.svg';
import styles from './footer.module.scss';
const bem = createBem('footer', styles);

const Footer = () => {
  return (
    <footer className={bem()}>
      <div className={`container ${bem('container')}`}>
        <Logo className={bem('logo')} />
        <div className={bem('address')}>
          <h4>Address</h4>
          <p className={bem('address-text')}>Svobody str. 35</p>
          <p className={bem('address-text')}>Kyiv</p>
          <p className={bem('address-text')}>Ukraine</p>
        </div>
        <div className={bem('contact')}>
          <h4>Contact us</h4>
          <div className={bem('icons')}>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <Instagram className={bem('media-icon')} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <Facebook className={bem('media-icon')} />
            </a>
            <a href="https://whatsapp.com" target="_blank" rel="noreferrer">
              <Whatsapp className={bem('media-icon')} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
