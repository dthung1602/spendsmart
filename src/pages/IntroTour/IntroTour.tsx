import React, { useContext } from "react";

import { GlobalContext } from "../../GlobalContext";
import { Language } from "../../utils/types";
import "./IntroTour.less";

interface IntroTourProps {
  onFinishIntroTour: () => void;
}

function IntroTour({ onFinishIntroTour }: IntroTourProps): JSX.Element {
  const updateContext = useContext(GlobalContext)[1];

  const click = (language: Language) => {
    updateContext({ language });
    onFinishIntroTour();
  };

  return (
    <div>
      <div>INTRO TOUR</div>
      <button onClick={() => click("en")}>ENG</button>
      <button onClick={() => click("vi")}>VIE</button>
    </div>
  );
}

export default IntroTour;
