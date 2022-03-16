import React from 'react';

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
            >
              {nav.name}
            </a>
          ) : (
            <a
              className="text-secondary text-decoration-none px-2"
              href={nav.url}
            >
              {nav.name}
            </a>
          )
        )}
        <a
          className="text-secondary text-decoration-none px-2"
          href="https://github.com/kaluma-project/kaluma"
          target="_blank"
        >
          Github
        </a>
      </div>
    </div>
  );
}
