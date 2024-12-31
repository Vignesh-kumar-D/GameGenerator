import React, { useState, useRef, useEffect } from 'react';
import styles from './Prompt.module.css';

interface PromptProps {
  onSubmit: (prompt: string) => void;
}

const Prompt: React.FC<PromptProps> = ({ onSubmit }) => {
  const [prompt, setPrompt] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
    adjustHeight();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt);
      setPrompt(''); // Clear form after submission
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [prompt]);

  return (
    <form onSubmit={handleSubmit} className={styles.promptContainer}>
      <label htmlFor="gamePrompt" className={styles.label}>
        Write your game prompt
      </label>
      <div className={styles.textareaWrapper}>
        <textarea
          id="gamePrompt"
          ref={textareaRef}
          value={prompt}
          onChange={handleChange}
          className={styles.promptTextarea}
          placeholder="Describe the game you want to create..."
          required
          aria-label="Game prompt"
        />
      </div>
      <div className={styles.submitButtonWrapper}>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={!prompt.trim()}
        >
          Generate Game
        </button>
      </div>
    </form>
  );
};

export default Prompt;
