import { ArrowUpRight, ListMusic, Settings } from 'lucide-react';
import { MdOutlineExtension } from 'react-icons/md';
import { PrefetchLink, PrefetchNavLink } from '@/components/PrefetchLink';
import { LogoMark } from '@/components/icons/LogoMark';
import {
  AlbumsIcon,
  AllPlaylistsIcon,
  ArtistsIcon,
  HomeIcon,
  MadeForYouIcon,
  NewIcon,
  RecentlyAddedIcon,
  SearchIcon,
  SongsIcon,
  type NavIconProps,
} from '@/components/icons/NavIcons';
import { hrefFor } from '@/components/music/links';
import { config } from '@/config';
import { LIBRARY_SECTIONS, type LibrarySection } from '@/data/music/library';
import { useLibraryPlaylists, useSignedIn } from '@/data/music/queries';
import { useSpotifyPlaylists } from '@/data/spotify/queries';
import { useExtensionUpdate } from '@/extension/useExtensionUpdate';
import { useSpotifySignedIn } from '@/extension/useSpotifyAuth';
import { useUi } from '@/state/ui';
import { AccountButton } from './AccountButton';

interface NavItem {
  to: string;
  label: string;
  Icon: (props: NavIconProps) => React.ReactNode;
}

const PRIMARY: NavItem[] = [
  { to: '/search', label: 'Search', Icon: SearchIcon },
  { to: '/home', label: 'Home', Icon: HomeIcon },
  { to: '/new', label: 'New', Icon: NewIcon },
];

const LIBRARY_ICONS: Record<Exclude<LibrarySection, 'playlists'>, NavItem['Icon']> = {
  recent: RecentlyAddedIcon,
  artists: ArtistsIcon,
  albums: AlbumsIcon,
  songs: SongsIcon,
  'made-for-you': MadeForYouIcon,
};

const LIBRARY: NavItem[] = (Object.keys(LIBRARY_ICONS) as (keyof typeof LIBRARY_ICONS)[]).map((section) => ({
  to: `/library/${section}`,
  label: LIBRARY_SECTIONS[section].title,
  Icon: LIBRARY_ICONS[section],
}));

// Nothing OS nav row: monochrome, sharp, mechanical hover.
const item =
  'group flex h-9 items-center gap-3 mb-0.5 px-2.5 py-1 rounded-[4px] type-body-reduced text-secondary transition-colors duration-100 hover:text-primary hover:bg-[#ffffff08] aria-[current=page]:text-primary aria-[current=page]:bg-[#ffffff0a]';
// Glyph container — Nothing's dot-matrix icons are stark, white when active, red dot when selected.
const icon = 'inline-grid size-5 flex-none place-items-center text-[inherit] group-aria-[current=page]:text-primary';
const navLabel = 'min-w-0 truncate tracking-[0.02em]';
// Section headers: Nothing OS uppercase, spaced, industrial.
const sectionHeader = 'mt-5 px-2.5 py-1.5 type-[500_10px/14px] uppercase tracking-[0.12em] text-[#ffffff40]';
const list = 'flex flex-col';

function NavList({ items, onNavigate }: { items: NavItem[]; onNavigate: () => void }) {
  return (
    <ul className={list}>
      {items.map(({ to, label, Icon }) => (
        <li key={to}>
          <PrefetchNavLink to={to} className={item} onClick={onNavigate}>
            <Icon size={20} className={icon} />
            <span className={navLabel}>{label}</span>
            {/* Nothing OS: red dot indicator for active nav. */}
            <span className="ml-auto size-1.5 rounded-full bg-nothing-red opacity-0 group-aria-[current=page]:opacity-100 transition-opacity" />
          </PrefetchNavLink>
        </li>
      ))}
    </ul>
  );
}

/** Library and Playlists, once YouTube requests are made as the user. */
function LibraryNav({ onNavigate }: { onNavigate: () => void }) {
  const playlists = useLibraryPlaylists();
  return (
    <>
      <h2 className={sectionHeader}>Library</h2>
      <NavList items={LIBRARY} onNavigate={onNavigate} />
      <h2 className={sectionHeader}>Playlists</h2>
      <ul className={list}>
        <li>
          <PrefetchNavLink to="/library/playlists" className={item} onClick={onNavigate}>
            <AllPlaylistsIcon size={20} className={icon} />
            <span className={navLabel}>{LIBRARY_SECTIONS.playlists.title}</span>
          </PrefetchNavLink>
        </li>
        {playlists.data?.map((playlist) => (
          <li key={playlist.id}>
            <PrefetchNavLink to={hrefFor(playlist) ?? '/library/playlists'} className={item} onClick={onNavigate}>
              <span className={icon}>
                <ListMusic size={15} strokeWidth={1.5} />
              </span>
              <span className={navLabel}>{playlist.title}</span>
            </PrefetchNavLink>
          </li>
        ))}
      </ul>
    </>
  );
}

