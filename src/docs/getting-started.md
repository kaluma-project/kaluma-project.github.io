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

## Install CLI (Command-Line Interface)

First of all, we have to install [Kaluma CLI](https://github.com/kaluma-project/kaluma-cli) in your local computer to work with boards Kaluma installed. Of course, it is assumed that [Node.js](https://nodejs.org) is installed.

```bash
$ npm install -g @kaluma/cli
```

After installation you can see help message with `help` command.

```bash
$ kaluma help
```

## Connect with Terminal

Once you installed the firmware, you can use the board in [REPL](/docs/repl) mode with any ANSI/VT100 compatible serial terminals. CLI provides a simple serial terminal feature with `shell` command:

```bash
$ kaluma shell

# you can specify a serial port
$ kaluma shell --port /dev/tty.usbmodem0000000000001

# to see all available serial ports
$ kaluma ports
```

Then you will see a welcome message and the prompt `>` (If you cannot see the prompt, press `Enter` several times). On the prompt you can enter any JavaScript expressions or [REPL commands](/docs/repl). Type `.help` command, you will see all available REPL commands.

```plain
> .help
```

You can exit the CLI shell connection by pressing `ctrl+z`.

You can use other serial terminal programs including `screen` command in macOS and Linux, or [PuTTY](https://www.putty.org/)) in Windows.

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

Use CLI to flash `index.js` to your board.

```bash
$ kaluma flash index.js
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
$ kaluma bundle ./index.js
```

You can find `bundle.js` file and flash the bundled code.

```bash
$ kaluma flash ./bundle.js
```

Or shorty, you can bundle and flash at once with `--bundle` option.

```bash
$ kaluma flash ./index.js --bundle
```

## Debug

To check the errors raised during the code execution, you need to connect with serial terminal again. However CLI's `flash` command will load the code automatically so you can't see the error messages. So you have to use `--shell` option to flash code with shell connection.

```bash
$ kaluma flash ./index.js --bundle --shell
```

Then you can see all console logs and errors because shell connection still alive even after flashing code. Hit `ctrl+z` to quit.

Sometimes the flashed code can crash the board. Because Kaluma automatically execute the code in flash on boot, you have no way to recover the board in software manner. In this case you can skip code loading on boot by wiring `GP22` pin and `GND` pin (See [Skip code loading on boot](/docs/boards/rp2/#skip-code-loading-on-boot)). And then remove the code from the internal flash in REPL mode.

```plain
> .flash -e
```
