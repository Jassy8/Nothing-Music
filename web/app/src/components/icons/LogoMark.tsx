import markSvg from '@/assets/logo-mark.svg?raw';

/**
 * Nothing OS logo mark: geometric circular glyph with Nothing red dot.
 */
export function LogoMark({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{ display: 'inline-flex', width: size, height: size }}
      dangerouslySetInnerHTML={{ __html: markSvg }}
    />
  );
}
