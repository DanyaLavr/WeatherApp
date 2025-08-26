import { createBem } from '@/utils/createBem';
import styles from './LogInFrom.module.scss';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { LogInSchema } from '@/lib/validSchemas';



const bem = createBem('logInForm', styles);

const LogInForm = ({ handleLogin, changeForm }) => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LogInSchema}
      onSubmit={(values, { setSubmitting }) => {
        handleLogin(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className={bem('form')}>
          <h2 className={`${bem('title')} ${bem('login-title')}`}>Log in</h2>

          <label className={bem('label')}>
            E-mail:
            <Field className={bem('input')} type="email" name="email" placeholder="E-mail" />
            <ErrorMessage className={bem('error')} name="email" component="div" style={{ color: 'red' }} />


          </label>

          <label className={bem('label')}>
            Password:
            <Field
              className={bem('input')}
              type="password"
              name="password"
              placeholder="Password"
            />
            <ErrorMessage className={bem('error')} name="password" component="div" style={{ color: 'red' }} />

          </label>

          <div>
            <div className={bem('btn')}>
              <button type="submit" className={bem('btnModal')} disabled={isSubmitting}>
                Log in
              </button>
            </div>

            <p className={`${bem('text')} ${bem('login-btn')}`}>
              No account?
              <button type="button" className={bem('loginLink')} onClick={changeForm}>
                Sign up
              </button>
            </p>
          </div>



        </Form>
      )}
    </Formik>
  );
};


export default LogInForm;
