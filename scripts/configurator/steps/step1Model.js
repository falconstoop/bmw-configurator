//
import { getHome } from "../../../home.js";
//

const step1Model = (form, navigateStep, saveStepData, currentStep) => {
  form.innerHTML = `
        <h2>Choose your Model</h2>

        <select id="model-select">
          <option value="3 Series">3 Series</option>
          <option value="X5">X5</option>
          <option value="M4">M4</option>
        </select>

        <div class="step-btns">
            <button type="button" class="btn btn-secondary btn-getHome">Back Home</button>

            <button type="submit" class="btn btn-secondary btn-next">Next</button>
        </div>
    `;

  form.querySelector(".btn-getHome").addEventListener("click", getHome);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const modelValue = form.querySelector("#model-select").value;
    saveStepData("model", modelValue);

    navigateStep(currentStep + 1);
  });
};

export default step1Model;
