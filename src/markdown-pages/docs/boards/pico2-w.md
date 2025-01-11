---
layout: 'doc.js'
title: 'Pico2 W'
slug: 'docs/boards/pico2-w'
category: 'board'
order: 0
---

# Raspberry Pi Pico 2W

This page describes information about the Kaluma port for [Raspberry Pi Pico2 W](https://www.raspberrypi.org/products/raspberry-pi-pico-2/).

> Note that this page describes only the differences from the Pico board. Please see the [Pico](/docs/boards/pico) page for the information not covered here.

## Pinout

![Raspberry Pi Pico2-w (from https://www.raspberrypi.com)](https://www.raspberrypi.com/documentation/microcontrollers/images/pico2w-pinout.svg)

## On-board LED

Pico-W does not have on-board LED which is controlled by RP2040. Instead, the on-board LED can be controlled by [CYW43](/docs/api/cyw43) module as below:

```js
const { PicoCYW43 } = require('pico_cyw43');
const pico_cyw43 = new PicoCYW43();

// Blink on-board LED
setInterval(() => {
  if (pico_cyw43.getGpio(0)) {
    pico_cyw43.putGpio(0, false); // turn-off LED
  } else {
    pico_cyw43.putGpio(0, true); // turn-on LED
  }
}, 1000);
```

## Flash

Pico has 4MB flash size. 960KB are used for firmware binary and the rest (3136KB) are used for user (total 768 blocks, block size is 4KB). Here is the flash allocation map.

| Block    | Size   |                                                 |
| -------- | ------ | ----------------------------------------------- |
| 0\~15    | 64KB   | [Storage](/docs/api/storage) (Key-Value)        |
| 16\~383  | 1472KB | User Program                                    |
| 384\~767 | 1536KB | [File System](/docs/api/file-system) (LittleFS) |

## Modules

Supported modules more than Pico board:

- [CYW43](/docs/api/cyw43)
- [Wi-Fi](/docs/api/wifi)
- [Net](/docs/api/net)
- [HTTP](/docs/api/http)

### CYW43

Raspberry Pi Pico W has an on-board WiFi module using the Infineon CYW43439.
Kamula support [CYW43](/docs/api/cyw43) module as WiFi and network driver.
