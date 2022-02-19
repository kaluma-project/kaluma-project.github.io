---
layout: "doc.njk"
title: "Getting Started"
tags: "docs"
---

# Getting Started

## Installation

![Pico](/images/pico-bootsel.png)

- Get a [Raspberry Pi Pico](https://www.raspberrypi.org/products/raspberry-pi-pico/) board or other RP2040 board.
- [Download](/download) firmware __.UF2__ file.
- Push and hold the __BOOTSEL__ button and plug into USB port of your computer, and then release the button. It will mount as USB storage device named __RPI-RP2__.
- Drag and drop the downloaded __.UF2__ onto the __RPI-RP2__ volume. Your Pico will reboot automatically.

## Getting Started

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
npm install -g @kaluma/cli
```

Use CLI to upload `index.js` to your board. You need to know which serial port is connected to your board using CLI: `kaluma ports`.

```bash
kaluma flash index.js --port <port>
```

After uploading successfully, you will see a blinking LED on the board.

## Using third-party packages

You can install a Git repository directly with NPM. You can find third-party packages for Kaluma in [Packages](/packages).

```bash
npm install https://github.com/niklauslee/dht
```

Then you can import the package with `require()`.

```js
const {DHT} = require('dht');
```

If you are using third-party packages or using multie `.js` files, you have to bundle them into a single `.js`.

```bash
kaluma bundle index.js
kaluma flash bundle.js --port <port>
```

You can bundle and flash at once:

```bash
kaluma flash index.js --bundle --port <port>
```
