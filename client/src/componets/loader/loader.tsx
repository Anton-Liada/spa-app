import React from 'react';
import styles from './loader.module.scss';

export const Loader: React.FC = () => (
  <div className={styles.loader}>
    <div className={styles.loaderContent} />
  </div>
);
