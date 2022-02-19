---
layout: "doc.njk"
title: "I2C"
tags: "api"
---

# I2C

The `i2c` module supports communication with I2C (Inter-Integrated Circuit) / TWI (Two Wire Interface) devices. Use `require('i2c')` to access this module.

> Slave Mode is NOT supported yet.

## Class: I2C

An instances of `I2C` represents a I2C bus.

### I2C.MASTER

* `<number>` = `0`

### I2C.SLAVE

* `<number>` = `1`

### new I2C(bus\[, options])

* **`bus`** `<number>` I2C bus number.
* **`options`  **  `<object>` The object of I2C options. _Default values are depends on board (Check in a board page)._
  * **`mode`** `<number>` I2C mode, `I2C.MASTER` or `I2C.SLAVE` mode. **Default:** `I2C.MASTER`
  * **`baudrate`** `<number>` Clock speed (bit/s) for Master mode.
  * **`scl`** `<number>` SCL pin number.
  * **`sda`** `<number>` SDA pin number.
* **Returns:** `<object>` The return value is `I2C` object.

Instances of the `I2C` class can be created using the `new` keyword or by calling `i2c.I2C()` as a function. A `RangeError` will be thrown if **`bus`** exceeds max bus number.

```javascript
// Create the I2C instance with master mode 
const {I2C} = require('i2c');

// open bus 0 in master mode
const i2c0 = new I2C(0);
// read or write ...
i2c0.close();

// open bus 1 in master mode, full speed
const i2c1 = new I2C(1, {mode: I2C.MASTER, baudrate: 400000);
// read or write ...
i2c1.close();
```

### i2c.write(data, address\[, timeout\[, count]])

* **`data`** `<Uint8Array|string>` Data to write.
* **`address`** `<number>` I2C slave address. (7bit)
* **`timeout`** `<number>` Timeout in milliseconds. **Default:** `5000`.
* **`count`** `<number>` Indicates how many times to write data. **Default:** `1`
* **Returns:** `<number>` The number of bytes written, `-1` if it failed to write or timeout.

This method writes data to the specified address (slave device) and returns the number of bytes written. This method can be called only in master mode.

```javascript
const {I2C} = require('i2c');
const i2c0 = new I2C(0, {baudrate: 50000}); // master mode 50 kbits/s

// Writes 2 bytes as a Uint8Array
var array = new Uint8Array([0x6b, 0x00]);
i2c0.write(array, 0x68);

// Writes 5 bytes as a string
i2c0.write('Hello', 0x68);

i2c0.close();
```

### i2c.read(length, address\[, timeout])

* **`length`** `<number>` Data length to read.
* **`address`** `<number>` I2C slave address. (7bit)
* **`timeout`** `<number>` Timeout in milliseconds. **Default:** `5000`.
* **Returns:** `<Uint8Array>` An array buffer having data read, `null` if failed to read.

This method read data from the specified address (slave device) and returns an array buffer object. This method can be called only in master mode.

```javascript
const {I2C} = require('i2c');
const i2c0 = new I2C(0); 

// Read 14 bytes from the address 0x68.
var buf = i2c0.read(14, 0x68);
if (buf) {
  console.log(data.length); // 14
  console.log(data[0]); // first byte
}
i2c0.close();
```

### i2c.memWrite(data, address, memAddress\[, memAddressSize\[, timeout\[, count]]])

* **`data`** `<Uint8Array|string>` Data to write.
* **`address`** `<number>` I2C slave address. (7bit)
* **`memAddress`** `<number>` Memory address to write.
* **`memAddressSize`** `<number>` Size of `memAddress`. Set `16` when `memAddress` is 16-bit address, or set `8` if `memAddress` is 8-bit address. **Default:** `8`.
* **`timeout`** `<number>` Timeout in milliseconds. **Default:** `5000`.
* **`count`** `<number>` Indicates how many times to write data. **Default:** `1`
* **Returns:**`<number>` The number of bytes written, `-1` if failed to write or timeout.

This method writes data to the memory address in the specified slave device and returns the number of bytes written. This method can be called only in master mode.

```javascript
const {I2C} = require('i2c');
const i2c0 = new I2C(0);

// Writes 2 bytes at memory address 0x10 of slave 0x68
var array = new Uint8Array([0x6b, 0x00]);
i2c0.memWrite(array, 0x68, 0x10);

i2c0.close();
```

### i2c.memRead(length, address, memAddress\[, memAddressSize\[, timeout]])

* **`length`** `<number>` Data length to read.
* **`address`** `<number>` I2C slave address. (7bit)
* **`memAddress`** `<number>` Memory address to read.
* **`memAddressSize`** `<number>` Size of `memAddress`. Set `16` when `memAddress` is 16-bit address, or set `8` when `memAddress` is 8-bit address. **Default:** `8`.
* **`timeout`** `<number>` Timeout in milliseconds. **Default:** `5000`
* **Returns:** `<Uint8Array>` A buffer having data read, `null` if failed to read.

This method read data at memory address from the specified slave device and returns an array buffer object. This method can be called only in master mode.

```javascript
const {I2C} = require('i2c');
const i2c0 = new I2C(0); 

// Read 14 bytes at memory address 0x0100 from slave 0x68
var buf = i2c0.memRead(0x0100, 14, 0x68, 1);
if (buf) {
  console.log(data.length); // 14
  console.log(data[0]); // first byte
}
i2c0.close();
```

### i2c.close()

This method closes the I2C bus.

```javascript
const {I2C} = require('i2c');
const i2c0 = new I2C(0); 

// Write or read from I2C ...

i2c0.close(); // Close i2c device
```
