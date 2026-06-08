//
//

// ---Step 2: Engine
export const getEngines = (model) => {
  if (model === "3 Series") {
    return ["2.0L Turbo", "3.0L Hybrid"];
  } else if (model === "X5") {
    return ["3.0L Diesel", "4.4L V8"];
  } else if (model === "M4") {
    return ["3.0L Twin Turbo", "4.0L Competition"];
  }

  return [];
};

// ---Step 3: Color
export const getColors = (model) => {
  const commonColors = ["Alpine White", "Black Sapphire", "Mineral Grey"];

  let modelColors = [];

  if (model === "3 Series") {
    modelColors = ["Portimao Blue", "Sunset Orange"];
  } else if (model === "X5") {
    modelColors = ["Phytonic Blue", "Arctic Grey"];
  } else if (model === "M4") {
    modelColors = ["Sao Paulo Yellow", "Isle of Man Green"];
  }

  const allColors = [...commonColors, ...modelColors];

  return allColors;
};

// ---Step 4: Interiors
export const getInteriors = (model) => {
  let interiorsArr = [];

  if (model === "3 Series") {
    interiorsArr = ["Black Leather", "Beige Leather", "Cognac Leather"];
  } else if (model === "X5") {
    interiorsArr = [
      "Black Vernasca",
      "Coffee Vernasca",
      "Ivory White Vernasca",
    ];
  } else if (model === "M4") {
    interiorsArr = [
      "Black Merino",
      "Fjord Blue Merino",
      "Kyalami Orange Merino",
    ];
  }

  return interiorsArr;
};

// ---Step 5: Packages
export const getPackages = (model) => {
  let packagesArr = [];

  if (model === "3 Series")
    packagesArr = ["M Sport", "Technology", "Premium Sound"];
  else if (model === "X5")
    packagesArr = ["Off Road", "Luxury Seating", "Tow Package"];
  else if (model === "M4")
    packagesArr = ["Carbon Exterior", "Track Package", "M Driver's Package"];

  return packagesArr;
};
