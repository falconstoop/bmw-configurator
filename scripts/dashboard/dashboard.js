// ===== Dashboard Module =====
//
// Architecture: Renders once on page load, then cards handle their own deletion via direct DOM manipulation.
// No full rerender — surgical updates only.
//
// Function Summary:
//   fetchConfigs        — Loads saved configs from IndexedDB, returns [] on failure
//   updateEmptyState    — Toggles the "No configs" message based on grid children count
//   createConfigCard    — Builds one card with its own delete handler (IndexedDB + DOM)
//   createDashboard     — Orchestrator: fetches data, renders layout, delegates to helpers
//
// Dependency Flow:
//   createDashboard → fetchConfigs (data)
//   createDashboard → createConfigCard (config, emptyState) → card
//   card delete btn → deleteConfigFromStorage(id) + card.remove() + updateEmptyState(grid, emptyState)

// --------------------------------------------------------------------
// ===== Implementation Approaches =====
//
//--- Method 1 (Current): Separate createConfigCard function, per-button handlers, toggle CSS class for empty state.
//   - More modular, each card manages its own lifecycle.
//   - Empty state exists in DOM, toggled via CSS class. No appending/removing elements.
//   - Surgical DOM updates — only the deleted card is removed, no full rerender.
//
//--- Method 2 (Alternative): Single function with early return + event delegation.
//   - Cleaner flow with early exit when no data exists.
//   - Single event listener on the grid instead of per-button handlers.
//   - Empty state appended/removed dynamically instead of toggled via CSS.
//   - Simpler for small pages, harder to extend with card-specific logic.
//
//--- Method 3 (State-Driven / React-Like): Module-level state + full rerender on every change.
//   - Data stored in a module-level variable (configs array), not fetched inside render.
//   - Every delete updates the state array, then triggers a full rerender.
//   - UI always reflects the exact current state — one source of truth.
//   - The React mental model: state changes → re-render → UI is a function of state.
//   - Trade-off: Less performant (full rebuild on every action), but simpler to reason about.
//
// This project uses Method 1 for better separation of concerns and surgical DOM control.

// ----------------------------------------------------

const root = document.getElementById("root");

import { getHome } from "../../home.js";

import {
  getAllConfigsFromStorage,
  deleteConfigFromStorage,
} from "../storage/storage.js";
//

// ===== Data Fetching =====
// Get all configs from IndexedDB
// Returns an array of config objects, or empty array [] if fetch fails
// Failure is silent — dashboard shows empty state instead of crashing
const fetchConfigs = async () => {
  try {
    return await getAllConfigsFromStorage();
  } catch (err) {
    return []; // Return empty array on failure → shows empty state
  }
};

// ===== Empty State Management =====

// Checks if the grid has any cards left and shows/hides the empty state message
// Called on: initial page load AND after each card deletion
// Parameters:
//   configsGrid — the .configs-grid DOM element (to check children count)
//   emptyState  — the .empty-state DOM element (to toggle visibility)

const updateEmptyState = (configsGrid, emptyState) => {
  // Cards exist → hide the "No configs" message
  if (configsGrid.children.length > 0) {
    emptyState.classList.add("hidden");
  }
  // Grid is empty → show the message
  else {
    emptyState.classList.remove("hidden");
  }
};

// ===== Card Creation =====
// Builds a single configuration card with its own delete button and handler
// Parameters:
//   config     — a single config object { id, model, engine, color, interior, packages }
//   emptyState — the .empty-state DOM element, passed through for delete handler
// Returns: the card DOM element (appended to grid by createDashboard)

const createConfigCard = (config, emptyState) => {
  const card = document.createElement("div");
  card.className = "config-card";

  // Destructure config data for the template
  const { model, engine, color, interior, packages } = config;

  // Set card HTML structure
  card.innerHTML = `

        <div class="config-card-header">
          <span class="config-card-model">${model}</span>
          <button type="button" class="btn-delete">✕</button>
        </div>
        <div class="config-card-details">
          <p><strong>Engine:</strong> ${engine}</p>
          <p><strong>Color:</strong> ${color}</p>
          <p><strong>Interior:</strong> ${interior}</p>
          <p><strong>Packages:</strong> ${packages.join(", ")}</p>
        </div>

  `;

  // Attach delete handler to this card's button
  // Flow: delete from IndexedDB → save grid reference → remove card → check empty state
  card.querySelector(".btn-delete").addEventListener("click", async () => {
    await deleteConfigFromStorage(config.id); // Remove from IndexedDB
    const grid = card.parentElement; // Save reference BEFORE removing

    card.remove(); // Remove card from DOM

    updateEmptyState(grid, emptyState); // Re-check if grid is now empty (Use saved reference)
  });

  return card;
};

// ===== Dashboard Render =====
// Main dashboard function — called once when route changes to #/dashboard
// Flow: clear root → fetch configs → set layout HTML → render cards → check empty state → attach navigation

const createDashboard = async () => {
  root.innerHTML = "";

  const div = document.createElement("div");
  div.className = "dashboard-container";

  // Fetch saved configs from IndexedDB (awaited — function pauses here)
  const configs = await fetchConfigs();

  // Set dashboard layout (cards injected dynamically, empty state toggled after)
  div.innerHTML = `
    <h2 class="dashboard-title">Your Saved Configurations</h2>
    
    <div class="configs-grid">
      <!-- Cards will be inserted here dynamically -->

    </div>

    <div class="empty-state">
      <p>No configurations saved yet.</p>
      <p>Go build your first BMW!</p>
    </div>

    <button type="button" class="btn btn-secondary btn-getHome">
      Back Home
    </button>
  `;

  // Select grid element for card insertion and empty state management
  const configsGrid = div.querySelector(".configs-grid");
  const emptyState = div.querySelector(".empty-state");

  // Render each config as a card (pass emptyState so delete handlers can use it)
  configs.forEach((config) => {
    configsGrid.append(createConfigCard(config, emptyState));
  });

  // Initial empty state check after all cards are rendered
  updateEmptyState(configsGrid, emptyState);

  // Back Home button navigation
  div.querySelector(".btn-getHome").addEventListener("click", getHome);

  root.append(div);
};

