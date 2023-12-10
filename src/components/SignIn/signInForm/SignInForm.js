import { Input } from 'antd';

import errorIcon from '../../../assets/img/icons/icons-signIn/error-input-icon.png';

const SignInForm = ({ formik, loginError, styles}) => (
  <form className={`${styles.signIn__form} ${styles.form}`} onSubmit={formik.handleSubmit}>

    <div className={styles.signIn__form__component}>
      <label className={styles.form__label}>Пошта</label>
      <Input
        className={styles.form__input}
        status={formik.touched.email && formik.errors.email || loginError ? 'error' : ''}
        placeholder='your.email@example.com'
        type='email'
        id='email'
        name='email'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        autoComplete='email'
        required
      />

      {formik.touched.email && formik.errors.email && (
        <div className={styles.form__error}>
          <img src={errorIcon} alt='Error icon' />
          {formik.errors.email}
        </div>
      )}
    </div>

    <div className={styles.signIn__form__component}>
      <label className={styles.form__label}>Пароль:</label>
      <Input.Password
        className={styles.form__input}
        status={formik.touched.password && formik.errors.password || loginError ? 'error' : ''}
        id='password'
        name='password'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        autoComplete='on'
        required
      />

      {formik.touched.password && formik.errors.password && (
        <div className={styles.form__error}>
          <img src={errorIcon} alt='Error icon' />
          {formik.errors.password}
        </div>
      )}
      {loginError && (
        <div className={styles.form__error}>
          <img src={errorIcon} alt='Error icon' />
          {loginError}
        </div>
      )}
    </div>

    <a href='/' className={styles.form__forgotPassword}>
      Я не пам’ятаю пароль
    </a>

    <button
      type='submit'
      className={`${styles.form__submit} ${formik.isValid && formik.touched.email && formik.touched.password ? styles.validSubmit : ''}`}
    >
      Увійти
    </button>
  </form>
);

export default SignInForm;
