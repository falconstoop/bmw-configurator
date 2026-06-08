//
//

const step5Packages = (
  form,
  navigateStep,
  saveStepData,
  currentStep,
  packagesArr,
) => {
  const packagesOptions = packagesArr
    .map((item) => {
      return `
      <div class="package-option">      
        <input type="checkbox" value="${item}" id="${item.replaceAll(" ", "-")}">
        <label for="${item.replaceAll(" ", "-")}">${item}</label>
      </div>
    `;
    })
    .join("");

  form.innerHTML = `
        <h2>You can Choose Multiple Packages</h2>

        <div class="packages-list">
          ${packagesOptions}
        </div>

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

    const packagesValues = [];
    form
      .querySelectorAll("input[type='checkbox']:checked")
      .forEach((item) => packagesValues.push(item.value));

    // --- method 2: Using Array.from + map ---
    // const packagesValues = Array.from(
    //   form.querySelectorAll("input[type='checkbox']:checked"),
    // ).map((item) => item.value);

    // --- method 3: Using spread operator + map ---
    // const packagesValues = [
    //   ...form.querySelectorAll("input[type='checkbox']:checked"),
    // ].map((item) => item.value);

    saveStepData("packages", packagesValues);

    navigateStep(currentStep + 1);
  });
};

export default step5Packages;
