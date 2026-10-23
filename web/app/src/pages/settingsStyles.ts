/*
 * Nothing OS grouped settings rows: industrial, bordered, sharp corners.
 * Used by Extension, Settings, Discord and Listen Together pages.
 */

const row = 'relative flex items-center justify-between px-4 py-3 type-title-3 hairline-[16px]';
const integration = 'relative grid items-center gap-x-3 px-4 py-3 type-title-3 hairline-[52px]';
const field = 'w-[220px] flex-none rounded-[4px] border border-[#ffffff14] bg-[#ffffff08] px-2.5 py-[5px] type-body text-primary';

export const settingsUi = {
  /** The page title and its rows as one column, centred in the page. */
  centered: 'mx-auto max-w-[calc(640px+2*var(--body-gutter))]',
  body: 'mx-(--body-gutter) mt-5 mb-[120px] max-w-[640px]',
  /* Nothing OS: bordered groups with sharp corners. */
  group: 'overflow-hidden rounded-[6px] border border-[#ffffff14] bg-[#ffffff06]',
  /* Nothing OS section headers: uppercase, wide tracking, mechanical. */
  sectionHeader: 'mx-4 mt-8 mb-2 type-[500_10px/14px] uppercase tracking-[0.12em] text-[#ffffff40]',
  footer: 'mx-4 mt-2 type-callout text-[#ffffff40]',

  row,
  /** A row holding a switch, a select or a field: the whole row is its label. */
  controlRow: `${row} cursor-pointer gap-4`,
  rowText: 'flex flex-col gap-0.5',
  rowDetail: 'type-callout text-[#ffffff40]',
  value: 'inline-flex items-center gap-1.5 text-right type-body-reduced text-secondary',
  dot: 'size-2 rounded-full bg-nothing-red',

  /** Download rows: browser logo, title and detail, chevron. */
  download:
    'relative grid grid-cols-[28px_minmax(0,1fr)_auto] items-center gap-x-4 px-4 py-3 hover:bg-[#ffffff06] hairline-[60px] transition-colors duration-75',
  updateDot: 'size-2.5 justify-self-center rounded-full bg-nothing-red',
  downloadText: 'flex min-w-0 flex-col gap-0.5',
  downloadTitle: 'type-title-3-emphasized text-nothing-red',
  downloadDetail: 'type-body text-secondary',
  chevron: 'text-[#ffffff40]',
  steps: 'mx-4 mt-2.5 list-decimal ps-[18px] type-body-tall text-secondary [&>li+li]:mt-1',

  /** Integration rows: a coloured app-icon square, the name, the state. */
  integration: `${integration} grid-cols-[24px_minmax(0,1fr)_auto]`,
  /** An integration row without the icon square. */
  integrationPlain: `${integration} grid-cols-[minmax(0,1fr)_auto]`,
  /* Nothing OS integration icon: sharp corners, clean. */
  integrationIcon: 'grid size-6 place-items-center rounded-[4px] text-white',
  integrationName: 'min-w-0',
  /** Settings: an integration row that opens a page of its own. */
  linkRow: 'w-full cursor-pointer text-start hover:bg-[#ffffff06] transition-colors duration-75',
  /** A row's own action, after its status (Connect, Disconnect). */
  inlineButton: 'ml-2 rounded-[4px] border border-[#ffffff14] bg-[#ffffff08] px-2.5 py-[3px] type-callout-emphasized text-primary disabled:opacity-40 hover:bg-[#ffffff14] transition-colors duration-75',
  inlineLink: 'text-nothing-red',

  /* Nothing OS switch: sharp, mechanical, red when on. */
  switch: [
    'relative h-[22px] w-[38px] flex-none cursor-pointer appearance-none rounded-[4px] bg-[#ffffff14] border border-[#ffffff14] transition-[background-color,border-color] duration-150 checked:bg-nothing-red checked:border-nothing-red',
    'after:absolute after:top-[2px] after:left-[2px] after:size-[16px] after:rounded-[3px] after:bg-white after:shadow-[0_1px_2px_rgb(0_0_0/0.4)] after:transition-[translate] after:duration-150 checked:after:translate-x-4',
  ].join(' '),
  select: field,
  input: field,
};
