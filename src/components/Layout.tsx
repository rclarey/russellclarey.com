import React, { PropsWithChildren, useEffect, useState } from "react";

import { animated, useTransition } from "@react-spring/web";

import { HueSelector } from "./HueSelector";
import { MenuToggle } from "./MenuToggle";
import { ModeToggle } from "./ModeToggle";
import { Nav } from "./Nav";
import { setFavicon } from "../utils/favicon";
import { useFirstRender } from "../utils/presentation";

interface Props {
  location: Location;
}

const config = { tension: 200, friction: 20, clamp: true };

export function Layout({ children, location }: PropsWithChildren<Props>) {
  useEffect(() => {
    setTimeout(() => {
      setFavicon(localStorage.getItem("preferredHue") ?? "221");
    }, 100);
  }, []);

  const enterOnHome = useFirstRender() && location.pathname === "/";

  const [navOpen, setNavOpen] = useState(false);
  const [hueOpen, setHueOpen] = useState(false);

  const contentTransition = useTransition(children, {
    initial: { opacity: 1 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    immediate: location.hash === "#content",
    exitBeforeEnter: location.hash !== "#content",
    config,
  });

  const enterTransition = useTransition(null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    immediate: !enterOnHome,
    delay: enterOnHome ? 1750 : 0,
    config,
  });

  const closeNav = () => setNavOpen(false);

  return (
    <div className={navOpen ? "nav-open layout" : "layout"}>
      <a
        id="skip-link"
        className="skip-link"
        href="#content"
      >
        Skip to content
      </a>
      {enterTransition((styles) => (
        <animated.div className="top-buttons" style={styles}>
          <MenuToggle open={navOpen} setOpen={setNavOpen} />
        </animated.div>
      ))}
      <Nav setOpen={setNavOpen} />
      <div className="empty-expander">
        <div
          className="content"
          onClick={closeNav}
        >
          <div id="content" />
          {contentTransition((styles, item) => (
            <animated.div style={styles}>
              {React.cloneElement(item, { isFirstRender: enterOnHome })}
            </animated.div>
          ))}
        </div>
        {enterTransition((styles) => (
          <animated.footer
            style={styles}
            onClick={closeNav}
          >
            <div className="footer-content">
              <div className="footer-links">
                <a
                  className="footer-link"
                  href="https://github.com/rclarey"
                  target="_blank"
                >
                  GitHub
                </a>
                <a
                  className="footer-link"
                  href="https://www.linkedin.com/in/rclarey/"
                  target="_blank"
                >
                  LinkedIn
                </a>
              </div>
              <p className="copyright">
                &copy; Russell Clarey {new Date().getFullYear()}
              </p>
            </div>
          </animated.footer>
        ))}
      </div>
      {enterTransition((styles) => (
        <animated.div className="bottom-buttons" style={styles}>
          <MenuToggle
            open={navOpen}
            setOpen={setNavOpen}
            mobile
          />
          <HueSelector open={hueOpen} setOpen={setHueOpen} />
          <ModeToggle />
        </animated.div>
      ))}
      <canvas
        id="favicon-canvas"
        height="32"
        width="32"
        hidden
      />
    </div>
  );
}
