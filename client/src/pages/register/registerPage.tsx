import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './registerPage.module.scss';

export const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleChageEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChagePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <section className={styles.loginSection}>
      <div className={styles.loginBlock}>
        <h2 className={styles.title}>
          Sign up
        </h2>

        <p className={styles.description}>
          If you already have an account register <br />
          You can
          <Link
            to={'/login'}
            className={styles.link}
          >
            Login here !
          </Link>
        </p>

        <form className={styles.form}>
          <div className={styles.inputWrapper}>
            <label className={styles.label}>First name</label>

            <input
              className={styles.input}
              type="text"
              // onChange={handleChageEmail}
              // value={email}
              placeholder='Enter your First name'
            />

            <label className={styles.label}>Last name</label>

            <input
              className={styles.input}
              type="text"
              // onChange={handleChageEmail}
              // value={email}
              placeholder='Enter your Last name'
            />

            <label className={styles.label}>Email</label>

            <input
              className={styles.input}
              type="email"
              onChange={handleChageEmail}
              value={email}
              placeholder='Enter your email address'
            />

            <label className={styles.label}>Username</label>

            <input
              className={styles.input}
              type="text"
              // onChange={handleChageEmail}
              // value={email}
              placeholder='Enter your User name'
            />

            <label className={styles.label}>Phone</label>

            <input
              className={styles.input}
              type="phone"
              // onChange={handleChageEmail}
              // value={email}
              placeholder='Enter your Phone'
            />

            <label className={styles.label}>Password</label>

            <input
              className={styles.input}
              type="password"
              onChange={handleChagePassword}
              value={password}
              placeholder='Enter your Password'
            />
          </div>

          <button type='submit' className={styles.button}>Register</button>
        </form >
      </div >

      <div className={styles.imageWrapper}>
        <div className={styles.image}></div>
      </div>
    </section>
  )
}

