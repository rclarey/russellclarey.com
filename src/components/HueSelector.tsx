import React, {
  ChangeEvent,
  Dispatch,
  FocusEvent,
  KeyboardEvent,
  SetStateAction,
  useMemo,
} from "react";
import { setFavicon } from "../utils/favicon";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function HueSelector({ open, setOpen }: Props) {
  const initialHue = useMemo(() => {
    try {
      const hue = localStorage.getItem("preferredHue");
      if (hue) {
        return hue;
      }
    } catch {
      // do nothing
    }
    return "221";
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    document.body.style.setProperty("--hue", e.target.value);
    try {
      localStorage.setItem("preferredHue", e.target.value);
      setFavicon(e.target.value);
    } catch {
      // do nothing
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const adj = e.code === "ArrowUp" || e.code === "ArrowDown" ? 1 : 0;
    if (e.code === "ArrowUp" || e.code === "KeyK") {
      const nValue = Number(e.currentTarget.value);
      e.currentTarget.value = String(nValue - adj + (e.shiftKey ? 10 : 1));
    }
    if (e.code === "ArrowDown" || e.code === "KeyJ") {
      const nValue = Number(e.currentTarget.value);
      e.currentTarget.value = String(nValue + adj - (e.shiftKey ? 10 : 1));
    }
    if (!adj) {
      handleChange({ ...e, target: e.currentTarget });
    }
  };

  const handleFocus = () => {
    setOpen(true);
  };

  const handleBlur = (e: FocusEvent) => {
    const parent = document.getElementById("hue-selector");
    if (!parent?.contains(e.relatedTarget)) {
      setOpen(false);
    }
  };

  return (
    <div id="hue-selector" className="hue-selector">
      <input
        aria-labelledby="hue-button"
        className={`hue-range ${open ? "hue-range-open" : ""}`}
        type="range"
        min="0"
        max="360"
        defaultValue={initialHue}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button
        id="hue-button"
        tabIndex={-1}
        className="icon-button"
        title="Change the site colour"
        onClick={() => setOpen((x) => !x)}
        onBlur={handleBlur}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="var(--icon-fg)"
          viewBox="0 0 120 120"
        >
          <circle cx="60" cy="60" r="55" strokeWidth="10" />
          <path
            strokeWidth="8"
            d="M59.682 34.737c-24.907 0-44.56 25.409-44.56 25.409s19.653 25.412 44.56 25.412c19.048 0 44.559-25.412 44.559-25.412s-25.511-25.41-44.56-25.41v.001zm0 41.243c-8.743 0-15.867-7.105-15.867-15.834s7.124-15.834 15.868-15.834 15.865 7.108 15.865 15.834S68.426 75.98 59.682 75.98zm0-25.077c-5.113 0-9.262 4.137-9.262 9.243 0 5.105 4.146 9.242 9.262 9.242 5.117 0 9.262-4.137 9.262-9.242 0-5.102-4.146-9.243-9.262-9.243z"
          />
        </svg>
      </button>
    </div>
  );
}
