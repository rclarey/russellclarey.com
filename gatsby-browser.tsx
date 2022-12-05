import React from "react";
import { GatsbyBrowser } from "gatsby";

import { Layout } from "./src/components/Layout";

import "inter-ui/inter.css";
import "./src/global.css";

export const onClientEntry: GatsbyBrowser["onClientEntry"] = () => {
  try {
    const hue = localStorage.getItem("preferredHue");
    const mode = localStorage.getItem("preferredColorScheme");
    if (hue) {
      document.body.style.setProperty("--hue", hue);
    }
    if (mode) {
      document.body.classList.add(mode);
    }
  } catch {
    // do nothing
  }
};

export const onRouteUpdate: GatsbyBrowser["onRouteUpdate"] = (
  { prevLocation, location },
) => {
  if (!!prevLocation && location.hash !== "#content") {
    document.getElementById("skip-link")?.focus();
  }
};

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({
  element,
  props: { location },
}) => <Layout location={location}>{element}</Layout>;
