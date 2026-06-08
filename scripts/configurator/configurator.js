//
const root = document.getElementById("root");
//---Steps
import step1Model from "./steps/step1Model.js";
import step2Engine from "./steps/step2Engine.js";
import step3Color from "./steps/step3Color.js";
import step4Interior from "./steps/step4Interior.js";
import step5Packages from "./steps/step5Packages.js";
import step6Review from "./steps/step6Review.js";
import step7Success from "./steps/step7Success.js";

// ---Configurator Data Functions (named-export)
import {
  getEngines,
  getColors,
  getInteriors,
  getPackages,
} from "./configuratorData.js";

// Navigation State
let currentStep = 1;

// Data State
const configData = {
  model: "",
  engine: "",
  color: "",
  interior: "",
  packages: [],
};

const createConfigurator = () => {
  root.innerHTML = "";

  const div = document.createElement("div");
  div.className = "configurator-container flex-col";

  const form = document.createElement("form");
  form.className = "configurator-form flex-col";

  // Navigation Callback
  const navigateStep = (step) => {
    currentStep = step;
    createConfigurator();
  };

  // Data Callback
  const saveStepData = (configKey, configValue) => {
    configData[configKey] = configValue;
  };

  // Step 1: Model
  if (currentStep === 1) {
    step1Model(form, navigateStep, saveStepData, currentStep);
  }
  // Step 2: Engine
  else if (currentStep === 2) {
    const enginesArr = getEngines(configData.model);

    step2Engine(form, navigateStep, saveStepData, currentStep, enginesArr);
  }
  // Step 3: Color
  else if (currentStep === 3) {
    const colorsArr = getColors(configData.model);

    step3Color(form, navigateStep, saveStepData, currentStep, colorsArr);
  }
  // Step 4: Interiors
  else if (currentStep === 4) {
    const interiorsArr = getInteriors(configData.model);

    step4Interior(form, navigateStep, saveStepData, currentStep, interiorsArr);
  }
  // Step 5: Packages
  else if (currentStep === 5) {
    const packagesArr = getPackages(configData.model);

    step5Packages(form, navigateStep, saveStepData, currentStep, packagesArr);
  }
  // step 6: Review
  else if (currentStep === 6) {
    step6Review(form, navigateStep, configData, currentStep);
  }

  // Append form (steps 1-6) or success message (step 7)
  // Step 7 is not a form — it returns its own element
  if (currentStep <= 6) {
    div.append(form);
  } else {
    // reset so next visit starts from step 1
    currentStep = 1;

    // Reset saved configuration data
    configData.model = "";
    configData.engine = "";
    configData.color = "";
    configData.interior = "";
    configData.packages = [];

    div.append(step7Success());
  }

  root.append(div);
};

// --Shared Route Helpers (import anywhere)--
export const getToConfigurator = () => (location.hash = "#/configurator");

export default createConfigurator;
