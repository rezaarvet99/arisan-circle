# Arisan Circle

A one-page rotating-savings (arisan) tracker for Indonesian groups: who paid, whose turn to receive the pot, round history. Built for the **Build With AI: Basics** hackathon (Devpost Learn Skill Pack).

## Run it

No install, no server. Open `index.html` in Chrome/Edge — or:

```bash
npx serve .
```

Data persists in `localStorage` (key `arisan-circle-v1`). First open ships with sample data (5 members) so the 1-minute demo works immediately.

## Tests

```bash
node test.js   # 11 tests, pure state logic
```

## Files

- `index.html` — the whole UI (structure + style + browser glue)
- `app.js` — pure state logic (Node + browser), storage helpers
- `test.js` — Node tests for the logic
- `devpost/` — `scope.md`, `prd.md`, `spec.md`, `checklist.md` (required planning docs)
