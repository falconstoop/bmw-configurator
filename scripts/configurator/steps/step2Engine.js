//
//

const step2Engine = (
  form,
  navigateStep,
  saveStepData,
  currentStep,
  enginesArr,
) => {
  //
  const engineOptions = enginesArr
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
