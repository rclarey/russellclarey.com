import React, { Dispatch, SetStateAction, useRef } from "react";

import { Link } from "gatsby";

export interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function Nav({ setOpen }: Props) {
  const navRef = useRef<HTMLElement>(null);

  const close = () => setOpen(false);

  return (
    <nav
      ref={navRef}
      className="main-nav"
      onFocus={() => {
        setOpen(true);
      }}
      onBlur={(e) => {
        if (!navRef.current?.contains(e.relatedTarget)) {
          close();
        }
      }}
    >
      <div className="nav-links">
        <Link to="/" onClick={close}>
          Home
        </Link>
        {
          /*<Link to="/projects" onClick={close}>
            Projects
            </Link>*/
        }
        <Link to="/blog" onClick={close}>Blog</Link>
      </div>
    </nav>
  );
}
