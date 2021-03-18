import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faFileMedicalAlt,
  faBullseye,
  faTools,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, Link } from "react-router-dom";

import {
  ROUTE_DASHBOARD,
  ROUTE_SETTINGS,
  ROUTE_REPORTS,
  ROUTE_TRANSACTIONS,
} from "../../utils/constants";

const routeMapping = {
  [ROUTE_DASHBOARD]: faTachometerAlt,
  [ROUTE_TRANSACTIONS]: faFileMedicalAlt,
  [ROUTE_REPORTS]: faBullseye,
  [ROUTE_SETTINGS]: faTools,
};

import "./Navbar.less";

function Navbar(): JSX.Element {
  const location = useLocation();

  return (
    <div className="nav-bar">
      {Object.entries(routeMapping).map(([route, icon]) => (
        <Link
          to={route}
          key={route}
          className={route === location.pathname ? "active" : ""}
        >
          <FontAwesomeIcon icon={icon} size="lg" />
        </Link>
      ))}
    </div>
  );
}

export default Navbar;
