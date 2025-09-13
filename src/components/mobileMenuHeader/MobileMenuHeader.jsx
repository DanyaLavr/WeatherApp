import { createBem } from '@/utils/createBem';
import UserLogo from '../../../public/images/icons/userlogo.svg';

import styles from './MobileMenuHeader.module.scss';

const bem = createBem('mobileMenu', styles);

export default function MobileMenu({ onClick, isOpen, user, handleLogOut }) {
  return (
    <div className={`${bem()} ${isOpen ? bem('show') : ''}`}>
      <ul className={bem('menuForMobile')}>
        <li className={bem('item')}>
          <a className={bem('item-link')} href="#hero">
            Who we are
          </a>
        </li>
        <li className={bem('item')}>
          <a className={bem('item-link')} href="#footer">
            Contacts
          </a>
        </li>
        <li className={bem('item')}>
          <a className={bem('item-link')} href="#weather-card">
            Menu
          </a>
        </li>
      </ul>

      <div className={bem('userBlockMobile')}>
        {user ? (
          <>
            <p>{user}</p>

            <button onClick={handleLogOut} className={bem('buttonMenu')}>
              Log Out
            </button>
          </>
        ) : (
          <>
            <div className={bem('avatar')}>
              <img src="/images/icons/userlogo.svg" alt="" />
            </div>
            <button onClick={onClick} className={bem('buttonMenu')}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
}
