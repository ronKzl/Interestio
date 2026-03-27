import type { PromptBoxStyles } from './types';

/** Default look: light surface; swap or override by passing `styles` into `PromptInputBox`. */
export const defaultPromptBoxStyles: PromptBoxStyles = {
  root: 'flex w-full max-w-2xl flex-col gap-3 rounded-[28px] border border-black/10 bg-neutral-100 p-4 shadow-sm',
  textarea:
    'min-h-[88px] w-full resize-none bg-transparent text-[15px] leading-relaxed text-neutral-900 placeholder:text-neutral-400 outline-none',
  toolbar: 'flex items-center justify-between gap-3 border-t border-black/5 pt-3',
  toolbarLeft: 'flex min-w-0 items-center gap-2',
  toolbarRight: 'flex shrink-0 items-center gap-2',
  toolsTrigger:
    'inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-neutral-800 outline-none transition hover:bg-black/5 focus-visible:ring-2 focus-visible:ring-black/20',
  toolsChevron: 'h-4 w-4 text-neutral-500',
  toolsMenu:
    'absolute left-0 z-20 mt-2 min-w-[220px] overflow-hidden rounded-2xl border border-black/10 bg-white py-1 text-sm shadow-lg',
  toolsMenuItem:
    'w-full px-4 py-2.5 text-left text-neutral-800 outline-none transition hover:bg-neutral-100 focus:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black/15',
  toolsMenuItemActive: 'bg-neutral-100 font-medium',
  micButton:
    'inline-flex h-10 w-10 items-center justify-center rounded-full text-neutral-800 outline-none transition hover:bg-black/5 focus-visible:ring-2 focus-visible:ring-black/20 disabled:cursor-not-allowed disabled:opacity-40',
  micButtonListening: 'bg-red-500/15 text-red-700',
};
