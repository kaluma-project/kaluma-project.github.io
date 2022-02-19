---
layout: "doc.njk"
title: "AT Command"
tags: "api"
---

# AT Command

> **THIS IS EXPERIMENTAL AND SUBJECT OF CHANGE**

The `at` module supports sending AT commands and handling the responses. This module is useful for the devices controlled by AT command such as Wi-Fi, GSM, Bluetooth modules. Use `require('at')` to access this module.

## Class: ATCommand

An instances of `ATCommand` represents a AT command handler. This class is a subclass of [`EventEmitter`](events.md).

### new ATCommand(uart\[, options])

* **`uart`** `<UART>` UART object where a device is connected which controlled by AT command.
* **`options`** `<object>`&#x20;
  * **`debug`** `<boolean>` Print all data received from UART if `true`.

Create a AT command handler.

> Note that data received from `uart` is converted to an ASCII string (1 byte to 1 char) for easy manipulation.

```javascript
// Create an UART instance
const {UART} = require('uart');
const serial = new UART(0, {baudrate: 115200, bufferSize: 4096});

// Create ATCommand instance
const {ATCommand} = require('at');
const at = new ATCommand(serial, {debug: true});

at.send('AT');
// ...
```

### at.send(cmd\[, cb\[, waitFor\[, options]])

* **`cmd`** `<string|Uint8Array>` AT command (or data) to send. If `Uint8Array` type is given, it send as data.
* **`cb`** `<function(result:string)>` Callback called when expected response is arrived.
  * **`result`** `<string>` Result status. One of array items of `match` parameter or `'TIMEOUT'` or `undefined`.
* **`waitFor`** `<number|Array<string>>` Indicates what is expected response of the AT command. If a number of given, waits for the given time in milliseconds. **Default:** `['OK', 'ERROR', 'FAIL']`
* **`options`** `<object>`
  * **`timeout`** `<number>` Timeout for waiting response. **Default:** `10000` (10 sec). When timeout, callback is called with `'TIMEOUT'` for the second parameter.
  * **`sendAsData`** `<boolean>` If `true`, `cmd` is sent as data without appending `'\r\n'` in the end. **Default:** `false`.

Sends AT command and wait for expected response. If you didn't provide parameters other than `cmd`, it sends AT command and then process the next command in the queue without waiting for expected response.

```javascript
at.send('AT+XXX'); // send AT command and do not wait for response
```

If you need to get response, provide `callback` and `match` parameters. If a number is given for `match` parameter, `callback` is called with the response just after waiting response for the given number of time (milliseconds).

```javascript
at.send('AT+XXX', () => {
  console.log();
}, 1000); // wait 1 sec for response
```

If an array of string is given for the `match` parameter, `callback` is called with the response and the matched item in the `match` parameter when there is a line matched with the `match` parameter in the response buffer.

```javascript
at.send('AT+XXX', (r) => {
  if (r === 'OK') {
    console.log('DONE');
  } else {
    console.error('ERROR');
  }
}, ['OK', 'ERROR', 'FAIL']);
```

### at.addHandler(match, handler)

* **`match`** `<string>` A match string.
* **`handler`** `<Function>` Handler function.
  * `line` `<string>` The matched line.
  * `buffer` `<string>` The response buffer.

Add a handler. If there is a line starts with the `match` parameter in the response buffer, the handler function will be called. The data from start to the matched line are removed from the response buffer. If you want to keep the response buffer without any changes, then just return `false`.

```javascript
at.addHandler('WIFI DISCONNECTED', (line) => {
  console.log('Wifi disconnected');
});
```

If the handler is not enough to handle just the matched line, you can manipulate the entire response buffer by returning the handled data.

```javascript
// Handle +IPD response of ESP8266
// e.g.) "+IPD,11:Hello,World"
at.addHandler('+IPD,', (line, buffer) => {
  if (...) { // if received all data in buffer
    var data = buffer.substr(...);
    var remained = buffer.substr(...);
    return remained;
  }
  return false; // if not received all data in buffer
});
```

### at.removeHandler(match)

* **`match`** `{string}`&#x20;

Remove a line handler.

```javascript
at.addLineHandler('WIFI DISCONNECTED', (line) => {
  console.log('Wifi disconnected');
});

at.removeLineHandler('WIFI DISCONNECTED');
```

### at.buffer

* `{string}`

Response buffer for the responses of AT commands.

