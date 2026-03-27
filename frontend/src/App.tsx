import { useState } from 'react';
import { PromptInputBox } from './components/prompt';
import type { ToolOption } from './components/prompt';

const BRAND = 'Allere';

const DEFAULT_TOOLS: ToolOption[] = [
  { id: 'makeX', label: 'Make X interesting' },
  { id: 'summarize', label: 'Feynman technique' },
  { id: 'questions', label: 'Generate questions' },
];

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [speechError, setSpeechError] = useState<string | null>(null);
  const sentenceText = 'text-[clamp(14px,4.5vw,28px)] font-bold leading-[1.15]';

  function handlePromptChange(next: string) {
    setSpeechError(null);
    setPrompt(next);
  }

  return (
    <div className="min-h-screen w-full bg-white px-4 pt-6 pb-12 text-black sm:px-6">
      <header className="relative z-10 mb-7 flex w-full items-center justify-start">
        <div className="text-xl font-extrabold tracking-wide sm:text-4xl" aria-label={BRAND}>
          {BRAND}
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-1 sm:px-2">
        <div className="mt-0 flex w-full max-w-full flex-wrap items-baseline justify-center gap-x-2 gap-y-1.5 sm:gap-x-2.5">
          <span className={`shrink-0 ${sentenceText}`}>What are we learning today?</span>
        </div>

        <div className="flex w-full max-w-2xl flex-col items-stretch">
          <PromptInputBox
            value={prompt}
            onChange={handlePromptChange}
            tools={DEFAULT_TOOLS}
            
            onSpeechError={setSpeechError}
          />
          {speechError ? (
            <p className="mt-2 text-center text-sm text-red-600" role="status">
              {speechError}
            </p>
          ) : null}
        </div>
      </main>
    </div>
  );
}
