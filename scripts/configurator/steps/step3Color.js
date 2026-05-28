//
//

const step3Color = (
  form,
  navigateStep,
  saveStepData,
  currentStep,
  selectedModel,
) => {
  const commonColors = ["Alpine White", "Black Sapphire", "Mineral Grey"];

  let modelColors = [];

  if (selectedModel === "3 Series") {
    modelColors = ["Portimao Blue", "Sunset Orange"];
  } else if (selectedModel === "X5") {
    modelColors = ["Phytonic Blue", "Arctic Grey"];
  } else if (selectedModel === "M4") {
    modelColors = ["Sao Paulo Yellow", "Isle of Man Green"];
  }

  const allColors = [...commonColors, ...modelColors];

  const colorOptions = allColors
    .map((item) => {
      return `<option value="${item}">${item}</option>`;
    })
    .join("");

  form.innerHTML = `
        <h2>Choose the Color</h2>

        <select id="color-select">
          ${colorOptions}
        </select>

        <div class="step-btns">
            <button type="button" class="btn btn-secondary btn-back">Back</button>

            <button type="submit" class="btn btn-secondary btn-next">Next</button>
        </div>
    `;

  form.querySelector(".btn-back").addEventListener("click", () => {
    navigateStep(currentStep - 1);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const colorValue = form.querySelector("#color-select").value;
    saveStepData("color", colorValue);

    navigateStep(currentStep + 1);
  });
};

export default step3Color;
