---
layout: 'doc.js'
title: 'SPI'
slug: 'docs/api/spi'
category: 'api'
---

# SPI

The `spi` module supports communication with devices using SPI (Serial Peripheral Interface) bus as the master device. Use `require('spi')` to access this module. A chip select pin of slave device need to be controlled by GPIO output pin.

## Class: SPI

An instances of `SPI` represents a SPI bus.

### SPI.MODE_0

- `<number>` = `0`

'SPI MODE0: CPOL = 0, CPHA = 0

### SPI.MODE_1

- `<number>` = `1`

'SPI MODE0: CPOL = 0, CPHA = 1

### SPI.MODE_2

- `<number>` = `2`

'SPI MODE0: CPOL = 1, CPHA = 0

### SPI.MODE_3

- `<number>` = `3`

'SPI MODE0: CPOL = 1, CPHA = 1

### SPI.MSB

- `<number>` = `0`

SPI bitorder, MSB is the first bit.

### SPI.LSB

- `<number>` = `1`

SPI bitorder, LSB is the first bit.

### new SPI(bus\[, options])

- **`bus`** `<number>` SPI bus number.
- **`options`** `<object>` The object of SPI options. _Default values are depends on board (Check in a board page)._
  - **`mode`** `<number>` `SPI.MODE_0` (CPOL=0/CPHA=0), `SPI.MODE_1` (CPOL=0/CPHA=1), `SPI.MODE_2` (CPOL=1/CPHA=0), or `SPI.MODE_3` (CPOL=1/CPHA=1). **Default:** `SPI.MODE_0`.
  - **`baudrate`** `<number>` Baud rate. **Default:** `3000000`, 3 Mbit/s
  - **`bitorder`** `<number>` `SPI.MSB (0)` or `SPI.LSB (1)` **Default:** `SPI.MSB (0)`.
  - **`sck`** `<number>` SPI SCK pin number.
  - **`mosi`** `<number>` SPI MOSI (TX) pin number.
  - **`miso`** `<number>` SPI MISO (RX) pin number.
- **Returns:** `<object>` An initialized SPI instance corresponds to the bus number. Once initialized, the same object will be returned.

Instances of the `SPI` class can be created using the new keyword or by calling spi.SPI() as a function. A `RangeError` will be thrown if **`bus`** is not less than max bus number. Please see [here](https://en.wikipedia.org/wiki/Serial_Peripheral_Interface#Clock_polarity_and_phase) for more about SPI modes.

```javascript
// Create the SPI instance with master mode
const { GPIO } = require('gpio');
const { SPI } = require('spi');

var spi0cs = new GPIO(9, OUTPUT); // Set chip select to pin 9.
var spiOptions = {
  // SPI options
  mode: SPI.MODE_0,
  baudrate: 800000,
  bitorder: SPI.MSB,
};
var spi0 = new SPI(0, spiOptions);
// ChipSelect LOW
spi0cs.write(LOW);
// transfer data...
spi0.close(); // Close SPI bus 0
```

### spi.transfer(data\[, timeout])

- **`data`** `<Uint8Array|string>` Data to write.
- **`timeout`** `<number>` Timeout in milliseconds. **Default:** `5000`.
- **Returns:** `<Uint8Array>` Received data or `null` if failed to transfer or timeout.

Send and receive data simultaneously via SPI bus.

```javascript
const { GPIO } = require('gpio');
const { SPI } = require('spi');

var spi0cs = new GPIO(9, OUTPUT); // Set chip select to pin 9.
var spiOptions = {
  // SPI options
  mode: SPI.MODE_0,
  baudrate: 800000,
  bitorder: SPI.MSB,
};
var spi0 = new SPI(0, spiOptions);
// ChipSelect LOW
spi0cs.write(LOW);
// Send two bytes and receive two bytes
var buf = spi0.transfer(new Uint8Array([0x88, 0x24])); // send and receive two byte data.
if (buf) {
  console.log(data.length); // == 2
  console.log(data[0]); // first byte
  console.log(data[1]); // second byte
}
```

### spi.send(data\[, timeout\[, count]])

- **`data`** `<Uint8Array|string>` Data to write.
- **`timeout`** `<number>` Timeout in milliseconds. **Default:** `5000`.
- **`count`** `<number>` Indicates how many times to send data. Default: `1`.
- **Returns:** `<number>` The number of bytes written, `-1` if it failed to write or timeout.

Send data via SPI bus

```javascript
const { GPIO } = require('gpio');
const { SPI } = require('spi');

var spi0cs = new GPIO(9, OUTPUT); // Set chip select to pin 9.
var spiOptions = {
  // SPI options
  mode: SPI.MODE_0,
  baudrate: 800000,
  bitorder: SPI.MSB,
};
var spi0 = new SPI(0, spiOptions);
// ChipSelect LOW
spi0cs.write(LOW);

// Send 2 bytes with an array of numbers
var array = new Uint8Array([0x6b, 0x00]);
spi0.send(array);
```

### spi.recv(length\[, timeout])

- **`length`** `<number>` Data length to read.
- **`timeout`** `<number>` Timeout in milliseconds. **Default:** `5000`.
- **Returns:** `<Uint8Array>` Received data or `null` if failed to transfer or timeout.

Receive data via SPI bus.

```javascript
const { GPIO } = require('gpio');
const { SPI } = require('spi');

var spi0cs = new GPIO(9, OUTPUT); // Set chip select to pin 9.
var spiOptions = {
  // SPI options
  mode: SPI.MODE_0,
  baudrate: 800000,
  bitorder: SPI.MSB,
};
var spi0 = new SPI(0, spiOptions);
// ChipSelect LOW
spi0cs.write(LOW);

// Receive 10 bytes
var buf = spi0.recv(10);
if (buf) {
  console.log(data.length); // == 10
  console.log(data[0]); // first byte
  console.log(data[1]); // second byte
  // ...
}

spi0.close();
```

### spi.close()

Closes the SPI bus.

```javascript
const { GPIO } = require('gpio');
const { SPI } = require('spi');

var spi0cs = new GPIO(9, OUTPUT); // Set chip select to pin 9.
var spiOptions = {
  // SPI options
  mode: SPI.MODE_0,
  baudrate: 800000,
  bitorder: SPI.MSB,
};
var spi0 = new SPI(0, spiOptions);
// transfer data...
spi0.close(); // Close SPI bus 0
```
