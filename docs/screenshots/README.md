# Screenshots

The PNGs in this folder back the **Screenshots** tables in the root `README.md`.

**Status:** all six PNGs are real captures of the running production build
(1440 × 900), taken after the full rewrite landed.

To refresh the set:

```bash
npm install
npm run dev        # http://localhost:3000
```

Capture at **1440 × 900**, PNG, and overwrite the files with these exact names:

| File | Route | What to show |
| --- | --- | --- |
| `home.png` | `/` | Cinematic hero, nav bar and search entry point |
| `dragons.png` | `/dragons` | Dragon roster with filter chips and stat bars |
| `timeline.png` | `/timeline` | Phase filters (Spark / War / Aftermath), an expanded event |
| `map.png` | `/map` | Interactive Westeros map with the detail drawer open |
| `characters.png` | `/characters` | Character roster with era / house filters |
| `houses.png` | `/greathouses` | Great houses index cards |

Tips: hide the cursor, use the site's dark theme default, and scroll to the top
before capturing so the hero is fully visible.
