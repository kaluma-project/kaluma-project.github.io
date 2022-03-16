---
layout: 'doc.js'
title: 'Wi-Fi'
slug: 'docs/api/wifi'
category: 'api'
---

# Wi-Fi

> **THIS IS EXPERIMENTAL AND SUBJECT OF CHANGE**

The `wifi` module supports to scan, connect and disconnect Wi-Fi networks. Use `require('wifi')` to access this module.

> This module requires a [IEEE 802.11 device driver](/docs/api/device-driver/#ieee-80211-dev). If the board you are using is not capable for Wi-Fi, you may need to inject external Wi-Fi device driver.

## Class: WiFi

An instance of `WiFi` represents a Wi-Fi device.

### new WiFi()

Create an instance of `Wi-Fi` class.

```javascript
var WiFi = require('wifi').WiFi;
var wifi = new WiFi();
```

### wifi.reset(\[callback])

- **`callback`** `{Function}` Called when reset complete.

Reset the Wi-Fi device.

### wifi.scan(\[callback])

- **`callback`**`{Function}`&#x20;
  - **`err`** `{Error}`&#x20;
  - **`scanResults`** `{Array<Object>}`&#x20;
    - **`security`** `{string}` Security. `OPEN`, or multiple of `WEP`, `WPA`, `PSK`, `WPA2`, `WPA2-EAP`.
    - **`ssid`** `{string}` SSID.
    - **`rssi`** `{number}` Received signal strength indication.
    - **`bssid`** `{string}` \_\*\*\_BSSID. (Typically MAC address)
    - **`channel`** `{number}` Channel.

Scan Wi-Fi networks.

```javascript
const { WiFi } = require('wifi');
const wifi = new WiFi();

wifi.scan((err, scanResults) => {
  if (err) {
    console.error(err);
  } else {
    console.log(scanResults);
  }
});
```

### wifi.connect(\[connectInfo]\[, callback])

- **`connectInfo`** `{object}` Information to connect a Wi-Fi network.
  - **`ssid`** `{string}` SSID.
  - **`password`** `{string}` Password.
  - **`enforce`** `{boolean}` When set to `true`, enforce to connect even if there is already a Wi-Fi connection. Otherwise, do not try to connect if there is Wi-Fi connection. Default: `false`.
- **`callback`** `{Function}` A callback function called when a Wi-Fi connection is established. This is also called when there is already a Wi-Fi connection.
  - **`err`** `{Error}`&#x20;
  - **`connectInfo`** `{Object}`

Establish a connection to Wi-Fi network.

```javascript
const { WiFi } = require('wifi');
const wifi = new WiFi();

wifi.connect({ ssid: 'MyHome', password: '12345678' }, (err) => {
  if (err) {
    console.error(err);
  } else {
    // add your code using Wi-fi connection
  }
});
```

If you do not want to expose your Wi-Fi connection info, you can set them in the storage. (Do not add item in the storage in the source code, add manually in Terminal)

```javascript
storage.setItem('WIFI_SSID', 'MyHome');
storage.setItem('WIFI_PASSWORD', '12345678');
```

And then, call `connect` method without `connectInfo` argument as below.

```javascript
const { WiFi } = require('wifi');
const wifi = new WiFi();

wifi.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    // add your code using Wi-fi connection
  }
});
```

### wifi.disconnect(\[callback])

- **`callback`** `{Function}`
  - **`error`** `{Error}`

Disconnect from currently connected Wi-Fi network.

### wifi.getConnection(\[callback])

- **`callback`** `{Function}`
  - **`error`** `{Error}`
  - **`connectionInfo`** `{object}`
    - **`ssid`** `{string}`
    - **`bssid`** `{string}`

Get connection information of currently connected Wi-Fi network.

### Event: 'associated'

This event is emitted when Wi-Fi network is connected. IP may not be assigned.

### Event: 'connected'

This event is emitted when Wi-Fi network is connected with IP assignment.

### Event: 'disconnected'

This event is emitted when Wi-Fi network is disconnected.
