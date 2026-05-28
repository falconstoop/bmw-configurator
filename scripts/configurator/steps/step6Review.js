//
//

const step6Review = (form, navigateStep, configData, currentStep) => {
  const { model, engine, color, interior, packages } = configData;

  form.innerHTML = `
        <h2>Review Your Configuration Before Submitting...</h2>

        <p>Model is: ${model}</p>
        <p>the engine is: ${engine}</p>
        <p>the color is: ${color}</p>
        <p>the interior is: ${interior}</p>
        <p>the packages is/are: ${packages.length ? packages.join(", ") : "None"}</p>




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
