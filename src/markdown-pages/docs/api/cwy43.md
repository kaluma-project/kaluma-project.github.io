---
layout: 'doc.js'
title: 'CYW43'
slug: 'docs/api/cyw43'
category: 'api'
---

# PICO-CYW43

> **THIS IS EXPERIMENTAL AND SUBJECT OF CHANGE**

The `pico_cyw43` module is for the Raspberry Pi Pico W board.

## Class: PicoCYW43

An instance of `PicoCYW43` represents a Pico-W WiFi module.

### new PicoCYW43()

Create an instance of `PicoCYW43` class.

```javascript
const { PicoCYW43 } = require('pico_cyw43');
const pico_cyw43 = new PicoCYW43();
```

### PicoCYW43.getGpio(gpio)
- **`gpio`**`<number>` CYW43 chip gpio number
- **Returns**: `<boolean>` true if the GPIO is high, false if the GPIO is low.

### PicoCYW43.putGpio(gpio, value)
- **`gpio`**`<number>` CYW43 chip gpio number
- **`value`**`<boolean>` true to set the GPIO to high, false to set the GPIO to low.

```javascript
const { PicoCYW43 } = require('pico_cyw43');
const pico_cyw43 = new PicoCYW43();

var timeId = setInterval(function() {
    if (pico_cyw43.getGpio(0) == false) {
        pico_cyw43.putGpio(0, true);
    } else {
        pico_cyw43.putGpio(0, false);
    }
}, 1000)
```

## Class: PicoCYW43WIFI

An instance of `PicoCYW43WIFI` represents a WiFI driver of the Pico-W WiFi chip.

This class provide WiFi driver which is explained in the [IEEE 802.11 device driver](/docs/api/device-driver/#ieee-80211-dev)

User does not need to use the functions of the device driver. User just set device driver and use Kaluma [`wifi` module](/docs/api/wifi).

Here is the example codes.

```javascript
// Scan WiFi network
const { PicoCYW43WIFI } = require('pico_cyw43');
const { WiFi } = require('wifi');

// Set PicoCYW43WIFI as a wifi device driver
global.__ieee80211dev = new PicoCYW43WIFI();

const wifi = new WiFi();

wifi.scan((err, scanResults) => {
  if (err) {
    console.error(err);
  } else {
    console.log(scanResults);
  }
});
```

```javascript
// Connect to WiFi
const { PicoCYW43WIFI } = require('pico_cyw43');
const { WiFi } = require('wifi');

// Set PicoCYW43WIFI as a wifi device driver
global.__ieee80211dev = new PicoCYW43WIFI();

const wifi = new WiFi();

wifi.connect({ ssid: 'MyHome', password: '12345678' }, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('connected to WiFi!');
    // add your code using Wi-fi connection
  }
});
```

## Class: PicoCYW43Network

An instance of `PicoCYW43Network` represents a Network driver of the Pico-W WiFi chip.

This class provide network driver which is explained in the [Network device driver](/docs/api/device-driver).

User does not need to use the functions of the device driver. User just set device driver and use Kaluma [`net` module](/docs/api/net) module.

> This module support TCP protocol only. UDP protocol will be implemented soon.

Here is the example code for the TCP client.

```javascript
const { PicoCYW43WIFI } = require('pico_cyw43');
const { PicoCYW43Network } = require('pico_cyw43');
const { WiFi } = require('wifi');
const net = require('net');

// Set PicoCYW43WIFI as a wifi device driver
global.__ieee80211dev = new PicoCYW43WIFI();
// Set PicoCYW43Network as a network device driver
global.__netdev  = new PicoCYW43Network();

const wifi = new WiFi();

wifi.connect({ ssid: 'MyHome', password: '12345678' }, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('connected to WiFi!');
    var conn = { host: '0.0.0.0', port: 8124 }; // enter valid host ip
    var client = net.createConnection(conn, () => {
      // 'connect' listener.
      console.log('connected to server!');
      client.write('hello, world!\r\n');
    });
    client.on('data', (data) => {
      console.log(data);
      client.end();
    });
    client.on('end', () => {
      console.log('disconnected from server');
    });
  }
});

```

Here is the example code for the TCP server.

```javascript
const { PicoCYW43WIFI } = require('pico_cyw43');
const { PicoCYW43Network } = require('pico_cyw43');
const { WiFi } = require('wifi');
const net = require('net');

// Set PicoCYW43WIFI as a wifi device driver
global.__ieee80211dev = new PicoCYW43WIFI();
// Set PicoCYW43Network as a network device driver
global.__netdev  = new PicoCYW43Network();

const wifi = new WiFi();

wifi.connect({ ssid: 'daheejoon', password: 'ekgml2su' }, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('connected to WiFi!');
    var server = net.createServer((c) => {
      // 'connection' listener.
      console.log('client connected');
      c.on('end', () => {
        console.log('client disconnected');
      });
      c.on('data', (data) => { console.log(data)});
      c.write('hello, world\r\n');
    });
    server.on('error', (err) => {
      throw err;
    });
    server.listen(50, () => {
      console.log('server bound');
    });
    console.log("Server IP Address is " + global.__netdev.ip);
  }
});
```