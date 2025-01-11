---
layout: 'doc.js'
title: 'Device Driver'
slug: 'docs/api/device-driver'
category: 'api'
---

# Device Driver

> **THIS IS EXPERIMENTAL AND SUBJECT OF CHANGE**

To provide device independent API, device driver should be provided for a particular hardware device.

For example, if you want to use networking API with ESP8266 module externally connected via UART, you need to provide ESP8266 device driver.

Below is supported device driver types:

- `global.__netdev` : Network device driver. The [`net`](/docs/api/net), `dgram`, [`http`](/docs/api/http) modules require this device driver.
- `global.__ieee80211dev` : IEEE 802.11 (WiFi) device driver. The [`wifi`](/docs/api/wifi) module requires this device driver.

## Network Device Driver

The interface of the network device driver is very similar to the linux socket interface.

```typescript
// Interface of a socket object
interface socket {
  fd: number; // socket file descriptor
  ptcl: string; // 'STREAM' || 'DGRAM'
  state: number; // 0=closed, 1=bind, 2=connected, 3=listening
  laddr: string;
  lport: number;
  raddr: string;
  rport: number;
  connect_cb: () => void;
  close_cb: () => void;
  read_cb: (data: string) => void;
  accept_cb: (fd: number) => void;
  shutdown_cb: () => void;
}

// Interface of a network device driver
interface netdev {
  errno: number;
  mac: string; // mac address
  ip: string; // local ip address
  socket(domain: string, protocol: string): number;
  get(fd: number): socket;
  connect(
    fd: number,
    addr: string,
    port: number,
    callback: (err: number) => void
  ): void;
  write(fd: number, data: string, callback: (err: number) => void): void;
  close(fd: number, callback: (err: number) => void): void;
  shutdown(fd: number, how: number, callback: (err: number) => void): void;
  bind(
    fd: number,
    addr: string,
    port: number,
    callback: (err: number) => void
  ): void;
  listen(fd: number, callback: (err: number) => void): void;
}
```

### netdev.errno

- `{number}`

The numeric representation of error code.

### netdev.mac

- `{string}`

The string representation of mac address.

### netdev.ip

- `{string}`

The string representation of IP address.

### netdev.socket(domain, protocol)

- **`domain`** `{string}` Communication domain.
- **`protocol`** `{string}` Protocol `'STREAM'` or `'DGRAM'`.
- Returns: `{number}` A socket file descriptor. `-1` on error. Error code is set to `errno`.

### netdev.get(fd)

- **`fd`** `{number}` A socket file descriptor.
- Returns: `{Object}` A socket object.
  - **`fd`** `{number}` socket file descriptor.
  - **`ptcl`** `{string}` Protocol. `'STREAM'` or `'DGRAM'`.
  - **`state`** `{number}` The state of socket. `0` is closed, `1` is bound, `2` is connected, and `3` is listening.
  - **`laddr`** `{string}` Local address.
  - **`lport`** `{number}` Local port.
  - **`raddr`** `{string}` Remote address.
  - **`rport`** `{number}` Remote port.
  - **`connect_cb`** `{Function}` Called when connected.
  - **`close_cb`** `{Function}` Called when closed.
  - **`read_cb`** `{Function}` Called when a chunk of data received.
    - **`data`** `{Uint8Array}` Received data.
  - **`accept_cb`** `{Function}` Called when accepted a new connection
    - **`fd`** `{number}` the socket file descriptor of the new connection.
  - **`shutdown_cb`** `{Function}` Called when shutdown.

Returns the socket object correspond to the given `fd`.

### netdev.connect(fd, addr, port\[, callback])

- **`fd`** `{number}` socket file descriptor.
- **`addr`** `{string}` Host address.
- **`port`** `{number}` Port number.
- **`callback`** `{Function}`&#x20;
  - **`err`** `{number}` `0` on success, `-1` on error. Error code is set to `errno`

Establishes a socket connect. When successfully connected, the socket's `connect_cb` is called.

### netdev.write(fd, data\[, callback])

- **`fd`** `{number}` socket file descriptor.
- **`data`** `{Uint8Array|string}` Data to send.
- **`callback`** `{Function}` Called when the data is written.
  - **`err`** `{number}` `0` on success, `-1` on error. Error code is set to `errno`

Sends data on the socket connection.

### netdev.close(fd\[, callback])

- **`fd`** `{number}` A socket file descriptor.
- **`callback`** `{Function}` Called when the socket is closed.
  - **`err`** `{number}` `0` on success, `-1` on error. Error code is set to `errno`

Closes the socket connection. When successfully closed, the socket's `close_cb` is called.

### netdev.shutdown(fd, how\[, callback])

- **`fd`** `{number}` A socket file descriptor.
- **`how`** `{number}` `0` is to shut read, `1` is to shut write, and `2` is to shut both.
- **`callback`** `{Function}` Called when the socket is shutdown.
  - **`err`** `{number}` `0` on success, `-1` on error. Error code is set to `errno`

Shutdown the socket. When successfully shutdown, the socket's `shutdown_cb` is called.

### netdev.bind(fd, addr, port\[, callback])

- **`fd`** `{number}` A socket file descriptor.
- **`addr`** `{string}` Host address.
- **`port`** `{number}` Port number.
- **`callback`** `{Function}` Called when the socket is bound.
  - **`err`** `{number}` `0` on success, `-1` on error. Error code is set to `errno`

