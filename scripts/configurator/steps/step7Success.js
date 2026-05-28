//
import { getHome } from "../../../home.js";
//

const step7Success = () => {
  const div = document.createElement("div");
  div.className = "flex-col";

  div.innerHTML = `
    <h2>✅ Success!</h2>
    <button class="btn back-home">Back Home</button>
  `;

  div.querySelector(".back-home").addEventListener("click", getHome);

  return div;
};

export default step7Success;
