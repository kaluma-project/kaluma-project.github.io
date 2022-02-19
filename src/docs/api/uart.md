---
layout: "doc.njk"
title: "UART"
tags: "api"
---

# UART

The `uart` module supports communication with computers or devices using serial ports (UART). Use `require('uart')` to access this module.

## Class: UART

An instances of `UART` represents a UART port.

### UART.PARITY\_NONE

* `<number>` = `0`.

Do not use a parity bit.

### UART.PARITY\_ODD

* `<number>` = `1`.

Use odd parity bit

### UART.PARITY\_EVEN

* `<number>` = `2`.

Use even parity bit

### UART.FLOW\_NONE

* `<number>` = `0`.

Do not use flow control.

### UART.FLOW\_RTS

* `<number>` = `1`.

Use RTS flow control.

### UART.FLOW\_CTS

* `<number>` = `2`.

Use CTS flow control.

### UART.FLOW\_RTS\_CTS

* `<number>` = `3`.

Use both RTS and CTS flow control.

### new UART(port\[, options])

* **`port`** `<number>` UART port number. This value should be less than max port number.
* **`options`** `<object>` The object of UART options. _Default values are depends on board (Check in a board page)._
  * **`baudrate`** `<number>` Baud rate. One of the `[0, 50, 75, 110, 134, 150, 200, 300, 600, 1200, 1800, 2400, 4800, 9600, 19200, 38400, 57600, 115200, 230400]`.
  * **`bits`** `<number>` Number of bits per a character. One of the `[8, 9]`. **Default:**`8`
  * **`parity`** `<number>`. The parity is one of the `UART.PARITY_NONE (0)`, `UART.PARITY_ODD (1)`, or `UART.PARITY_EVEN (2)`. **Default:** `UART.PARITY_NONE`.
  * **`stop`** `<number>` Number of stop bits. One of the `[1, 2]`. **Default:** `1`.
  * **`flow`** `<number>` Flow control. One of the `UART.FLOW_NONE (0)`, `UART.FLOW_RTS (1)`, `UART.FLOW_CTS (2)`, or `UART.FLOW_RTS_CTS (3)`. **Default:** `UART.FLOW_NONE`
  * **`bufferSize`** `<number>` The size of internal read buffer.
  * **`tx`** `<number>` UART TX pin number.
  * **`rx`** `<number>` UART RX pin number.

```javascript
// Create the UART instance and close it 
const {UART} = require('uart');
const options = {
  baudrate: 9600,
  bits: 8,
  partity: UART.PARTIY_NONE,
  stop: 1,
  flow: UART.FLOW_NONE,
  bufferSize: 2048
};
const serial0 = new UART(0, options);
// read or write data...
serial0.close();
```

### write(data\[, options])

* **`data`** `<Uint8Array|string>` Data to write.
* **`options`** `<object>`&#x20;
  * **`count`** `<number>` Indicates how many times to write data. **Default:** `1`.

Writes data to the UART port.

```javascript
const {UART} = require('uart');
const serial0 = new UART(0, {baudrate: 38400});

// Write a string
serial0.write('Hello, world\n');

// Write Uint8Array
serial0.write(new Uint8Array([0x00, 0x7f, 0x80, 0xff]));

serial0.close();
```

### close()

Close the UART port.

### Event: 'data'

* **`data`** `<Uint8Array>` Received data.

The `data` event is emitted whenever data is arrived (buffer size may varies).

```javascript
const {UART} = require('uart');
const serial0 = new UART(0);
serial0.on('data', (data) => {
  var s = String.fromCharCode.apply(null, data);
  print(s);
});
```
