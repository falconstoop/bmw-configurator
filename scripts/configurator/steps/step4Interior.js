//
//

const step4Interior = (
  form,
  navigateStep,
  saveStepData,
  currentStep,
  selectedModel,
) => {
  let interiors = [];

  if (selectedModel === "3 Series") {
    interiors = ["Black Leather", "Beige Leather", "Cognac Leather"];
  } else if (selectedModel === "X5") {
    interiors = ["Black Vernasca", "Coffee Vernasca", "Ivory White Vernasca"];
  } else if (selectedModel === "M4") {
    interiors = ["Black Merino", "Fjord Blue Merino", "Kyalami Orange Merino"];
  }

  const interiorOptions = interiors
    .map((item) => `<option value="${item}">${item}</option>`)
    .join("");

  form.innerHTML = `
        <h2>Select Your Favorite Interior</h2>

        <select id="interior-select">
          ${interiorOptions}
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

    const interiorValue = form.querySelector("#interior-select").value;
    saveStepData("interior", interiorValue);

    navigateStep(currentStep + 1);
  });
};

export default step4Interior;
