import React, { useContext, useEffect, useState } from "react";

import { GlobalContext } from "../../GlobalContext";
import { Language } from "../../utils/types";
import "./IntroTour.less";

interface IntroTourProps {
  onFinishIntroTour: () => void;
}

const introTourStep = ["language", "done"] as const;
type IntroTourStep = typeof introTourStep[number];

function IntroTour({ onFinishIntroTour }: IntroTourProps): JSX.Element {
  const [step, setStep] = useState<IntroTourStep>("language");
  const { setLanguage } = useContext(GlobalContext);

  useEffect(() => {
    if (step === "done") onFinishIntroTour();
  }, [step]);

  const click = (language: Language) => {
    setLanguage(language);
    setStep("done");
  };

  let content;
  switch (step) {
    case "language":
      content = (
        <div className="language">
          <div className="">Language / Ngôn ngữ</div>
          <button className="btn-background" onClick={() => click("en")}>
            ENG
          </button>
          <button className="btn-background" onClick={() => click("vi")}>
            VIE
          </button>
        </div>
      );
      break;
  }

  return <div className="intro-tour-page">{content}</div>;
}

export default IntroTour;
