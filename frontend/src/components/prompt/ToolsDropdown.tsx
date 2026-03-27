import { useEffect, useId, useRef, useState } from 'react';
import { cn } from '../../lib/cn';
import { IconChevronDown, IconGear } from './PromptIcons';
import type { PromptBoxStyles, ToolOption } from './types';

type ToolsDropdownProps = {
  tools: ToolOption[];
  selectedToolId: string;
  onSelectTool: (id: string) => void;
  styles: PromptBoxStyles;
};

export function ToolsDropdown({ tools, selectedToolId, onSelectTool, styles }: ToolsDropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const menuId = useId();

  const selected = tools.find((t) => t.id === selectedToolId) ?? tools[0];

  useEffect(() => {
    if (!open) return;
    function onDocMouseDown(e: MouseEvent) {
      const el = rootRef.current;
      if (!el || el.contains(e.target as Node)) return;
      setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDocMouseDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocMouseDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className={styles.toolsTrigger}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
      >
        <IconGear title="Tools" />
        <span className="max-w-[140px] truncate sm:max-w-[200px]">{selected?.label ?? 'Tools'}</span>
        <IconChevronDown className={styles.toolsChevron} />
      </button>

      {open ? (
        <div id={menuId} className={styles.toolsMenu} role="menu">
          {tools.map((tool) => {
            const active = tool.id === selectedToolId;
            return (
              <button
                key={tool.id}
                type="button"
                role="menuitem"
                className={cn(styles.toolsMenuItem, active && styles.toolsMenuItemActive)}
                onClick={() => {
                  onSelectTool(tool.id);
                  setOpen(false);
                }}
              >
                {tool.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
