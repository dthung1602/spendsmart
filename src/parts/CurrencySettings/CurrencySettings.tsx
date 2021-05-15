import React, { useRef, useState, useEffect } from "react";

import { Affix, ButtonSelect } from "../../components";
import { useTranslation } from "../../utils/hooks";
import { localStorage } from "../../database";
import "./CurrencySettings.less";

type CurrencyPlacement = "before" | "after";

interface CurrencySettingsProps {
  open: boolean;
  onClose: () => void;
}

function CurrencySettings(): JSX.Element {
  const { t } = useTranslation();
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
      <Affix offsetTop={0} type="primary" className="padding-wide">
        <span className="sub-title">
          {t("parts.currency-settings.currency")}
        </span>
      </Affix>
      <div className="setting-row v-padding-wide h-padding-huge">
        <div>{t("parts.currency-settings.symbol")}</div>
        <input className="short" ref={symbolRef} onBlur={setSymbol} />
      </div>
      <div className="setting-row v-padding-wide h-padding-huge">
        <div>{t("parts.currency-settings.placement")}</div>
        <ButtonSelect
          type="success"
          options={
            [
              t("parts.currency-settings.before"),
              t("parts.currency-settings.after"),
            ] as CurrencyPlacement[]
          }
          onSelect={setPlacement}
        />
      </div>
    </>
  );
}

export default CurrencySettings;
export type { CurrencySettingsProps };
