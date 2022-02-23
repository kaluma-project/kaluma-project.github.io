---
layout: 'doc.njk'
title: 'Getting Started'
tags: 'docs'
order: 2
---

# Getting Started

In this article we will give you a quick tutorial to get start within 10 minutes.

## Get a Rasberry Pi Pico

Get a [Raspberry Pi Pico](https://www.raspberrypi.org/products/raspberry-pi-pico/) board or other RP2040 board.

## Install firmware

![Pico](/images/pico-bootsel.png)

- [Download](/download) firmware (**.UF2**).
- Push and hold the **BOOTSEL** button and plug into USB port of your computer, and then release the button. It will mount as USB storage device named **RPI-RP2**.
- Drag and drop the downloaded **.UF2** onto the **RPI-RP2** volume. Your Pico will reboot automatically.

## Connect with Terminal

Once you installed the firmware, you use the board in [REPL](/docs/repl) mode with any ANSI/VT100 compatible serial terminals. In MacOS or Linux you can simply connect with `screen` command (Use other serial terminals in Windows like [PuTTY](https://www.putty.org/)).

```bash
$ screen <port> <baudrate>

# for MacOS
$ screen /dev/tty.usbmodem.. 115200

# or for Linux
$ sudo screen /dev/ttyACM.. 115200
```

Then you can see prompt `>` (If you cannot see the prompt, press `Enter` several times). On the prompt you can enter any JavaScript expressions or [REPL commands](/docs/repl). Type `.hi` command, you will see a welcome message.

```bash
> .hi
```

To see all available REPL commands, type `.help`.

```plain
> .help
```

To exit the screen terminal, press `ctrl+a`, `k`, `y`.

## Setup project

To create a project, simply make a directory.

```bash
$ mkdir kaluma-app
$ cd kaluma-app
```

We recommend to initialize the project with NPM to create `package.json`.

```bash
$ npm init -y
```

## Write your code

Let's write the first blink code `index.js` in the project folder with any text editor (VSCode, Atom, Sublime Text, etc).

```js
// index.js
const led = 25;
pinMode(led, OUTPUT);
setInterval(() => {
  digitalToggle(led);
}, 1000);
```

## Flash your code

To flash the code to your board, we need [Kaluma CLI](https://github.com/kaluma-project/kaluma-cli). Of course, it is assumed that [Node.js](https://nodejs.org) is installed.

```bash
$ npm install -g @kaluma/cli
```

Use CLI to flash `index.js` to your board. You need to know which serial port is connected to your board using CLI: `kaluma ports`.

```bash
$ kaluma flash index.js --port <port>
```

After uploading successfully, you will see a blinking LED on the board.

## Install third-party packages

You can install third-party packages with NPM. You can find third-party packages for Kaluma in [Packages](/packages).

```bash
$ npm install https://github.com/niklauslee/dht --save
```

Then you can import the package with `require()`.

```js
const { DHT } = require('dht');
```

## Bundle multiple files

Please remember that only a single `.js` file can be flashed in Kaluma. If you are using multiple `.js` files or using third-party modules installed by `npm install`, you have to bundle them into the a single `.js` file.

```bash
$ kaluma bundle index.js
```

You can find `bundle.js` file and flash the bundled code.

```bash
$ kaluma flash bundle.js --port <port>
```

Or shorty, you can bundle and flash at once with `--bundle` option.

```bash
$ kaluma flash index.js --port <port> --bundle
```

## Debug

To check the errors raised during the code execution, you need to connect with serial terminal again. However CLI's `flash` command will load the code automatically so you can't see the error messages. So you have to use `--no-load` option of `flash` command to avoid code loading.

```bash
$ kaluma flash index.js --port <port> --no-load
```

Then connect with terminal and type `.load` command in REPL mode. You will see the errors in console if any.

```plain
> .load
```
