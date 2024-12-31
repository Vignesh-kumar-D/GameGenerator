import React from 'react';
import styles from './Header.module.css';

type Props = {
  onPublish: () => void;
};
const Header = ({ onPublish }: Props) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Game Generator</h1>
          <button onClick={() => onPublish()} className={styles.publishButton}>
            Publish
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
