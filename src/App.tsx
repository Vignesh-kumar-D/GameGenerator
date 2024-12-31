import React, { useState } from 'react';
import styles from './App.module.css';
import Header from './components/Header';
import Editor from './components/Editor';

function App() {
  const [javascriptCode, setJavascriptCode] = useState('');
  const handleCodeChange = (newCode: string): void => {
    setJavascriptCode(newCode);
  };
  const handlePublish = () => {
    // For now, just log the code
    console.log('Publishing code:', javascriptCode);
  };

  return (
    <div className={styles.container}>
      <Header onPublish={handlePublish} />
      <main className={styles.main}>
        <div className={styles.content}>
          <Editor
            javascriptCode={javascriptCode}
            onCodeChange={handleCodeChange}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
