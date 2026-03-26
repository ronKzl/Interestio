import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const MAX_TOPIC_WORDS = 25;
const BRAND = 'Interstio';

export default function App() {
  const measureRef = useRef<HTMLSpanElement | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem('theme') : null;
    if (saved === 'light' || saved === 'dark') return saved;
    const prefersDark =
      typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });

  const [topic, setTopic] = useState('');
  const [inputWidthPx, setInputWidthPx] = useState(220);
  const placeholder = 'any topic';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  useLayoutEffect(() => {
    const measureEl = measureRef.current;
    if (!measureEl) return;

    // Clamp to keep the sentence layout stable on smaller screens.
    const viewportMax = Math.max(160, Math.min(640, window.innerWidth - 120));
    const measured = measureEl.offsetWidth;
    const clamped = Math.max(140, Math.min(measured, viewportMax));
    setInputWidthPx(clamped);
  }, [topic, theme]);

  function toggleTheme() {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }

  function handleTopicChange(next: string) {
    const tokens = next.trim().split(/\s+/).filter(Boolean);
    if (tokens.length > MAX_TOPIC_WORDS) {
      setTopic(tokens.slice(0, MAX_TOPIC_WORDS).join(' '));
      return;
    }
    // Keep `topic` as typed (including intermediate empty states).
    setTopic(next);
  }

  return (
    <div className="page">
      <header className="topbar">
        <div className="brand" aria-label={BRAND}>
          {BRAND}
        </div>
        <button type="button" className="themeToggle" onClick={toggleTheme}>
          {theme === 'dark' ? 'Dark' : 'Light'} mode
        </button>
      </header>

      <main className="hero">
        <form
          className="topicForm"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <span className="sentenceText">Make</span>

          <span className="topicMeasure" ref={measureRef} aria-hidden="true">
            {topic.length ? topic : placeholder}
          </span>

          <input
            className="topicInput"
            value={topic}
            onChange={(e) => handleTopicChange(e.target.value)}
            spellCheck={true}
            autoComplete="off"
            inputMode="text"
            placeholder={placeholder}
            style={{ width: `${inputWidthPx}px` }}
            aria-label="Topic"
            maxLength={MAX_TOPIC_WORDS}
          />

          <span className="sentenceText">interesting!</span>
        </form>
      </main>
    </div>
  );
}
