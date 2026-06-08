//
//

const step3Color = (
  form,
  navigateStep,
  saveStepData,
  currentStep,
  colorsArr,
) => {
  //
  const colorOptions = colorsArr
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
