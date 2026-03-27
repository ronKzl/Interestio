/** Merge className fragments (Tailwind-friendly). */
export function cn(...parts: Array<string | undefined | false>): string {
  return parts.filter(Boolean).join(' ');
}
