import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckCircle,
  faExclamationCircle,
  faInfoCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

import "./Notification.less";

type NotificationType = "info" | "success" | "warning" | "error";

interface NotificationProps {
  message: string;
  type: NotificationType;
  time?: number;
  onDone?: () => void;
}

const iconMappings: { [K in NotificationType]: IconProp } = {
  info: faInfoCircle,
  success: faCheckCircle,
  warning: faExclamationCircle,
  error: faTimesCircle,
};

type NotiState = "init" | "show" | "done";

function Notification({
  message,
  type,
  time,
  onDone,
}: NotificationProps): JSX.Element {
  const [state, setState] = useState<NotiState>("init");

  useEffect(() => {
    let tid: ReturnType<typeof setTimeout>;

    if (state === "init") {
      setState("show");
    } else if (state === "show") {
      if (time) {
        tid = setTimeout(() => setState("done"), time);
      }
    } else {
      if (onDone) onDone();
    }

    return () => clearTimeout(tid);
  }, [state, time, onDone]);

  return (
    <div className={`notification padding-huge margin-huge ${type} ${state}`}>
      <FontAwesomeIcon icon={iconMappings[type]} size="lg" />
      <span className="h-padding-large message">{message}</span>
    </div>
  );
}

function notify(message: string, type: NotificationType, time = 3000): void {
  const container = document.createElement("div");
  document.body.appendChild(container);

  const unmount = () => {
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container);
  };

  ReactDOM.render(
    <Notification message={message} type={type} time={time} onDone={unmount} />,
    container
  );
}

Notification.notify = notify;

export default Notification;
export { notify };
export type { NotificationType };
