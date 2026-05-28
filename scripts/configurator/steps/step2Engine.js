//
//

const step2Engine = (
  form,
  navigateStep,
  saveStepData,
  currentStep,
  selectedModel,
) => {
  //
  let engines = [];

  if (selectedModel === "3 Series") {
    engines = ["2.0L Turbo", "3.0L Hybrid"];
  } else if (selectedModel === "X5") {
    engines = ["3.0L Diesel", "4.4L V8"];
  } else if (selectedModel === "M4") {
    engines = ["3.0L Twin Turbo", "4.0L Competition"];
  }

  //
  const engineOptions = engines
    .map((item) => {
      return `<option value="${item}">${item}</option>`;
    })
    .join("");

  form.innerHTML = `
        <h2>Choose The Engine</h2>

        <select id="engine-select">
          ${engineOptions}
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

    const engineValue = form.querySelector("#engine-select").value;
    saveStepData("engine", engineValue);

    navigateStep(currentStep + 1);
  });
};

export default step2Engine;
