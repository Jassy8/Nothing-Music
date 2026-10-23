import { useState } from 'react';
import {
  BackwardIcon,
  ForwardIcon,
  LyricsActiveIcon,
  LyricsIcon,
  PauseIcon,
  PlayIcon,
  RepeatIcon,
  RepeatOneIcon,
  ShuffleIcon,
  UpNextIcon,
  VolumeIcon,
} from '@/components/icons/Transport';
import { FavoriteButton } from '@/components/music/FavoriteButton';
import { useLyrics } from '@/lyrics/useLyrics';
import { usePlayer } from '@/state/player';
import { useUi } from '@/state/ui';
import { Lcd } from './Lcd';

// Nothing OS controls: monochrome, sharp, mechanical.
const control = 'grid place-items-center rounded-[4px] disabled:opacity-30 transition-colors duration-75';
// Shuffle and repeat: muted until active, then Nothing red.
const toggle = `${control} size-7 text-[#ffffff40] aria-pressed:text-nothing-red`;
const transport = `${control} size-7 text-primary hover:text-nothing-red`;
const action = 'grid h-7 w-6 place-items-center rounded-[3px] text-secondary transition-colors duration-75 hover:text-primary aria-pressed:text-nothing-red';
// The actions the volume level slides in over: they fade out while it's open.
const fading = `${action} transition-opacity group-data-volume-open/actions:pointer-events-none group-data-volume-open/actions:opacity-0`;

const slider = [
  'absolute top-1/2 right-[33px] mx-0 mb-0 -mt-2 block h-4 w-24 cursor-pointer appearance-none bg-transparent',
  'pointer-events-none translate-x-2 opacity-0 transition-[opacity,translate]',
  'data-open:pointer-events-auto data-open:translate-none data-open:opacity-100',
  // Nothing OS slider: sharp track, red fill.
  '[&::-webkit-slider-runnable-track]:h-[3px] [&::-webkit-slider-runnable-track]:rounded-[1px] [&::-webkit-slider-runnable-track]:bg-[linear-gradient(to_right,var(--nothing-red)_var(--fill),var(--systemQuaternary)_var(--fill))]',
  '[&::-moz-range-track]:h-[3px] [&::-moz-range-track]:rounded-[1px] [&::-moz-range-track]:bg-[linear-gradient(to_right,var(--nothing-red)_var(--fill),var(--systemQuaternary)_var(--fill))]',
  '[&::-webkit-slider-thumb]:-mt-[5px] [&::-webkit-slider-thumb]:size-[13px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-[#ffffff20]',
  '[&::-moz-range-thumb]:size-[13px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-[#ffffff20] [&::-moz-range-thumb]:bg-white',
].join(' ');

/**
 * Nothing OS volume control: the speaker mutes, and hovering it slides the level
 * in where the other actions were (they fade out while it's open).
 */
function VolumeControl({ open, onOpen }: { open: boolean; onOpen: () => void }) {
  const volume = usePlayer((s) => s.volume);
  const muted = usePlayer((s) => s.muted);
  const setVolume = usePlayer((s) => s.setVolume);
  const toggleMute = usePlayer((s) => s.toggleMute);
  const level = muted ? 0 : volume;
  return (
    <>
      <input
        className={slider}
        data-open={open || undefined}
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={level}
        aria-label="Volume"
        tabIndex={open ? 0 : -1}
        style={{ '--fill': `${level * 100}%` } as React.CSSProperties}
        onChange={(e) => setVolume(Number(e.currentTarget.value))}
      />
      <button
        className={action}
        aria-label={muted ? 'Unmute' : 'Mute'}
        aria-pressed={muted}
        onClick={toggleMute}
        onPointerEnter={onOpen}
        onFocus={onOpen}
      >
        <VolumeIcon level={level} size={18} />
      </button>
    </>
  );
}

