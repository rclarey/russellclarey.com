import { useEffect, useRef } from "react";

export let isFirstRender = true;

export function useFirstRender() {
  const isFirstRender = useRef(true);
  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  return isFirstRender.current;
}