Bind the socket to the given address and port.

### netdev.listen(fd\[, callback])

- **`fd`** `{number}` A socket file descriptor.
- **`callback`** `{Function}` Called when listening started.
  - **`err`** `{number}` `0` on success, `-1` on error. Error code is set to `errno`

Starts to listening for connections. When a new connection is accepted, the socket's `accept_cb` is called.

## IEEE 802.11 (WiFi) Device Driver

The IEEE 802.11 (Wi-Fi) device driver should provide the interface described in this section.

```typescript
// Interface for IEEE 802.11 device driver
interface ieee80211dev {
  errno: number;
  assoc_cb: () => void;
  connect_cb: () => void;
  disconnect_cb: () => void;
  reset(cb: (err: number) => void): void;
  scan(cb: (err: number, scan_info: Array<scan_info>) => void): void;
  connect(cb: (err: number) => void): void;
  disconnect(cb: (err: number) => void): void;
  get_connection(cb: (err: number, conn: connection_info) => void): void;
  ap_mode(apInfo: Object, cb: (err: number) => void): void;
  disable_ap_mode() => void;
  get_ap_client() => Array<string>;
}

interface scan_info {
  bssid: string;
  ssid: string;
  security: string;
  rssi: number;
  channel: number;
}

interface connection_info {
  ssid: string;
  password: string;
  security: string;
}
```

### ieee80211dev.assoc_cb

- `{Function}`

This callback is called when wireless network is associated.

### ieee80211dev.connect_cb

- `{Function}`

This callback is called when wireless network is connected (IP assigned).

### ieee80211dev.disconnect_cb

- `{Function}`

This callback is called when current wireless network is disconnected.

### ieee80211dev.reset(\[callback])

- **`callback`** `{Function}` Called when reset complete.
  - **`err`** `{number}` `0` on success, `-1` on error. Error code is set to `errno`

Reset the device.

### ieee80211dev.scan(\[callback])

- **`callback`** `{Function}` A callback function to be called when scan complete.
  - **`err`** `{number}` `0` on success, `-1` on error. Error code is set to `errno`
  - **`scan_results`** `{Array<Object>}`
    - **`security`** `{string}` Security. `OPEN`, or multiple of `WEP`, `WPA`, `PSK`, `WPA2`, `WPA2-EAP`.
    - **`ssid`** `{string}` SSID.
    - **`rssi`** `{number}` Received signal strength indication.
    - **`bssid`** `{string}` \_\*\*\_BSSID. (Typically MAC address)
    - **`channel`** `{number}` Channel.

Scan wireless networks.

### ieee80211dev.connect(connectInfo\[, callback])

- **`connectInfo`** `{object}` Information of the wireless network to connect .
  - **`ssid`** `{string}` SSID.
  - **`password`** `{string}` Password. Optional.
  - **`security`** `{string}` Security. `OPEN`, `WPA2_WPA_PSK`, `WPA2_PSK`, `WPA_PSK`, `WEP_PSK`. Optional. The defaule value is `OPEN` if password is not set or length of the password is less than 8 characters, or `WPA2_WPA_PSK` if length of the password is greater or equal to 8 characters.
- **`callback`** `{Function}` A callback function.
  - **`err`** `{number}` `0` on success, `-1` on error. Error code is set to `errno`

Connect to a wireless network. The callback `onConnected` should be called when successfully disconnected.

### ieee80211dev.disconnect(\[callback])

- **`callback`** `{Function}`
  - **`err`** `{number}` `0` on success, `-1` on error. Error code is set to `errno`

Disconnect from the currently connected wireless network. The callback `onDisconnected` should be called when successfully disconnected.

### ieee80211dev.get_connection(\[callback])

- **`callback`** `{Function}`
  - **`err`** `{number}` `0` on success, `-1` on error. Error code is set to `errno`
  - **`connectionInfo`** `{object}` Information of the connected wireless network.
    - **`ssid`** `{string}`
    - **`bssid`** `{string}`

Request connection information.

### ieee80211dev.ap_mode(\[apInfo], \[callback])
*Added in: v1.2.0*

*This is optional, Do not implement this function if the board does not support WIFI AP mode.*

- **`apInfo`**`{object}`
  - **`ssid`** `{string}` SSID. Default: `Kaluma_AP`
  - **`password`** `{string}` password of the WIFI AP. Default: `kalumaAp`
  - **`gateway`** `{string}` Gateway of the WIFI AP. Default: `192.168.4.1`
  - **`subnetMask`** `{string}` Subnet Maks of the WIFI AP. Default: `255.255.255.0`
- **`callback`**`{function}` A callback function called when a Wi-Fi AP mode is established.
  - **`err`** `{Error}`;

Start WIFI AP mode.

### ieee80211dev.disable_ap_mode()
*Added in: v1.2.0*

*This is optional, Do not implement this function if the board does not support WIFI AP mode.*

Disable WIFI AP mode.

### ieee80211dev.get_ap_client()
*Added in: v1.2.0*

*This is optional, Do not implement this function if the board does not support WIFI AP mode.*

- **Returns:** `<{Array<string>}>`
  - **`bssid`** `{string}` \_\*\*\_BSSID. (Typically MAC address)

Get the list of the clients's bssid (MAC address).