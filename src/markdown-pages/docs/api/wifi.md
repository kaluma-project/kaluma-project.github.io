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
  - **`password`** `{string}` Password. Default: `undefined`.
  - **`bssid`** `{string}` O\_\*\*\_BSSID. (Typically MAC address). Default: `undefined`.
  - **`security`** `{string}` Security. `OPEN`, `WPA2_WPA_PSK`, `WPA2_PSK`, `WPA_PSK`, `WEP_PSK`. Defaule: `OPEN` if password is not set or length of the password is less than 8 characters. `WPA2_WPA_PSK` if length of the password is greater or equal to 8 characters.
  - **`enforce`** `{boolean}` When set to `true`, enforce to connect even if there is already a Wi-Fi connection. Otherwise, do not try to connect if there is Wi-Fi connection. Default: `false`.
- **`callback`** `{Function}` A callback function called when a Wi-Fi connection is established. This is also called when there is already a Wi-Fi connection.
  - **`err`** `{Error}`;
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
storage.setItem('WIFI_SECURITY', 'WPA2_WPA_PSK');
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

- **`callback`** `{Function}` A callback function called when a Wi-Fi connection is disconnected.
  - **`error`** `{Error}`

Disconnect from currently connected Wi-Fi network.

### wifi.getConnection(\[callback])

- **`callback`** `{Function}` A callback function called when this function is done.
  - **`error`** `{Error}`
  - **`connectionInfo`** `{object}`
    - **`ssid`** `{string}` SSID.
    - **`bssid`** `{string}` \_\*\*\_BSSID. (Typically MAC address)

Get connection information of currently connected Wi-Fi network.

### Event: 'associated'

This event is emitted when Wi-Fi network is connected. IP may not be assigned.

### Event: 'connected'

This event is emitted when Wi-Fi network is connected with IP assignment.

### Event: 'disconnected'

This event is emitted when Wi-Fi network is disconnected.

### wifi.wifiApMode(\[apInfo], \[callback])
*Added in: v1.2.0*

*This is optional, callback function parameter return error if the board does not support WIFI AP mode*

- **`apInfo`**`{object}`
  - **`ssid`** `{string}` SSID. Default: `Kaluma_AP`
  - **`password`** `{string}` password of the WIFI AP. Default: `kalumaAp`
  - **`gateway`** `{string}` Gateway of the WIFI AP. Default: `192.168.4.1`
  - **`subnetMask`** `{string}` Subnet Maks of the WIFI AP. Default: `255.255.255.0`
- **`callback`**`{function}` A callback function called when a Wi-Fi AP mode is established.
  - **`err`** `{Error}`

Start WIFI AP mode.

### wifi.disableWifiApMode()
*Added in: v1.2.0*

*This is optional, Do nothing if the board does not support WIFI AP mode*

Disable WIFI AP mode.

### wifi.getWifiApClients()
*Added in: v1.2.0*

*This is optional, Do nothing if the board does not support WIFI AP mode*

- **Returns:** `<{Array<string>}>`
  - **`bssid`** `{string}` \_\*\*\_BSSID. (Typically MAC address)

Get the list of the clients's bssid (MAC address).

```js
// HTTP server on WIFI AP mode
let { WiFi } = require('wifi')
let wifi = new WiFi()
let http = require('http')

console.log('Starting...')

wifi.wifiApMode({ssid: 'PicoHTTPServer', password: 'password' }, */(err) => {
    if (err) {
        console.error('err', err);
        return;
    }
    console.log('access point running')

    var message = '<h1>Hello</h1>';
    var port = 80;
    console.log(port);
    var server = http.createServer((req, res) => {
        console.log('Request path: ' + req.url);
        res.writeHead(200, 'OK', {
            'Content-Type': 'text/html',
            'Content-Length': message.length,
        });
        res.write(message);
        res.end();
    });
    console.log(server);
    console.log(server._dev.ip);
    server.listen(port, function () {
    console.log('HTTP server listening on ', server._dev.ip, ' port: ', port);
    console.log(server);
    });
})

// Show client list every 10 sec.
let show_cli_interval = setInterval(() => {
        console.log("AP Client")
        var clients = wifi.getWifiApClients();
        console.log(clients);
    }, 10*1000);

// Stop server after 10 min
let close_interval = setTimeout(() => {
        wifi.disableWifiApMode();
        clearTimeout(show_cli_interval);
        console.log("WIFI AP is disabled");
    }, 600*1000);

// User can access HTTP server with "http://192.168.4.1/
```
