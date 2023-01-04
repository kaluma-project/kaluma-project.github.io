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

## Object: board

This section shows the Raspberry Pi Pico specific properties of the global [board](/docs/api/board/) object.

### board.LED

- `<number>`&#x20;

The GPIO number for the on-board LED.
 * Pico-W does not have on-board LED which is controlled by RP2040. On-board LED on Pico-W can be controlled by pico_cyw43 module.

```javascript
console.log(board.LED); // 25 for pico and undefined for pico-w
```

## Modules

### CYW43

Raspberry Pi Pico W has an on-board WiFi module using the Infineon CYW43439.
Kamula support [CYW43](/docs/api/cyw43) module as WiFi and network driver.
