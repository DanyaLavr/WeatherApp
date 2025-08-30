import {createBem} from '@/utils/createBem'

import styles from './MobileMenuHeader.module.scss'






const bem = createBem('mobileMenu', styles)

export default function MobileMenu ( {onClick, isOpen} ) {



    return (
            <div className={`${bem()} ${isOpen ? bem('show') : ""}`} >
                <ul className={bem("menuForMobile")}>
                    <li className={bem("item")}><a className={bem("item-link")} href="">Who we are</a></li>
                    <li className={bem("item")}><a className={bem("item-link")} href="">Contacts</a></li>
                    <li className={bem("item")}><a className={bem("item-link")} href="">Menu</a></li>
                </ul>

                <div className={bem("userBlockMobile")}>


                    <div className={bem("avatar")}>

                        <img src="../../../public/images/icons/userlogo.svg" alt="userlogo" />
                    </div>

                    <button onClick={onClick} className={bem('buttonMenu')}>Sign Up</button>


                </div>
            </div>

    )

}