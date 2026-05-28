# BMW Configurator

A multi-step BMW car configurator single-page application built with **vanilla JavaScript** — no frameworks, no libraries.

## v1.0 — Initial Working Prototype

### Features
- Hash-based routing (`#/home`, `#/configurator`, `#/dashboard`)
- 7-step configuration flow (Model → Engine → Color → Interior → Packages → Review → Success)
- Step navigation with Back/Next buttons
- State management via parent module (`configData` + `saveStepData`)
- Conditional options (engine, color, interior, packages depend on selected model)
- Review step displays all selections before submission

### Architecture (v1)
- **Logic in children** — each step contains its own conditional logic and data
- Parent passes form element and callbacks to children (Dependency Injection)
- Unidirectional data flow: children call `saveStepData` → parent updates state

