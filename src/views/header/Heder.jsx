import { createBem } from '@/utils/createBem';

import styles from './Header.module.scss';
import Logo from '../../../public/images/icons/logo.svg';
import UserLogo from '../../../public/images/icons/userlogo.svg';
import ArrowOpen from '../../../public/images/icons/arrowOpen.svg';
import ArrowClose from '../../../public/images/icons/arrowClose.svg';

import { useState, useContext } from 'react';

import { UserContext } from '@/context/userContext';

import MobileMenu from '@/components/mobileMenuHeader/MobileMenuHeader';
import ModalForm from '@/components/modalForm/ModalForm';

const bem = createBem('header', styles);

export default function Header() {
  const { user, isAuth } = useContext(UserContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleModal = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
      setTimeout(() => setShowModal(false), 300);
    } else {
      setShowModal(true);
      setTimeout(() => setIsModalOpen(true), 10);
    }
  };

  const handleToggleMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      setTimeout(() => setShowMenu(false), 300);
    } else {
      setShowMenu(true);
      setTimeout(() => setIsMenuOpen(true), 10);
    }
  };

  return (
    <header className={bem()}>
      <div className="container">
        <div className={bem('headerWrapper')}>
          <div className={bem('headerBlock')}>
            <div className={bem('logo')}>
              <Logo />
            </div>
            <nav className={bem('navigation')}>
              <ul className={bem('menu')}>
                <li className={bem('item')}>
                  <a className={bem('item-link')} href="">
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
            </nav>
          </div>

          <div>
            <div className={bem('userBlockWrapper')}>
              <div className={bem('userBlock')}>
                <button onClick={handleModal} className={bem('btnHeader')}>
                  Sign Up
                </button>
                {user ? (
                  <p>{user}</p>
                ) : (
                  <div className={bem('avatar')}>
                    <UserLogo />
                  </div>
                )}
              </div>
            </div>

            <div className={bem('headerMenu')}>
              <button className={bem('headerMenuBtn')} onClick={handleToggleMenu}>
                <div className={bem('buttonInsideBlock')}>
                  <p>Menu</p>
                  <div className={bem('headerMenuArrow')}>
                    {showMenu ? <ArrowOpen /> : <ArrowClose />}
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <ModalForm onClick={handleModal} isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      )}

      {showMenu && <MobileMenu isOpen={isMenuOpen} onClick={handleModal} />}
    </header>
  );
}

// export default function Header () {

//     const [isModalOpen, setIsModalOpen] = useState(false)
//     const [showModal, setShowModal] = useState(false)

//     const [isMenuOpen, setIsMenuOpen] = useState(false)
//     const [showMenu, setShowMenu] = useState(false)

//     // const toggleMenuMobile = () => {
//     //     setShowMenu(!showMenu)
//     // }

//     const showModalFn = () => {
//         setIsModalOpen(true)
//     }

//     const hideModalFn = () => {

//         setIsModalOpen(false)

//     }

//     const handleModal = () => {
//         if (isModalOpen){
//             setIsModalOpen(false)
//             setTimeout(() => setShowModal(false), 1000)
//         }else{
//             setShowModal(true)
//             setTimeout(() => setIsModalOpen(true), 1000)
//         }
//     }

//     const handleToggleMenu = () => {
//         if (isMenuOpen){
//             setIsMenuOpen(false)
//             setTimeout(() => setShowMenu(false), 1000)
//         }else{
//             setShowMenu(true)
//             setTimeout(() => setIsMenuOpen(true), 10)
//         }

//     }

//     return (
//         <header className={bem()}>
//             <div className='container'>

//             <div className={bem("headerWrapper")}>
//                 <div className={bem("headerBlock")}>
//                     <div className={bem("logo")}>
//                         <Logo/>
//                     </div>

//                     <nav className={bem("navigation")}>
//                         <ul className={bem("menu")}>
//                             <li className={bem("item")}><a href="">Who we are</a></li>
//                             <li className={bem("item")}><a href="">Contacts</a></li>
//                             <li className={bem("item")}><a href="">Menu</a></li>
//                         </ul>
//                     </nav>
//                 </div>

//                 <div >
//                     <div className={bem("userBlockWrapper")}>
//                         <div className={bem("userBlock")}>
//                             {/* <ButtonHeader onClick={showModalFn}></ButtonHeader> */}
//                             {/* <ButtonHeader onClick={handleModal}></ButtonHeader> */}
//                             <button onClick={handleModal}>penis</button>

//                             <div className={bem("avatar")}>
//                                 <UserLogo></UserLogo>
//                             </div>
//                         </div>
//                     </div>

//                     <div className={bem('headerMenu')}>
//                         <button className={bem('headerMenuBtn')} onClick={handleToggleMenu}>
//                             <div className={bem("buttonInsideBlock")}>
//                                 <p>Menu</p>
//                                 <div className={bem('headerMenuArrow')}>
//                                     {showMenu? <ArrowOpen></ArrowOpen> : <ArrowClose></ArrowClose>}
//                                 </div>

//                             </div>

//                         </button>
//                     </div>
//                 </div>

//             </div>

//             </div>
//             {isModalOpen && <SingUpModal onClick={hideModalFn} isOpen={isModalOpen}></SingUpModal>}

//             {showMenu && <MobileMenu isOpen={isMenuOpen} onClick={showModalFn}></MobileMenu>}

//         </header>

//     )
// }
