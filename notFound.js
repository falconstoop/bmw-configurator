//
const root = document.getElementById("root");
import { getHome } from "./home.js";
//

const notFound = () => {
  root.innerHTML = "";

  const div = document.createElement("div");
  div.className = "flex-col notFound-container";

  div.innerHTML = `
    <h2>Page Not Found</h2>

    <button type="button" class="btn btn-getHome">Back Home</button>
  `;

  div.querySelector(".btn-getHome").addEventListener("click", getHome);

  root.append(div);
};

export default notFound;
