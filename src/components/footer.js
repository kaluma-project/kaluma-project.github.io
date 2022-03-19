import React from "react";

export default function Footer({ navs }) {
  return (
    <div className="footer">
      <div>
        {navs.map((nav) =>
          nav.blank ? (
            <a
              className="text-secondary text-decoration-none px-2"
              href={nav.url}
              target="_blank"
              rel="noreferrer"
              key={nav.name}
            >
              {nav.name}
            </a>
          ) : (
            <a
              className="text-secondary text-decoration-none px-2"
              href={nav.url}
              key={nav.name}
            >
              {nav.name}
            </a>
          )
        )}
        <a
          className="text-secondary text-decoration-none px-2"
          href="https://github.com/kaluma-project/kaluma"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
      </div>
    </div>
  );
}
