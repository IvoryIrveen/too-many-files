# Page farm (too-many-files)

A Strux real-world test project (docs/REAL_WORLD_TESTS.md in the Strux repository).

**What it is:** `npm run build` (`generate.mjs`) writes many small pages, or one large file, into `dist/`. `strux.json`
tells Strux to build it and publish `dist`. Strux limits a build's output to 10,000 files, 64 MB per file and 256 MB
in all.

| Source | Output | What Strux should do |
|---|---|---|
| `main` | 10,051 files | **Refuse** the Build output: too many files |
| branch `within-limits` | 9,951 files | Accept and publish |
| branch `big-file` | the index page and one 70 MB file | **Refuse**: a file over 64 MB |

A refused output fails the Build at "Check the output". Today Strux shows the general "Nothing to open" message there,
not the limit that was crossed (a known gap in the Strux plan).

Check locally: `npm run build` and count the files in `dist/`.

Speed check (2026-10-30): the same 9,951 files, a new commit so Strux builds them again.
Speed check 2 (2026-10-30): batched storage.
Speed check 3 (2026-10-30): timing.
