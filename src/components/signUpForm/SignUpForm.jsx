import { createBem } from '@/utils/createBem';
import styles from './SignUpForm.module.scss';

import { SignUpSchema } from '@/lib/validSchemas';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const bem = createBem('signUpForm', styles);

const SignUpForm = ({ changeForm, handleRegister }) => {
  return (
    <Formik
      initialValues={{ username: '', email: '', password: '' }}
      validationSchema={SignUpSchema}
      onSubmit={(values, { setSubmitting }) => {
        handleRegister(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className={bem('form')}>
          <h2 className={bem('title')}>Sign up</h2>

          <label className={bem('label')}>
            Username:
            <Field className={bem('input')} name="username" placeholder="Username" />
            <ErrorMessage className={bem('error')} name="username" component="div" style={{ color: 'red' }} />


          </label>

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
                Sign up
              </button>
            </div>

            <p className={bem('text')}>
              Already have an account?{' '}
              <button type="button" className={bem('loginLink')} onClick={changeForm}>
                Log in
              </button>
            </p>
          </div>


        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
