---
layout: "doc.njk"
title: "Net"
tags: "api"
---

# Net

> **THIS IS EXPERIMENTAL AND SUBJECT OF CHANGE**

The `net` module supports an asynchronous stream-based API for TCP clients and servers. Use `require('net')` to access this module.

> This module is depends on the [network device driver](device\_driver.md#netdev) so the board should register a network device driver manually if your board is not builtin network capabilities.

## net.createConnection(options\[, connectListener])

* **`options`** `{object}`
  * **`host`** `{string}`
  * **`port`** `{number}`
* **`connectListener`** `{function}`
* Returns: `{Socket}`&#x20;

Creates a socket and initiates a connection.

```javascript
const net = require('net');
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
```

## net.connect(options\[, connectListener])

Alias to [net.createConnection(options\[, connectListener\])](net.md#net-createconnection-options-connectlistener).

## net.createServer(\[connectionListener])

* **`connectionListener`** `{Function}`&#x20;
* Returns: `{Server}`&#x20;

Creates a new TCP server.

```javascript
const net = require('net');
var server = net.createServer((c) => {
  // 'connection' listener.
  console.log('client connected');
  c.on('end', () => {
    console.log('client disconnected');
  });
  c.write('hello, world\r\n');
  c.end();
});
server.on('error', (err) => {
  throw err;
});
server.listen(8124, () => {
  console.log('server bound');
});
```

## Class: Server

* Extends: [`EventEmitter`](events.md#class-eventemitter)

This class is used to create a TCP server. This is a condensed version of Server class in [Node.js](https://nodejs.org).

### new Server(\[connectionListener])

* **`connectionListener`** `{Function}` Automatically set as a listener for the `'connection'` event.

Creates a TCP server.

### server.close(\[callback])

* **`callback`** `{Function}` Called when the server is closed.

Closes the server.

### server.listen(port\[, callback])

* **`port`** `{number}` Port to listen.
* **`callback`** `{Function}` Automatically added as a listener for the `'listening'` event.

Starts to listening for connections.

### Event: 'close'

Emitted when the server closed.

### Event: 'connection'

* **`connection`** `{Socket}` A new connection.

Emitted when a new connection is made.

### Event: 'error'

* **`err`** `{Error}`

Emitted when an error occurs.

### Event: 'listening'

Emitted when the server has started to listen for connections.

## Class: Socket

* Extends: [`stream.Duplex`](stream.md#class-stream-duplex)

This class is an abstraction of a TCP socket. This is a condensed version of Socket class in [Node.js](https://nodejs.org).

### new Socket()

Create a new socket object.

* Returns: `{Socket}`&#x20;

### socket.localAddress

* `{string}`

The string representation of the local IP address. (e.g. `'168.120.88.10'`, `'127.0.0.1'`)

### socket.localPort

* `{number}`

The numeric representation of the local port. (e.g. `80`, `8124`)

### socket.remoteAddress

* `{string}`

The string representation of the remote IP address.

### socket.remotePort

* `{number}`

The numeric representation of the remote port.

### socket.connect(options\[, connectListener])

* **`options`** `{object}`
  * **`host`** `{string}` Host to connect.
  * **`port`** `{number}` Port of the host to connect.
* **`connectListener`** `{function}` A listener will be added to the `'connect'` event once.
* Returns: `{this}`&#x20;

Initiate a TCP connection on the given socket.

### socket.destroy()

* Returns: `{this}`&#x20;

Closes the socket.

### socket.end(\[data]\[, callback])

* **`data`** `{Uint8Array|string}`
* **`callback`** `{function}`
* Returns: `{this}`

Half-closes the socket. Finishes to write data but the counter-side still can send some data.

### socket.write(data\[, callback])

* **`data`** `{Uint8Array|string}`
* **`callback`** `{function}`&#x20;
* Returns: `{boolean}`&#x20;

Send data on the socket. Returns `true` if all of data successfully sent or `false` if part of data are not sent and added in buffer to send later. Event `'drain'` will be emitted when all buffered data are sent.

### Event: 'connect'

Emitted when a socket connection is established.

### Event: 'close'

Emitted when a socket connection is closed.

### Event: 'end'

Emitted when the counter-side half-closes the socket.

### Event: 'drain'

Emitted when the socket is ready to write.

### Event: 'finish'

Emitted when the socket is finished to write.

### Event: 'data'

* **`data`** `{Uint8Array}`

Emitted when data received.

### Event: 'error'

* **`err`** `{Error}`&#x20;

Emitted when an error occurs.
