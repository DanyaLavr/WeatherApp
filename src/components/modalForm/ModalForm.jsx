import { createBem } from '@/utils/createBem';
import styles from './ModalForm.module.scss';
import { auth } from '@/lib/db';
import CloseX from '../../../public/images/icons/closeX.svg';



import { useState, useRef, useContext } from 'react';


import { UserContext } from '@/context/userContext';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

import LogInForm from '../logInForm/LogInForm';

import SignUpForm from '../signUpForm/SignUpForm';


const bem = createBem('modal', styles);

export default function ModalForm({ onClick, isOpen, setIsModalOpen }) {
  const { setIsAuth, setUser } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false)



  const userNameInp = useRef('');
  const emailInp = useRef('');
  const passwordInp = useRef('');

  const loginEmail = useRef('');
  const loginPassword = useRef('');

  const [isLoginModal, setisLoginModal] = useState(false);

  const changeForm = () => {
    setisLoginModal(!isLoginModal);
  };

  const handleRegister = async (values) => {
    setIsLoading(true)

    try {
      
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      await updateProfile(userCredential.user, { displayName: values.username });
      setUser(values.username);
      setIsAuth(true);
      setIsModalOpen(false);
    } catch (error) {
      if (error.code === 'auth/weak-password') alert('Слабкий пароль');
      if (error.code === 'auth/email-already-in-use') alert('Email вже використовується');
    }finally{
      setIsLoading(false)

    }
  };

  const handleLogin = async (values) => {
    setIsLoading(true)


    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      setUser(userCredential.user.displayName);
      setIsModalOpen(false);
    } catch (error) {
      if (error.code === 'auth/invalid-credential') alert('Користувач не зареєстрований');
      if (error.code === 'auth/wrong-password') alert('Wrong password');
      if (error.code === 'auth/user-not-found') alert('User not found');
    }finally{
      setIsLoading(false)

    }
  };


  return (
    <div className={`${bem('overlay')} ${isOpen ? bem('show') : ''}`} onClick={onClick}>
      <div className={bem()} onClick={(e) => e.stopPropagation()}>
        <button className={bem('closeBtn')} onClick={onClick}>
          <CloseX />
        </button>
        {isLoading && <p className={bem('loading')}>loading...</p>}
        {!isLoginModal ? (
          <>
            <SignUpForm
              refUsername={userNameInp}
              refEmail={emailInp}
              refPassword={passwordInp}
              changeForm={changeForm}
              handleRegister={handleRegister}
            ></SignUpForm>
          </>
        ) : (
          <>
            <LogInForm
              refEmail={loginEmail}
              refPassword={loginPassword}
              changeForm={changeForm}
              handleLogin={handleLogin}
            ></LogInForm>
          </>
        )}
      </div>
    </div>
  );
}


