import * as React from "react";

import { HeadFC } from "gatsby";
import { animated, useTransition } from "@react-spring/web";

const projects = [
  {
    title: "torrent",
    desc: "A work-in-progress BitTorrent client library for Deno",
    link: "https://github.com/rclarey/torrent",
  },
  {
    title: "socks5",
    desc:
      "A SOCKS5 proxy library for Deno which supports proxying both TCP and UDP",
    link: "https://github.com/rclarey/socks5",
  },
  {
    title: "send",
    desc:
      "Easy end-to-end encrypted file sharing with download links that automatically expire",
    link: "https://github.com/rclarey/send",
  },
  {
    title: "cloudcode",
    desc:
      "A site to easily share code snippets, and collaboratively edit them in real-time",
    link: "https://github.com/rclarey/cloudcode",
  },
  {
    title: "simple-ot",
    desc: "A domain-agnostic operational transform library",
    link: "https://github.com/rclarey/simple-ot",
  },
];

interface Props {
  isFirstRender: boolean;
}

const config = { tension: 280, friction: 120, clamp: true };

const IndexPage = ({ isFirstRender }: Props) => {
  const parts = [
    { t: animated.h1, props: {}, children: "Russell Clarey" },
    {
      t: animated.div,
      props: {},
      children: (
        <>
          <div className="short-bio">
            <p>
              I’m a software engineer based in Tokyo. I mostly work with React
              and TypeScript, but recently I&apos;ve been dabbling in some Rust.
            </p>
            <p>Some of the things I&apos;ve worked on recently:</p>
          </div>
          <div className="landing-showcase">
            {projects.map(({ title, desc, link }, i) => (
              <a
                key={title}
                href={link}
                target="_blank"
                className={`card ${i % 2 === 0 ? "card-odd" : ""}`}
              >
                <figure>
                  <div
                    className="card-g"
                    style={{ background: `var(--card-g-${i})` }}
                  />
                  <figcaption>
                    <p className="card-title">{title}</p>
                    <p className="card-desc">{desc}</p>
                  </figcaption>
                </figure>
              </a>
            ))}
          </div>
          <p className="email-me">
            If you want to get in touch with me you can{" "}
            <a href="mailto:r.e.clarey@gmail.com">email me</a>, otherwise you
            can get to know me better through the links in the footer.
          </p>
        </>
      ),
    },
  ];

  const transition = useTransition(parts, {
    from: { opacity: 0, transform: "translateX(16px)" },
    enter: { opacity: 1, transform: "translateX(0px)" },
    trail: isFirstRender ? 1000 : 0,
    immediate: !isFirstRender,
    config,
  });

  return (
    <main>
      {transition((styles, { t: T, props, children }, _, i) => (
        <T
          {...props}
          style={i === 0 ? styles : { opacity: styles.opacity }}
        >
          {children}
        </T>
      ))}
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <title>Russell Clarey</title>
    <meta name="description" content="I'm a software engineer based in Tokyo" />
    <meta property="og:title" content="Russell Clarey" />
    <meta property="og:type" content="profile" />
    <meta property="og:url" content="https://russellclarey.com" />
    <meta property="profile:first_name" content="Russell" />
    <meta property="profile:last_name" content="Clarey" />
    <link rel="icon" href="" />
    <script type="application/ld+json">
      {`
      {
        "@context": "http://schema.org",
        "@type": "Person",
        "email": "mailto:r.e.clarey@gmail.com",
        "jobTitle": "Software Engineer",
        "name": "Russell Clarey",
        "url": "https://russellclarey.com/"
      }
     `}
    </script>
  </>
);
