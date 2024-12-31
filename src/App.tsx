import React, { useState } from 'react';
import styles from './App.module.css';
import Header from './components/Header';
import Editor from './components/Editor';
import Prompt from './components/Prompt';

function App() {
  const initialCode = '// write your javascript code here \n';
  const [javascriptCode, setJavascriptCode] = useState(initialCode);
  const handleCodeChange = (newCode: string): void => {
    setJavascriptCode(newCode);
  };
  const handlePublish = () => {
    // For now, just log the code
    console.log('Publishing code:', javascriptCode);
  };
  const handlePromptSubmit = (prompt: string) => {
    console.log('Submitted prompt:', prompt);
  };
  return (
    <div className={styles.container}>
      <Header onPublish={handlePublish} />
      <main className={styles.main}>
        <Prompt onSubmit={handlePromptSubmit} />
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
