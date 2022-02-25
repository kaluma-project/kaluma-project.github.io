---
layout: "doc.njk"
title: "RP2 (Raspberry Pi Pico)"
tags: "boards"
---

# RP2 (Raspberry Pi Pico)

This page describes information about the Kaluma port for [Raspberry Pi Pico](https://www.raspberrypi.org/products/raspberry-pi-pico/).

## Pinout

![Raspberry Pi Pico (from https://raspberrypi.org)](/images/doc-pico-pinout.svg)

## Upload firmware (.UF2)

You can upload Kaluma firmware to your Raspberry Pi Pico board by following steps.

1. Download Kaluma firmware `.UF2` file from [https://kaluma.io/download](https://kaluma.io/download).
2. Push and hold the `BOOTSEL` button and plug into USB port of your computer. Release the `BOOTSEL` button after connected. It will mount as as USB storage device named `RPI-RP2`.
3. Drag and drop the downloaded `.UF2` onto the `RPI-RP2` volume. Your Pico will reboot automatically.
4. Now Kaluma is running on your Pico.

## Skip code loading on boot

Sometimes you need to skip loading the code stored in the internal flash on boot. You can skip code loading by setting `GP22` to `GND`.

![Skip code loading by set GP22 to GND](/images/doc-skip-loading.png)

## Object: board

This section shows the Raspberry Pi Pico specific properties of the global [board](/docs/api/board/) object.

### board.LED

* `<number>`&#x20;

The GPIO number for the on-board LED.

```javascript
console.log(board.LED); // 25
```

## Flash

Pico has 2MB flash size. 1008KB are used for firmware binary and the rest (1040KB) are used for user (total 260 blocks, block size is 4KB). Here is the flash allocation map.

| Block    | Size  |                                                           |
| -------- | ----- | --------------------------------------------------------- |
| 0\~3     | 16KB  | [Storage](/docs/api/storage) (Key-Value)        |
| 4\~131   | 512KB | User Program                                              |
| 132\~259 | 512KB | [File System](/docs/api/file-system) (LittleFS) |

## PWM

There are 16 PWM channels (8 2-channel slices). GPIO pins sharing a channel (e.g. GPIO 0 and GPIO16) cannot be used at the same time.

| GPIO | Channel | GPIO | Channel | GPIO | Channel |
| ---- | ------- | ---- | ------- | ---- | ------- |
| 0    | 0A      | 10   | 5A      | 20   | 2A      |
| 1    | 0B      | 11   | 5B      | 21   | 2B      |
| 2    | 1A      | 12   | 6A      | 22   | 3A      |
| 3    | 1B      | 13   | 6B      | 23   | 3B      |
| 4    | 2A      | 14   | 7A      | 24   | 4A      |
| 5    | 2B      | 15   | 7B      | 25   | 4B      |
| 6    | 3A      | 16   | 0A      | 26   | 5A      |
| 7    | 3B      | 17   | 0B      | 27   | 5B      |
| 8    | 4A      | 18   | 1A      | 28   | 6A      |
| 9    | 4B      | 19   | 1B      | 29   | 6B      |

## I2C

Default values for I2C functions.

| Function     | Default |
| ------------ | ------- |
| I2C baudrate | 400,000 |
| I2C0 SCL     | GPIO 4  |
| I2C0 SDA     | GPIO 5  |
| I2C1 SCL     | GPIO 2  |
| I2C1 SDA     | GPIO 3  |

## SPI

Default values for SPI functions.

| Function       | Default   |
| -------------- | --------- |
| SPI baudrate   | 1,000,000 |
| SPI0 SCK       | GPIO 18   |
| SPI0 MOSI (TX) | GPIO 19   |
| SPI0 MISO (RX) | GPIO 16   |
| SPI1 SCK       | GPIO 10   |
| SPI1 MOSI (TX) | GPIO 11   |
| SPI1 MISO (RX) | GPIO 12   |

## UART

Default values for UART functions.

| Function         | Default |
| ---------------- | ------- |
| UART baudrate    | 115,200 |
| UART buffer size | 2,048   |
| UART0 TX         | GPIO 0  |
| UART0 RX         | GPIO 1  |
| UART1 TX         | GPIO 8  |
| UART1 RX         | GPIO 9  |

## Storage

Capacity for [Storage](/docs/api/storage) functions.

| Capacity                    | Value                             |
| --------------------------- | --------------------------------- |
| Max size of storage item    | 253 bytes (key size + value size) |
| Max number of storage items | 64                                |
