import { X } from 'lucide-react';
import type { ReactNode } from 'react';

interface BannerProps {
  title: string;
  detail: string;
  action: ReactNode;
  onDismiss?: () => void;
}

/**
 * Nothing OS banner — industrial, dark with red accent border.
 * An invitation, not an error.
 */
export function Banner({ title, detail, action, onDismiss }: BannerProps) {
  return (
    <div
      className="relative z-(--z-web-chrome) flex min-h-[64px] items-center gap-4 border-t border-nothing-red bg-[#0d0d0d] px-[30px] py-3 text-white max-sm:pr-4 max-sm:pl-5"
      role="region"
      aria-label={title}
    >
      {/* Nothing red accent dot. */}
      <span className="size-2 flex-none rounded-full bg-nothing-red" />
      <div className="min-w-0 flex-1">
        <p className="type-title-2-emphasized max-sm:type-[600_14px/18px]">{title}</p>
        <p className="mt-0.5 type-callout-medium text-[#ffffff60]">{detail}</p>
      </div>
      <div className="shrink-0">{action}</div>
      {onDismiss && (
        <button
          className="-mr-3.5 grid size-7 place-items-center rounded-[4px] text-[#ffffff60] transition-colors hover:bg-[#ffffff0a] hover:text-primary"
          onClick={onDismiss}
          aria-label="Dismiss"
        >
          <X size={14} strokeWidth={2} />
        </button>
      )}
    </div>
  );
}

export const bannerButtonClass =
  'inline-flex h-8 items-center whitespace-nowrap rounded-[4px] border border-[#ffffff20] bg-white px-4 type-body-emphasized text-black hover:bg-[#ffffffd0] transition-colors duration-75';
