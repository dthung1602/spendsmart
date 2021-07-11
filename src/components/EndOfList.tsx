import React, { useEffect, useRef } from "react";
import type { Optional } from "../utils/types";

interface EndOfListProps {
  onReached: Optional<() => void>;
  disabled?: boolean;
  yOffset?: number;
}

/**
 * Ref:
 * - https://www.pluralsight.com/guides/how-to-implement-infinite-scrolling-with-reactjs
 * - https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
 * - https://stackoverflow.com/questions/56541342/react-hooks-why-is-current-null-for-useref-hook
 */
function EndOfList({
  onReached,
  disabled = false,
  yOffset = 300,
}: EndOfListProps): JSX.Element {
  const prevY = useRef(0);
  const target = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled) {
      return;
    }

    const observer = new IntersectionObserver(() => {
      if (target.current) {
        const { y } = target.current.getBoundingClientRect();
        if (prevY.current > y) {
          !onReached || onReached();
        }
        prevY.current = y;
      }
    });

    !target.current || observer.observe(target.current);

    return () => observer.disconnect();
  }, [onReached, disabled]);

  return <div ref={target} />;
}

export default EndOfList;
