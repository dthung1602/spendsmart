import React, { useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { GlobalContext } from "../../GlobalContext";
import {
  ROUTE_DASHBOARD,
  ROUTE_SETTINGS,
  ROUTE_REPORTS,
  ROUTE_TRANSACTIONS,
} from "../../utils/constants";
import "./Navbar.less";
import { IconName } from "@fortawesome/free-solid-svg-icons";

const routeToIconMapping: Record<string, IconName> = {
  [ROUTE_DASHBOARD]: "tachometer-alt",
  [ROUTE_TRANSACTIONS]: "file-medical-alt",
  [ROUTE_REPORTS]: "bullseye",
  [ROUTE_SETTINGS]: "tools",
};

function Navbar(): JSX.Element {
  const { overlayOpen } = useContext(GlobalContext);
  const location = useLocation();
  const idx = Object.keys(routeToIconMapping).indexOf(location.pathname);

  return (
    <div className={`nav-bar ${overlayOpen ? "hide" : ""}`}>
      {Object.entries(routeToIconMapping).map(([route, icon]) => (
        <Link
          to={route}
          key={route}
          className={route === location.pathname ? "active" : ""}
        >
          <FontAwesomeIcon icon={icon} size="lg" />
        </Link>
      ))}
      <div
        className="highlight"
        style={{ transform: `translate(${(idx - 1) * 33.3333333333333}%)` }}
      >
        <div />
        <div>
          <div />
        </div>
        <div />
      </div>
    </div>
  );
}

export default Navbar;
