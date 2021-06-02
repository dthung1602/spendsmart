import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

function ScrollToTop(): JSX.Element {
  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen(() => {
      setTimeout(() => window.scrollTo(0, 0), 200);
    });
    return () => {
      unlisten();
    };
  });

  return <></>;
}

export default ScrollToTop;
