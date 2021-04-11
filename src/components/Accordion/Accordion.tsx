import React, { useRef, useEffect } from "react";

import { BasicJSXPropWithChildren } from "../../utils/types";
import "./Accordion.less";

interface AccordionProps extends BasicJSXPropWithChildren {
  expand: boolean;
}

function Accordion({
  expand,
  className = "",
  style = {},
  children,
}: AccordionProps): JSX.Element {
  const accordionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log(accordionRef.current);
    if (accordionRef.current) {
      if (expand) {
        accordionRef.current.style.height =
          accordionRef.current.scrollHeight + "px";
      } else {
        accordionRef.current.style.height = "0";
      }
    }
  });

  return (
    <div className={`accordion ${className}`} style={style} ref={accordionRef}>
      {children}
    </div>
  );
}

export default Accordion;
