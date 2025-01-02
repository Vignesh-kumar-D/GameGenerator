import React, {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import styles from './Prompt.module.css';
import { Library } from '../utils/utils';

const LIBRARIES: Library[] = [
  {
    id: 'pixi',
    name: 'PixiJS',
    cdn: 'https://cdnjs.cloudflare.com/ajax/libs/pixi.js/7.3.3/pixi.min.js',
  },
  {
    id: 'p5',
    name: 'p5.js',
    cdn: 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js',
  },
  {
    id: 'phaser',
    name: 'Phaser',
    cdn: 'https://cdnjs.cloudflare.com/ajax/libs/phaser/3.70.0/phaser.min.js',
  },
];

interface PromptProps {
  onSubmit: (prompt: string) => void;
  setSelectedLibs: Dispatch<SetStateAction<Library[]>>;
  selectedLibs: Library[];
}

const Prompt: React.FC<PromptProps> = ({
  onSubmit,
  setSelectedLibs,
  selectedLibs,
}) => {
  const [prompt, setPrompt] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
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

  const handleLibraryToggle = (library: Library) => {
    setSelectedLibs((prev: Library[]) => {
      const isSelected = prev.find((lib) => lib.id === library.id);
      if (isSelected) {
        return prev.filter((lib) => lib.id !== library.id);
      } else {
        return [...prev, library];
      }
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt);
      setPrompt(''); // Clear form after submission
      setSelectedLibs([]); // Reset library selection
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [prompt]);

  return (
    <form onSubmit={handleSubmit} className={styles.promptContainer}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '1rem',
          alignItems: 'center',
        }}
      >
        <label htmlFor="gamePrompt" className={styles.label}>
          Write your game prompt
        </label>
        <div className={styles.librariesDropdown} ref={dropdownRef}>
          <button
            type="button"
            className={styles.dropdownTrigger}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedLibs.length
              ? `${selectedLibs.length} Libraries selected`
              : 'Select Libraries'}
            <span
              className={`${styles.dropdownArrow} ${
                isDropdownOpen ? styles.open : ''
              }`}
            >
              ▼
            </span>
          </button>
          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              {LIBRARIES.map((library) => (
                <div
                  key={library.id}
                  className={`${styles.dropdownItem} ${
                    selectedLibs.find((lib) => lib.id === library.id)
                      ? styles.selected
                      : ''
                  }`}
                  onClick={() => handleLibraryToggle(library)}
                >
                  <span className={styles.checkbox}>
                    {selectedLibs.find((lib) => lib.id === library.id) && '✓'}
                  </span>
                  {library.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={styles.formContainer}>
        <div className={styles.textareaWrapper}>
          <textarea
            id="gamePrompt"
            ref={textareaRef}
            disabled={true}
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
      </div>
    </form>
  );
};

export default Prompt;
