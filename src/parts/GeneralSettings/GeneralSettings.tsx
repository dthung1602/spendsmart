import React, { useRef, useState, useEffect } from "react";

import { Affix, ButtonSelect } from "../../components";
import { useTranslation } from "../../utils/hooks";
import { localStorage } from "../../database";
import "./GeneralSettings.less";

type CurrencyPlacement = "before" | "after";

function GeneralSettings(): JSX.Element {
  const { t, language, setLanguage } = useTranslation();
  const [placement, setPlacement] = useState<CurrencyPlacement>(
    localStorage.currencyPlacement
  );
  const symbolRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.currencyPlacement = placement;
  }, [placement]);

  useEffect(() => {
    if (symbolRef.current) {
      symbolRef.current.value = localStorage.currencySymbol;
    }
  }, []);

  const setSymbol = () => {
    localStorage.currencySymbol = symbolRef?.current?.value || "$";
  };

  return (
    <>
      <Affix
        offsetTop={0}
        type="primary"
        className="padding-wide b-margin-wide"
      >
        <span className="sub-title">{t("parts.general-settings.general")}</span>
      </Affix>
      <div className="setting-row v-padding-wide h-padding-huge">
        <div>{t("parts.general-settings.language")}</div>
        <ButtonSelect
          type="primary"
          options={[
            {
              displayText: "en",
              value: "en",
            },
            {
              displayText: "vi",
              value: "vi",
            },
          ]}
          defaultValue={language}
          onSelect={setLanguage}
        />
      </div>
      <div className="setting-row v-padding-wide h-padding-huge">
        <div>{t("parts.general-settings.currency-symbol")}</div>
        <input className="short primary" ref={symbolRef} onBlur={setSymbol} />
      </div>
      <div className="setting-row v-padding-wide h-padding-huge">
        <div>{t("parts.general-settings.currency-placement")}</div>
        <ButtonSelect
          type="primary"
          options={[
            {
              displayText: t("parts.general-settings.before"),
              value: "before",
            },
            {
              displayText: t("parts.general-settings.after"),
              value: "after",
            },
          ]}
          defaultValue={placement}
          onSelect={setPlacement}
        />
      </div>
    </>
  );
}

export default GeneralSettings;
