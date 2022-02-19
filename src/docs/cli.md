---
layout: "doc.njk"
title: "CLI"
tags: "docs"
---

# CLI (Command Line Interface)

You can also code with your familiar editors (e.g. Visual Studio Code, Atom, Sublime Text, etc.) and then upload the code with [Kaluma CLI](https://github.com/kaluma-project/kaluma-cli).

> You can only upload only a single `.js` file with CLI. If you want to upload multiple `.js` files, you need to bundle them into a single `.js` file using Webpack or other bundlers. Here is a [sample local project](https://github.com/kaluma-project/local-project-sample) showing how to setup a project in local with Webpack.

> Different from Web IDE, CLI only allows to upload a single `.js` file in local. If you want to use third-party modules, you have to configure project by yourself with [Webpack](https://webpack.js.org) or other bundlers for bundling them into a single `.js` file.

## Install Kaluma CLI

Open a terminal and install Kaluma CLI. Before installing CLI, please ensure that [Node.js/NPM](https://nodejs.org) is already installed. Sometimes you may need to use `sudo`. If you are using Apple M1 Mac or Raspberry Pi OS, you need to install with `--unsafe-perm` and `--build-from-source` options.

```bash
$ npm install -g @kaluma/cli

# for Apple M1 or Raspberry Pi
$ sudo npm install -g @kaluma/cli --unsafe-perm --build-from-source
```

## Write you code

Write your code with your familiar code editor.


```js
// index.js
const led = 25; // LED is GP25
pinMode(led, OUTPUT);
setInterval(function () {
  digitalToggle(led);
}, 1000);
```

## Plug the board

Plug the board into USB port of your computer and then check serial port where the board is connect.

```bash
$ kaluma list  # list available serial ports
# e.g.) COM? (for Windows)
# e.g.) /dev/tty.usbmodem? (for MacOS)
# e.g.) /dev/ttyACM? (for Linux)
```

## Upload your code

Upload your code to the board using CLI.

```bash
$ kaluma write index.js -p <port>
```