// ===== Route Helper =====
// Shared route helper — can be imported anywhere to navigate to dashboard
export const getToDashboard = () => (location.hash = "#/dashboard");

export default createDashboard;

// ------------------Method 2--------------------

/*
const emptyState = () => {
  const div = document.createElement("div");
  div.className = "empty-state";

  div.innerHTML = `
    <p>No configurations saved yet.</p>
    <p>Go build your first BMW!</p>
  `;

  return div;
};

const createDashboard = async () => {
  root.innerHTML = "";

  const div = document.createElement("div");
  div.className = "dashboard-container";

  // Step 1 & 2: Fetch data with error handling
  let configsFromStorage = [];
  try {
    configsFromStorage = await getAllConfigsFromStorage();
  } catch (err) {
    // Fallback to empty array — empty state handles it naturally
  }

  // Step 3: Conditional rendering — empty state on initial load
  // Early return: no data → show empty state → stop, no further code runs
  if (!configsFromStorage.length) {
    div.innerHTML = `<h2 class="dashboard-title">Dashboard</h2>`;
    div.append(emptyState());
    root.append(div);
    return;
  }

  // Step 4: DOM manipulation — build cards from data
  const configsCards = configsFromStorage
    .map(({ id, model, engine, color, interior, packages }) => {
      return `
        <div class="config-card" data-id="${id}">
          <div class="config-card-header">
            <span class="config-card-model">${model}</span>
            <button type="button" class="btn-delete">✕</button>
          </div>
          <div class="config-card-details">
            <p><strong>Engine:</strong> ${engine}</p>
            <p><strong>Color:</strong> ${color}</p>
            <p><strong>Interior:</strong> ${interior}</p>
            <p><strong>Packages:</strong> ${packages.join(", ")}</p>
          </div>
        </div>
      `;
    })
    .join("");

  div.innerHTML = `
    <h2 class="dashboard-title">Dashboard</h2>
    <div class="configs-grid">${configsCards}</div>
  `;

  // Step 5: Event binding + dynamic conditional rendering
  // Event delegation — one listener on the grid, not per button
  div.querySelector(".configs-grid").addEventListener("click", async (e) => {
    // Only respond to clicks on delete buttons
    if (!e.target.classList.contains("btn-delete")) return;

    const card = e.target.closest(".config-card");
    const grid = card.parentElement;

    // Delete from storage, then remove from DOM
    await deleteConfigFromStorage(Number(card.dataset.id));
    card.remove();

    // Dynamic empty state check — same condition as Step 3, triggered by user action
    if (!grid.children.length) {
      div.append(emptyState());
    }
  });

  root.append(div);
};
*/

// -------------Method 3 (State-Driven / React-Like)--------------

/*
// Store configs in module-level variable — state lives outside the render function
let configs = [];

const createDashboard = () => {
  root.innerHTML = "";

  const div = document.createElement("div");
  div.className = "dashboard-container";

  // No async — data is already loaded in state
  // Conditional rendering: empty state or grid
  if (!configs.length) {
    div.innerHTML = `
      <h2 class="dashboard-title">Dashboard</h2>
      <div class="empty-state">
        <p>No configurations saved yet.</p>
        <p>Go build your first BMW!</p>
      </div>
    `;
    root.append(div);
    return;
  }

  // Build cards from state
  const configsCards = configs
    .map(({ id, model, engine, color, interior, packages }) => {
      return `
        <div class="config-card" data-id="${id}">
          <div class="config-card-header">
            <span class="config-card-model">${model}</span>
            <button type="button" class="btn-delete">✕</button>
          </div>
          <div class="config-card-details">
            <p><strong>Engine:</strong> ${engine}</p>
            <p><strong>Color:</strong> ${color}</p>
            <p><strong>Interior:</strong> ${interior}</p>
            <p><strong>Packages:</strong> ${packages.join(", ")}</p>
          </div>
        </div>
      `;
    })
    .join("");

  div.innerHTML = `
    <h2 class="dashboard-title">Dashboard</h2>
    <div class="configs-grid">${configsCards}</div>
  `;

  // Per-button handlers — after DOM exists
  div.querySelectorAll(".btn-delete").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const card = btn.closest(".config-card");
      const id = Number(card.dataset.id);

      await deleteConfigFromStorage(id);
      configs = configs.filter((c) => c.id !== id); // Update state
      createDashboard(); // Full rerender from new state
    });
  });

  root.append(div);
};

// Initial load — fetch data into state, then render
const initDashboard = async () => {
  try {
    configs = await getAllConfigsFromStorage();
  } catch (err) {
    configs = [];
  }
  createDashboard();
};

// Call initDashboard() instead of createDashboard() in the router
// Method 3: State-driven. One source of truth (configs array).
// Every change updates state → full rerender → UI always reflects exact state.
// This is the React mental model: state changes trigger re-renders.
// Trade-off: Less performant (full rebuild), but simpler to reason about.
*/
