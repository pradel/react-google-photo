import { useRef, useEffect } from 'react';

// Inspired by https://usehooks.com/useEventListener/

export const useEventListener = <T>(
  active: boolean,
  eventName: string,
  handler: (event: T) => void,
  element: any
) => {
  // Create a ref that stores handler
  const savedHandler = useRef<(event: T) => void>();

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      if (!element || !element.addEventListener) {
        return;
      }

      // Create event listener that calls handler function stored in ref
      const eventListener = (event: T) => savedHandler.current!(event);

      if (active) {
        // Add event listener
        element.addEventListener(eventName, eventListener);
      }

      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    // Re-run if eventName or element changes
    [active, eventName, element]
  );
};
