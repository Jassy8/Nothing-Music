import { Menu } from 'lucide-react';
import { PrefetchLink } from '@/components/PrefetchLink';
import { useUi } from '@/state/ui';

/** Below 484px the sidebar folds into this bar and a drawer — Nothing OS style. */
export function MobileTopBar() {
  const setDrawerOpen = useUi((s) => s.setDrawerOpen);
  return (
    <header className="hidden max-sm:absolute max-sm:inset-x-0 max-sm:top-0 max-sm:z-[calc(var(--z-web-chrome)-2)] max-sm:grid max-sm:h-(--mobile-top-bar-height) max-sm:grid-cols-[44px_1fr_44px] max-sm:items-center max-sm:px-3.5 max-sm:bg-[#000000e6] max-sm:border-b max-sm:border-[#ffffff0a] max-sm:backdrop-blur-[16px]">
      <button className="grid size-11 place-items-center rounded-[4px] transition-colors hover:bg-[#ffffff08]" aria-label="Open menu" onClick={() => setDrawerOpen(true)}>
        <Menu size={20} strokeWidth={1.5} />
      </button>
      <PrefetchLink to="/home" className="inline-flex items-center gap-2 justify-self-center" aria-label="Nothing Music, Home">
        {/* Nothing red dot — mobile brand mark. */}
        <span className="size-2 rounded-full bg-nothing-red" />
        <span className="type-[600_14px/18px] tracking-[0.04em] uppercase text-primary">Nothing</span>
        <span className="type-[300_14px/18px] tracking-[0.04em] uppercase text-secondary">Music</span>
      </PrefetchLink>
      <span className="w-11" />
    </header>
  );
}
