import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

export interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  mobile?: boolean;
}

let lastClick = 0;
export function MenuToggle({ open, setOpen, mobile = false }: Props) {
  const [showCloseButton, setShowCloseButton] = useState(false);

  useEffect(() => {
    let to: ReturnType<typeof setTimeout> | undefined;
    if (open !== showCloseButton) {
      to = setTimeout(() => setShowCloseButton((x) => !x), 200);
    }

    return () => clearTimeout(to);
  }, [open]);

  const joinedClass = [
    "icon-button",
    showCloseButton ? "close-menu" : "",
    mobile ? "mobile-menu" : "",
  ].join(" ");

  return (
    <button
      className={joinedClass}
      tabIndex={-1}
      title={showCloseButton ? "Close" : "Menu"}
      onClick={() => {
        const now = Date.now();
        if (now - lastClick > 200) {
          lastClick = now;
          setOpen((x) => !x);
        }
      }}
    >
      {showCloseButton && !mobile
        ? (
          <svg
            fill="var(--icon-fg)"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 26 26"
          >
            <path d="M 21.734375 19.640625 L 19.636719 21.734375 C 19.253906 22.121094 18.628906 22.121094 18.242188 21.734375 L 13 16.496094 L 7.761719 21.734375 C 7.375 22.121094 6.746094 22.121094 6.363281 21.734375 L 4.265625 19.640625 C 3.878906 19.253906 3.878906 18.628906 4.265625 18.242188 L 9.503906 13 L 4.265625 7.761719 C 3.882813 7.371094 3.882813 6.742188 4.265625 6.363281 L 6.363281 4.265625 C 6.746094 3.878906 7.375 3.878906 7.761719 4.265625 L 13 9.507813 L 18.242188 4.265625 C 18.628906 3.878906 19.257813 3.878906 19.636719 4.265625 L 21.734375 6.359375 C 22.121094 6.746094 22.121094 7.375 21.738281 7.761719 L 16.496094 13 L 21.734375 18.242188 C 22.121094 18.628906 22.121094 19.253906 21.734375 19.640625 Z" />
          </svg>
        )
        : "⛶"}
    </button>
  );
}