//
//

const step5Packages = (
  form,
  navigateStep,
  saveStepData,
  currentStep,
  selectedModel,
) => {
  let packages = [];

  if (selectedModel === "3 Series")
    packages = ["M Sport", "Technology", "Premium Sound"];
  else if (selectedModel === "X5")
    packages = ["Off Road", "Luxury Seating", "Tow Package"];
  else if (selectedModel === "M4")
    packages = ["Carbon Exterior", "Track Package", "M Driver's Package"];

  const packagesOptions = packages
    .map((item) => {
      return `
      <div class="package-option">      
        <input type="checkbox" value="${item}" id="${item}">
        <label for="${item}">${item}</label>
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

    saveStepData("packages", packagesValues);

    navigateStep(currentStep + 1);
  });
};

export default step5Packages;
