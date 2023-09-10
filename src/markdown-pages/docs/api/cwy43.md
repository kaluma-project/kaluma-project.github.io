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

// Blink the Pico-W's on-board LED
setInterval(() => {
  if (pico_cyw43.getGpio(0)) {
    pico_cyw43.putGpio(0, false); // turn-off LED
  } else {
    pico_cyw43.putGpio(0, true); // turn-on LED
  }
}, 1000);
```

## Class: PicoCYW43WIFI

> **In Pico-W board, this driver is automatically registered as a default IEEE80211 driver. User don't need to register manually.**

This class implements the [IEEE802.11 device driver](/docs/api/device-driver/#ieee-80211-wifi-device-driver) for the CYW43 network module.

In Pico-W this driver is registered as a default IEEE802.11 device driver, but you can also register it manually as below:

```js
const { PicoCYW43WIFI } = require('pico_cyw43');
global.__ieee80211dev = new PicoCYW43WIFI();
```

This class also has a WIFI AP (Access Pointer) function. So Pico-W board can be used to WIFI AP.

### pico_cyw43.wifiApMode(apInfo, \[callback])

- **`apInfo`**`{object}`
  - **`ssid`** `{string}` SSID.
  - **`password`** `{string}` password of the WIFI AP.
  - **`gateway`** `{string}` Gateway of the WIFI AP. Default: `192.168.4.1`
  - **`subnetMask`** `{string}` Subnet Maks of the WIFI AP. Default: `255.255.255.0`

Start WIFI AP mode.

### pico_cyw43.disableWifiApMode()

Disable WIFI AP mode.

### pico_cyw43.getWifiApClients()

- **Returns:** `<{Array<string>}>`
  - **`bssid`** `{string}` \_\*\*\_BSSID. (Typically MAC address)

Get the list of the clients's bssid (MAC address).

```js
const { PicoCYW43WIFI } = require('pico_cyw43');
const picoWifi = new PicoCYW43WIFI();

var apCallBack = function(err) {
    console.log("WIFI ap is enabled - err: " + err);
}

var apOptions = {
  // WIFI AP options
  ssid: "raspberry_pi_ap",
  password: "12345678",
  gateway: "192.168.4.1",
  subnet_mask: "255.255.0.0"
};

picoWifi.wifiApMode(apOptions, apCallBack);
```


## Class: PicoCYW43Network

> **In Pico-W board, this driver is automatically registered as a default network driver. User don't need to register manually**

This class implements the [network device driver](/docs/api/device-driver#network-device-driver) for CYW43 network module.

> This module support TCP protocol only.

In Pico-W this driver is registered as a default network driver, but you can also register it manually as below:

```javascript
const { PicoCYW43Network } = require('pico_cyw43');
global.__netdev  = new PicoCYW43Network();
```
