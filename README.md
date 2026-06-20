# BMW Configurator

A multi-step BMW car configurator single-page application built with **vanilla JavaScript** — no frameworks, no libraries.

## Falcon Stoop

📖 **How this was built:** Step-by-step breakdown of architecture, challenges, and solutions — [read the blog](https://falcon-stoop.netlify.app/#/projects/car-configurator).


## Versions

### v1.0 — Logic in Children
- Hash-based routing (`#/home`, `#/configurator`, `#/dashboard`)
- 7-step configuration flow (Model → Engine → Color → Interior → Packages → Review → Success)
- Step navigation with Back/Next buttons
- State management via parent module (`configData` + `saveStepData`)
- Conditional options (engine, color, interior, packages depend on selected model)
- Review step displays all selections before submission
- **Architecture:** Logic in children — each step contains its own conditional logic and data
- Parent passes form element and callbacks to children (Dependency Injection)
- Unidirectional data flow: children call `saveStepData` → parent updates state

### v2.0 — Parent-in-Control Architecture
- Refactored to centralize all business logic in `configuratorData.js`
- Parent imports data functions, resolves conditions, passes formatted options to steps
- Steps become pure renderers — no logic, no conditions, no data imports
- Clean separation: data logic / orchestration / rendering in three distinct layers
- **Architecture:** Parent-in-control with unidirectional data flow

### v3.0 — IndexedDB Storage
- Added `storage/storage.js` module using the `idb` wrapper library
- Configurations saved to IndexedDB on submission (Step 6 → Step 7)
- Database: `BMWConfigurator`, Object Store: `configs`
- Auto-incrementing IDs, timestamp per config
- **Architecture:** Storage layer separated from configurator logic

### v4.0 — Dashboard
- Dashboard route (`#/dashboard`) displays all saved configurations
- Cards rendered dynamically from IndexedDB data
- Delete functionality: removes from both IndexedDB and DOM
- Empty state handling — message shown when no configs exist
- Error handling: failed fetch silently returns empty array
- **Architecture:** Dashboard renders once, cards handle their own deletion via direct DOM manipulation

## Tech Stack
- HTML5, CSS3, JavaScript (ES Modules)
- IndexedDB with `idb` wrapper
- No frameworks
