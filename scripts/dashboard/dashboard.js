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

//
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
