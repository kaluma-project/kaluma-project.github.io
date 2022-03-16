import React from 'react';
import '../styles/main.scss';

export default function Home() {
  return (
    <div>
      <h1>Hello Gatsby!</h1>
      <p>
        <b>Kaluma</b> is a tiny and efficient JavaScript runtime for RP2040
        (Raspberry Pi Pico). The main features are:
      </p>
      <ul>
        <li>
          <u>Small footprint</u>. Runs minimally on microcontrollers with 300KB
          ROM with 64KB RAM.
        </li>
        <li>
          Support <u>modern JavaScript</u> standards (ECMAScript 5/6/6+).
          Powered by <a href="https://jerryscript.net/">JerryScript</a>.
        </li>
        <li>
          Has internal event loop like as Node.js for <u>asynchronous</u>.
        </li>
        <li>
          Has <u>built-in modules</u> including file systems (LittleFS, FAT),
          graphics, networking and more.
        </li>
        <li>
          Support RP2's <u>PIO (Programmable I/O) inline assembly</u> in
          JavaScript code.
        </li>
        <li>
          Provides very friendly API that resembles <u>Node.js</u> and
          <u>Arduino</u>.
        </li>
      </ul>
    </div>
  );
}