/** The floating player pill — Nothing OS style: bordered surface, sharp corners, red accents. */
export function PlayerBar() {
  const sidePanel = useUi((s) => s.sidePanel);
  const toggleSidePanel = useUi((s) => s.toggleSidePanel);
  const lyrics = useLyrics();
  const hasLyrics = !!lyrics.data || sidePanel === 'lyrics';
  const hasTrack = usePlayer((s) => s.nowPlaying !== null);
  const videoId = usePlayer((s) => s.nowPlaying?.videoId ?? null);
  const playing = usePlayer((s) => s.status === 'playing' || s.status === 'buffering');
  const hasNext = usePlayer((s) => s.index + 1 < s.queue.length || s.repeat !== 'off' || (s.autoplay && s.index >= 0));
  const shuffle = usePlayer((s) => s.shuffle);
  const repeat = usePlayer((s) => s.repeat);
  const { togglePlay, next, previous, toggleShuffle, cycleRepeat } = usePlayer.getState();
  const [volumeOpen, setVolumeOpen] = useState(false);

  return (
    // The side panel overlays the page; the pill re-centres in what's left.
    <div
      className="pointer-events-none absolute right-0 bottom-(--player-bottom-offset) left-(--web-navigation-width) z-[calc(var(--z-web-chrome)-1)] flex justify-center px-4 transition-[padding-inline-end] duration-(--duration-panel) ease-panel data-[panel-open=true]:pe-[calc(var(--side-panel-width)+16px)] max-sm:hidden"
      data-panel-open={sidePanel !== null}
    >
      <div
        className="glass-pill group/pill pointer-events-auto relative grid h-(--player-pill-height) w-[min(680px,100%)] grid-cols-[184px_minmax(180px,427px)_minmax(57px,auto)] items-center rounded-[8px] px-4"
        role="region"
        aria-label="Player"
      >
        {/* Nothing red accent line at the top of the player. */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-nothing-red to-transparent opacity-40 rounded-t-[8px]" />

        <div className="flex items-center justify-between pr-2">
          <button className={toggle} aria-label="Shuffle" aria-pressed={shuffle} onClick={toggleShuffle}>
            <ShuffleIcon size={24} />
          </button>
          <div className="flex items-center gap-2">
            <button className={transport} disabled={!hasTrack} aria-label="Previous" onClick={previous}>
              <BackwardIcon size={22} />
            </button>
            <button
              className={`${control} size-9 rounded-full border border-[#ffffff20] text-primary hover:bg-nothing-red hover:border-nothing-red hover:text-black transition-all duration-100`}
              disabled={!hasTrack}
              aria-label={playing ? 'Pause' : 'Play'}
              onClick={togglePlay}
            >
              {playing ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
            </button>
            <button className={transport} disabled={!hasTrack || !hasNext} aria-label="Next" onClick={next}>
              <ForwardIcon size={22} />
            </button>
          </div>
          <button
            className={toggle}
            aria-label={repeat === 'one' ? 'Repeat one' : repeat === 'all' ? 'Repeat all' : 'Repeat'}
            aria-pressed={repeat !== 'off'}
            onClick={cycleRepeat}
          >
            {repeat === 'one' ? <RepeatOneIcon size={24} /> : <RepeatIcon size={24} />}
          </button>
        </div>

        <div className="h-full min-w-0 px-4">
          <Lcd />
        </div>

        <div
          className="group/actions relative flex items-center justify-end gap-2"
          data-volume-open={volumeOpen || undefined}
          onPointerLeave={() => setVolumeOpen(false)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setVolumeOpen(false);
          }}
        >
          <FavoriteButton videoId={videoId} className={fading} />
          {hasLyrics && (
            <button
              className={fading}
              aria-label="Lyrics"
              aria-pressed={sidePanel === 'lyrics'}
              onClick={() => toggleSidePanel('lyrics')}
            >
              {sidePanel === 'lyrics' ? <LyricsActiveIcon size={16} /> : <LyricsIcon size={16} />}
            </button>
          )}
          <button
            className={fading}
            aria-label="Up Next"
            aria-pressed={sidePanel === 'up-next'}
            onClick={() => toggleSidePanel('up-next')}
          >
            <UpNextIcon size={16} />
          </button>
          <VolumeControl open={volumeOpen} onOpen={() => setVolumeOpen(true)} />
        </div>
      </div>
    </div>
  );
}
