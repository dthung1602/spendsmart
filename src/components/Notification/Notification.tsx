import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName } from "@fortawesome/free-solid-svg-icons";

import {
  BasicJSXProp,
  ThemeableComponent,
  ThemeColor,
  ThemeTone,
} from "../../utils/types";
import "./Notification.less";

type NotificationTheme = ThemeColor;
type NotificationTone = ThemeTone;

interface NotificationProps extends ThemeableComponent, BasicJSXProp {
  message: string;
  time?: number;
  onDone?: () => void;
}

const iconMappings: { [K in ThemeColor]: IconName } = {
  info: "info-circle",
  success: "check-circle",
  warning: "exclamation-circle",
  error: "times",
  dark: "info-circle",
  light: "info-circle",
};

type NotificationState = "init" | "showing" | "closing" | "done";

function Notification({
  message,
  theme = "dark",
  tone = "",
  time,
  onDone,
  className = "",
  style = {},
}: NotificationProps): JSX.Element {
  const [state, setState] = useState<NotificationState>("init");

  useEffect(() => {
    let tid: ReturnType<typeof setTimeout>;

    if (state === "init") {
      tid = setTimeout(() => setState("showing"), 200);
    } else if (state === "showing") {
      if (time) {
        tid = setTimeout(() => setState("closing"), time);
      }
    } else if (state === "closing") {
      tid = setTimeout(() => setState("done"), 500);
    } else {
      if (onDone) onDone();
    }

    return () => clearTimeout(tid);
  }, [state, time, onDone]);

  return (
    <div
      className={`notification padding-huge margin-huge ${theme} ${tone} ${state} ${className}`}
      style={style}
    >
      <FontAwesomeIcon icon={iconMappings[theme]} size="lg" />
      <span className="h-padding-large sentence-case inline-block">
        {message}
      </span>
    </div>
  );
}

function notify(
  message: string,
  theme: NotificationTheme = "dark",
  tone: NotificationTone = "",
  time = 3000
): void {
  const container = document.createElement("div");
  document.body.appendChild(container);

  const unmount = () => {
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container);
  };

  ReactDOM.render(
    <Notification
      message={message}
      theme={theme}
      tone={tone}
      time={time}
      onDone={unmount}
    />,
    container
  );
}

Notification.notify = notify;

export default Notification;
export { notify };
export type { NotificationTheme, NotificationTone };
