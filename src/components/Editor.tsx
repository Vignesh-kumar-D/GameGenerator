import React, { useState, useEffect, useRef } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import styles from './Editor.module.css';
import { getSrc, Library } from '../utils/utils';

interface EditorProps {
  onCodeChange: (code: string) => void;
  javascriptCode: string;
  selectedLibraries: Library[];
}

const Editor: React.FC<EditorProps> = ({
  onCodeChange,
  javascriptCode,
  selectedLibraries,
}) => {
  const [srcDoc, setSrcDoc] = useState<string>('');
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView>();

  // Initialize CodeMirror
  useEffect(() => {
    if (!editorRef.current) return;

    const view = new EditorView({
      doc: javascriptCode,
      extensions: [
        basicSetup,
        javascript(),
        oneDark,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onCodeChange(update.state.doc.toString());
          }
        }),
      ],
      parent: editorRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
    };
  }, []);

  useEffect(() => {
    if (
      viewRef.current &&
      viewRef.current.state.doc.toString() !== javascriptCode
    ) {
      viewRef.current.dispatch({
        changes: {
          from: 0,
          to: viewRef.current.state.doc.length,
          insert: javascriptCode,
        },
      });
    }
  }, [javascriptCode]);

  // Debounced preview update
  useEffect(() => {
    const timer = setTimeout(() => {
      const html = getSrc(javascriptCode, selectedLibraries);
      setSrcDoc(html);
    }, 1000);

    return () => clearTimeout(timer);
  }, [javascriptCode, selectedLibraries]);

  return (
    <div className={styles.editorContainer}>
      <div className={styles.editorPane}>
        <div ref={editorRef} className={styles.codeMirrorWrapper} />
      </div>
      <div className={styles.previewPane}>
        <iframe
          srcDoc={srcDoc}
          title="preview"
          sandbox="allow-scripts"
          className={styles.previewIframe}
        />
      </div>
    </div>
  );
};

export default Editor;