/** Spotify's playlists, once the extension can read them as the user. */
function SpotifyNav({ onNavigate }: { onNavigate: () => void }) {
  const playlists = useSpotifyPlaylists();
  return (
    <>
      <h2 className={sectionHeader}>Spotify</h2>
      <ul className={list}>
        <li>
          <PrefetchNavLink to="/spotify" end className={item} onClick={onNavigate}>
            <AllPlaylistsIcon size={20} className={icon} />
            <span className={navLabel}>All Spotify Playlists</span>
          </PrefetchNavLink>
        </li>
        {playlists.data?.map((playlist) => (
          <li key={playlist.id}>
            <PrefetchNavLink to={`/spotify/playlist/${encodeURIComponent(playlist.id)}`} className={item} onClick={onNavigate}>
              <span className={icon}>
                <ListMusic size={15} strokeWidth={1.5} />
              </span>
              <span className={navLabel}>{playlist.name}</span>
            </PrefetchNavLink>
          </li>
        ))}
      </ul>
    </>
  );
}

/** The left sidebar — Nothing OS style: flat black surface, bordered, industrial typography. */
export function Sidebar() {
  const drawerOpen = useUi((s) => s.drawerOpen);
  const setDrawerOpen = useUi((s) => s.setDrawerOpen);
  const update = useExtensionUpdate();
  const signedIn = useSignedIn();
  const spotifySignedIn = useSpotifySignedIn();
  const close = () => setDrawerOpen(false);

  return (
    <>
      {/* Below 484px the sidebar is a drawer opened from the top bar's menu button. */}
      <nav
        className="absolute inset-y-0 left-0 z-(--z-web-chrome) flex w-(--web-navigation-width) flex-col bg-[#0a0a0a] border-r border-[#ffffff14] max-sm:w-[min(280px,82vw)] max-sm:-translate-x-full max-sm:shadow-[4px_0_24px_#000000] max-sm:transition-transform max-sm:duration-(--duration-panel) max-sm:ease-panel max-sm:data-[open=true]:translate-none"
        data-open={drawerOpen}
        aria-label="Main"
      >
        {/* Nothing OS branding: wordmark with the red dot. */}
        <div className="mx-2.5 flex h-16 items-center px-2.5 border-b border-[#ffffff0a]">
          <PrefetchLink to="/home" className="inline-flex items-center gap-2.5 rounded-[4px]" aria-label="Nothing Music, Home" onClick={close}>
            {/* Nothing's red dot glyph — the brand mark. */}
            <span className="relative flex size-5 items-center justify-center">
              <span className="absolute size-2.5 rounded-full bg-nothing-red animate-dot-pulse" />
              <span className="size-5 rounded-full border border-[#ffffff20]" />
            </span>
            <span className="type-[600_16px/20px] tracking-[0.04em] uppercase text-primary">Nothing</span>
            <span className="type-[300_16px/20px] tracking-[0.04em] uppercase text-secondary">Music</span>
          </PrefetchLink>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-2.5 pt-2 [scrollbar-width:thin]">
          <NavList items={PRIMARY} onNavigate={close} />
          {signedIn && <LibraryNav onNavigate={close} />}
          {spotifySignedIn && <SpotifyNav onNavigate={close} />}
        </div>
        <div className="flex flex-col gap-1.5 px-2.5 pt-3 pb-4 border-t border-[#ffffff0a]">
          <PrefetchNavLink to="/extension" className={item} onClick={close}>
            <span className={icon}>
              <MdOutlineExtension size={16} />
            </span>
            <span className={navLabel}>Extension</span>
            {update.state === 'available' && (
              <span className="ml-auto rounded-[3px] border border-nothing-red bg-nothing-red-dim px-1.5 py-0.5 type-[500_9px/12px] uppercase tracking-[0.08em] text-nothing-red" title={`Version ${update.latest.version} is available`}>
                Update
              </span>
            )}
          </PrefetchNavLink>
          <AccountButton />
          <div className="flex items-center justify-between mt-1">
            <a className="inline-flex items-center gap-1 px-1 type-[400_11px/14px] tracking-[0.02em] text-[#ffffff40] transition-colors hover:text-secondary" href={config.androidAppUrl} target="_blank" rel="noreferrer">
              <span>Android app</span>
              <ArrowUpRight size={12} strokeWidth={1.5} />
            </a>
            <PrefetchNavLink to="/settings" className="grid size-7 place-items-center rounded-[4px] text-[#ffffff40] transition-colors hover:text-primary hover:bg-[#ffffff08] aria-[current=page]:text-primary" aria-label="Settings" title="Settings" onClick={close}>
              <Settings size={15} strokeWidth={1.5} />
            </PrefetchNavLink>
          </div>
        </div>
      </nav>
      {drawerOpen && <div className="absolute inset-0 z-[calc(var(--z-web-chrome)-1)] hidden bg-[#000000cc] max-sm:block" onClick={close} aria-hidden="true" />}
    </>
  );
}
