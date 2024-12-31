import React, { useState, useEffect, useRef } from 'react';
import styles from './Editor.module.css';
import { getSrc } from '../utils/utils';

interface EditorProps {
  onCodeChange: (code: string) => void;
  javascriptCode: string;
}

const Editor: React.FC<EditorProps> = ({ onCodeChange, javascriptCode }) => {
  const [srcDoc, setSrcDoc] = useState<string>('');

  // Debounced preview update
  useEffect(() => {
    const timer = setTimeout(() => {
      const html = getSrc(javascriptCode);
      setSrcDoc(html);
    }, 1000);

    return () => clearTimeout(timer);
  }, [javascriptCode, onCodeChange]);

  return (
    <div className={styles.editorContainer}>
      <div className={styles.editorPane}>
        <textarea
          value={javascriptCode}
          onChange={(e) => onCodeChange(e.target.value)}
          className={styles.codeTextarea}
          spellCheck="false"
          placeholder="Write your JavaScript code here..."
        />
      </div>
      <div className={styles.previewPane}>
        <iframe
          srcDoc={srcDoc}
          title="preview"
          sandbox="allow-scripts"
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      </div>
    </div>
  );
};

export default Editor;
