//
import createHome from "./home.js";
import notFound from "./notFound.js";
import createConfigurator from "./scripts/configurator/configurator.js";
//

if (location.hash === "" || location.hash === "#/") location.hash = "#/home";

const router = () => {
  const currentRoute = location.hash;

  // ---Home
  if (
    currentRoute === "" ||
    currentRoute === "#/" ||
    currentRoute === "#" ||
    currentRoute === "#/home"
  )
    createHome();
  // Configurator
  else if (currentRoute === "#/configurator") createConfigurator();
  // ---Not Found
  else notFound();
};

export default router;
