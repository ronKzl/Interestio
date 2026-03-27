import { useState } from 'react';
import { MicButton } from './MicButton';
import { defaultPromptBoxStyles } from './promptBoxStyles';
import { ToolsDropdown } from './ToolsDropdown';
import type { PromptBoxStyles, ToolOption } from './types';

export type PromptInputBoxProps = {
  value: string;
  onChange: (value: string) => void;
  tools: ToolOption[];
  /** Controlled selection; omit to manage selection internally. */
  selectedToolId?: string;
  onSelectTool?: (id: string) => void;
  placeholder?: string;
  /** Visual tokens; merged on top of `defaultPromptBoxStyles`. */
  styles?: Partial<PromptBoxStyles>;
  /** Shown when speech fails or permission denied (optional). */
  onSpeechError?: (message: string) => void;
};

function mergeStyles(partial?: Partial<PromptBoxStyles>): PromptBoxStyles {
  return { ...defaultPromptBoxStyles, ...partial };
}

export function PromptInputBox({
  value,
  onChange,
  tools,
  selectedToolId: selectedToolIdProp,
  onSelectTool,
  placeholder = 'Type your message…',
  styles: stylesProp,
  onSpeechError,
}: PromptInputBoxProps) {
  const styles = mergeStyles(stylesProp);

  const firstId = tools[0]?.id ?? '';
  const [internalToolId, setInternalToolId] = useState(firstId);

  const selectedToolId = selectedToolIdProp ?? internalToolId;

  function handleSelectTool(id: string) {
    if (selectedToolIdProp === undefined) setInternalToolId(id);
    onSelectTool?.(id);
  }

  function appendTranscript(text: string) {
    const base = value.replace(/\s+$/u, '');
    onChange(base ? `${base} ${text}` : text);
  }

  return (
    <div className={styles.root}>
      <textarea
        className={styles.textarea}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        spellCheck
        autoComplete="off"
      />

      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          {tools.length > 0 ? (
            <ToolsDropdown
              tools={tools}
              selectedToolId={selectedToolId || firstId}
              onSelectTool={handleSelectTool}
              styles={styles}
            />
          ) : null}
        </div>
        <div className={styles.toolbarRight}>
          <MicButton styles={styles} onFinalTranscript={appendTranscript} onError={onSpeechError} />
        </div>
      </div>
    </div>
  );
}
