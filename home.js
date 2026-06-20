//
const root = document.getElementById("root");
import { getToConfigurator } from "./scripts/configurator/configurator.js";
import { getToDashboard } from "./scripts/dashboard/dashboard.js";

//

const createHome = () => {
  root.innerHTML = "";

  const div = document.createElement("div");
  div.className = "home-container flex-col";
  div.dataset.gap = "large";

  div.innerHTML = `
    <h2 class="site-title">BMW Configurator</h2>

    <button type="button" class="btn btn-primary btn-configurator">Configurate a Car</button>
    <button type="button" class="btn btn-primary btn-dashboard">View Dashboard</button>
  `;

  div
    .querySelector(".btn-configurator")
    .addEventListener("click", getToConfigurator);

  div.querySelector(".btn-dashboard").addEventListener("click", getToDashboard);

  root.append(div);
};

// --Shared Route Helpers (import anywhere)--
export const getHome = () => (location.hash = "#/home");

export default createHome;
