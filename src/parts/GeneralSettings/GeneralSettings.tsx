import React, { useEffect, useState } from "react";

import { Affix, ButtonGroupSelect } from "../../components";
import { useTranslation } from "../../utils/hooks";
import { localStorage } from "../../database";
import "./GeneralSettings.less";

type CurrencyPlacement = "before" | "after";

function GeneralSettings(): JSX.Element {
  const { t, language, setLanguage } = useTranslation();
  const [placement, setPlacement] = useState<CurrencyPlacement>(
    localStorage.currencyPlacement
  );
  const [symbol, setSymbol] = useState<string>(localStorage.currencySymbol);

  useEffect(() => {
    localStorage.currencyPlacement = placement;
  }, [placement]);

  useEffect(() => {
    localStorage.currencySymbol = symbol;
  }, [symbol]);

  return (
    <>
      <Affix
        offsetTop={0}
        theme="dark"
        tone="darker"
        className="padding-wide b-margin-wide"
      >
        <span className="sub-title">{t("parts.general-settings.general")}</span>
      </Affix>
      <div className="setting-row v-padding-wide h-padding-huge">
        <div className="sentence-case">
          {t("parts.general-settings.language")}
        </div>
        <ButtonGroupSelect
          theme="dark"
          tone="lighter"
          size="large"
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
          value={language}
          onSelect={setLanguage}
        />
      </div>
      <div className="setting-row v-padding-wide h-padding-huge">
        <div className="sentence-case">
          {t("parts.general-settings.currency-symbol")}
        </div>
        <input
          className="short dark lighter"
          value={symbol}
          onChange={(event) => setSymbol(event.target.value)}
        />
      </div>
      <div className="setting-row v-padding-wide h-padding-huge">
        <div className="sentence-case">
          {t("parts.general-settings.currency-placement")}
        </div>
        <ButtonGroupSelect
          theme="dark"
          tone="lighter"
          size="large"
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
          value={placement}
          onSelect={setPlacement}
        />
      </div>
    </>
  );
}

export default GeneralSettings;
