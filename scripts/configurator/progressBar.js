//
//

const createProgressBar = (currentStep) => {
  const totalSteps = 6;
  const progressPercent = (currentStep / totalSteps) * 100;

  const container = document.createElement("div");
  container.className = "progress-container";

  container.innerHTML = `
    <span class="progress-label">Step ${currentStep} of ${totalSteps}</span>
    <div class="progress-bar">
      <div class="progress-fill"></div>
    </div>
    `;

  const fill = container.querySelector(".progress-fill");
  fill.style.width = `${progressPercent}%`;

  return container;
};

export default createProgressBar;
