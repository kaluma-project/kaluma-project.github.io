---
layout: 'page.js'
title: 'Home'
slug: '__home'
---

**Kaluma** is a tiny and efficient JavaScript runtime for RP2040 (Raspberry Pi Pico). The main features are:

- <u>Small footprint</u>. Runs minimally on microcontrollers with 300KB ROM with 64KB RAM.
- Support <u>modern JavaScript</u> standards (ECMAScript 5/6/6+). Powered by [JerryScript](https://jerryscript.net/).
- Has internal event loop like as Node.js for <u>asynchronous</u>.
- Has <u>built-in modules</u> including file systems (LittleFS, FAT), graphics, networking and more.
- Support RP2's <u>PIO (Programmable I/O) inline assembly</u> in JavaScript code.
- Provides very friendly API that resembles <u>Node.js</u> and <u>Arduino</u>.

### Installation

![Pico](/images/pico-bootsel.png)

- Get a [Raspberry Pi Pico](https://www.raspberrypi.org/products/raspberry-pi-pico/) board or other RP2040 board.
- [Download](/download) firmware **.UF2** file.
- Push and hold the **BOOTSEL** button and plug into USB port of your computer, and then release the button. It will mount as USB storage device named **RPI-RP2**.
- Drag and drop the downloaded **.UF2** onto the **RPI-RP2** volume. Your Pico will reboot automatically.

### Quick Start

Write the first blink code with any text editor.

```js
// index.js
const led = 25;
pinMode(led, OUTPUT);
setInterval(() => {
  digitalToggle(led);
}, 1000);
```

To upload code to your board, we need [Kaluma CLI](https://github.com/kaluma-project/kaluma-cli). Of course, it is assumed that [Node.js](https://nodejs.org) is installed.

```bash
$ npm install -g @kaluma/cli
```

Use `flash` command of CLI to upload `index.js` to your board. CLI automatically finds a serial port which Raspberry Pi Pico is connected. If you want to specify a serial port to upload code, use `--port` option.

```bash
$ kaluma flash index.js
```

After uploading successfully, you will see a blinking LED on the board.
