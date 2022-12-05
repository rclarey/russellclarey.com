import React from "react";
import { setFavicon } from "../utils/favicon";

export function ModeToggle() {
  const toggleMode = () => {
    const prefersLight =
      window.matchMedia("prefers-color-scheme: light").matches;
    const opposite = `${prefersLight ? "dark" : "light"}-mode`;
    const hasOpposite = document.body.classList.contains(opposite);
    document.body.classList.remove("dark-mode", "light-mode");
    if (!hasOpposite) {
      document.body.classList.add(opposite);
      localStorage.setItem("preferredColorScheme", opposite);
    } else {
      localStorage.removeItem("preferredColorScheme");
    }
    setFavicon(localStorage.getItem("preferredHue") ?? "221");
  };

  return (
    <button
      className="icon-button"
      title="Toggle between light and dark mode"
      onClick={toggleMode}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 120 120"
        stroke="var(--icon-fg)"
        fill="none"
      >
        <circle cx="60" cy="60" r="56" strokeWidth="8" />
        <path
          stroke="none"
          fill="var(--icon-fg)"
          d="M20 60c0-23.573 19.11-42.683 42.683-42.683v85.366C39.11 102.683 20 83.573 20 60zm21.341 0 21.342-21.341L41.34 60z"
        />
      </svg>
    </button>
  );
}
