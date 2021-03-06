import React, { useContext, useEffect, useState } from "react";

import { Button } from "../../components";
import { GlobalContext } from "../../GlobalContext";
import { Language } from "../../utils/types";
import "./IntroTour.less";
import { localStorage } from "../../database";
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
  }, [step, onFinishIntroTour]);

  const click = (
    language: Language,
    symbol: string,
    placement: "after" | "before"
  ) => {
    setLanguage(language);
    localStorage.currencySymbol = symbol;
    localStorage.currencyPlacement = placement;
    setStep("done");
  };

  let content;
  switch (step) {
    case "language":
      content = (
        <div className="language">
          <div>Language / Ngôn ngữ</div>
          <Button
            theme="light"
            size="large"
            corner="round"
            onClick={() => click("en", "$", "before")}
          >
            ENG
          </Button>
          <Button
            theme="light"
            size="large"
            corner="round"
            onClick={() => click("vi", "đ", "after")}
          >
            VIE
          </Button>
        </div>
      );
      break;
  }

  return <div className="page intro-tour-page">{content}</div>;
}

export default IntroTour;
