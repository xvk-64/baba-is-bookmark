## v0.5.0b - 2nd January, 2021
- Fixed some typos in the README.
- The client has been updated to use the new API changes.

### API changes
- The `/level/` endpoint is now responsible for getting data from both the database and the official server, whichever is available.
- As a consequence of this, the `/level/download/` endpoint has now been deprecated.
- Added a new endpoint: `/level/exists/`. This endpoint returns whether a level exists and whether it has been submitted already or not.

---

## v0.4.3b - 30th December, 2020
- Miscellaneous bug fixes

---

## v0.4.2b - 30th December, 2020
- Fixed API bug relating to error handling in bad requests.

---

## v0.4.1b - 29th December, 2020
- Updated project repository README.

---

## v0.4.0b - 29th December, 2020
### New features and changes
- Added two new colours for levels: Navy & Maroon.
- Removed Silver colour since it looked too similar to the colours used for undefined levelcodes.
- Added changelog.
- Added homepage.
- Improvements to the way levelcode formatting is checked. (Thanks, RocketRace!)

### API changes
- Added support for `"before"` and `"after"` timestamp fields to be used with `/browse/` instead of `"time"`
- Moved endpoints for `/raw/l/` and `/raw/ld/` to `/level/raw/l/` and `/level/raw/ld/` respectively

---