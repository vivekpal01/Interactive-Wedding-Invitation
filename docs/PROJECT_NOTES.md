# Project notes

## Application flow

`src/main.tsx` mounts the React application. `src/App.tsx` composes the invitation sections and coordinates page-level motion. Reusable interactive features live in `src/components/`.

## Configuration

Edit `src/config.ts` first when changing the couple, family, event schedule, venue, map, or music settings. Keep public media in `public/` and reference it using root-relative paths.

## Before a release

- [ ] Confirm names, dates, times, dress codes, and venue details.
- [ ] Confirm that photos, music, and illustrations are approved for publication.
- [ ] Test the invitation on a narrow mobile screen and a desktop browser.
- [ ] Test music controls after a user interaction.
- [ ] Test map and directions links.
- [ ] Check keyboard focus and reduced-motion behavior.
- [ ] Run `npm run build` and review the production build.
