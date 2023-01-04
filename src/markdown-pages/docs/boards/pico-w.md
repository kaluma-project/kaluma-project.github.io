---
layout: 'doc.js'
title: 'Pico W'
slug: 'docs/boards/pico-w'
category: 'board'
order: 0
---

# Raspberry Pi Pico W

> **CURRENTLY IN BETA AND SUBJECT OF CHANGE**

This page describes information about the Kaluma port for [Raspberry Pi Pico W](https://www.raspberrypi.org/products/raspberry-pi-pico/).

> Note that this page describes only the differences from the Pico board. Please see the [Pico](/docs/boards/pico) page for the information not covered here.

## Pinout

![Raspberry Pi Pico W (from https://raspberrypi.org)](/images/doc-pico-w-pinout.svg)

## On-board LED

Pico-W does not have on-board LED which is controlled by RP2040. Instead, the on-board LED can be controlled by [CYW43](/docs/api/cyw43) module as below:

```js
const { PicoCYW43 } = require('pico_cyw43');
const pico_cyw43 = new PicoCYW43();

// Blink on-board LED
setInterval(() => {
  if (pico_cyw43.getGpio(0) === false) {
    pico_cyw43.putGpio(0, true); // turn on LED
  } else {
    pico_cyw43.putGpio(0, false); // turn off LED
  }
}, 1000);
```

## Modules

Supported modules:

- [CYW43](/docs/api/cyw43)
- [Wi-Fi](/docs/api/wifi)
- [Net](/docs/api/net)
- [HTTP](/docs/api/http)

### CYW43

Raspberry Pi Pico W has an on-board WiFi module using the Infineon CYW43439.
Kamula support [CYW43](/docs/api/cyw43) module as WiFi and network driver.
