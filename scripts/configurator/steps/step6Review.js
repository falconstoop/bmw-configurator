//
//

const step6Review = (form, navigateStep, configData, currentStep) => {
  const { model, engine, color, interior, packages } = configData;

  form.innerHTML = `
        <h2>Review Your Configuration</h2>

        <div class="review-summary">
          <p><strong>Model:</strong> ${model}</p>
          <p><strong>Engine:</strong> ${engine}</p>
          <p><strong>Color:</strong>  ${color}</p>
          <p><strong>Interior:</strong> ${interior}</p>

          <p>
          <strong>
          Package${packages.length > 1 ? "s" : ""}
          ${packages.length === 0 ? "" : packages.length === 1 ? " is" : " are"}
          :</strong>
          
          ${packages.length ? packages.join(", ") : "none"}
          </p>
        </div>

        <div class="step-btns">
            <button type="button" class="btn btn-secondary btn-back">Back</button>
            <button type="submit" class="btn btn-secondary btn-submit">Submit</button>
        </div>
    `;

  form.querySelector(".btn-back").addEventListener("click", () => {
    navigateStep(currentStep - 1);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    navigateStep(currentStep + 1);
  });
};

export default step6Review;
