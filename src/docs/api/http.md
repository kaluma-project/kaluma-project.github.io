---
layout: "doc.njk"
title: "HTTP"
tags: "api"
---

# HTTP

> **THIS IS EXPERIMENTAL AND SUBJECT OF CHANGE**

The `http` module supports HTTP server and client.

> This module may not handle HTTP pages larger than available RAM. If you are using a network driver depends on AT commands with UART, you may handle more larger data by extending read buffer size of UART.

## http.request(options\[, callback])

* **`options`** `{Object}`&#x20;
  * **`host`** `{string}` A domain name or IP address of remote server.
  * **`port`** `{number}` Port of remote server.
  * **`method`** `{string}` HTTP request method. Default: `'GET'`.
  * **`path`** `{string}` Request path. Default: `'/'`.
  * **`headers`** `{Object}` HTTP headers.
* **`callback`** `{Function}` Added as a one-time listener to the `'response'` event.
  * **`response`** `{http.IncomingMessage}`&#x20;
* Returns: `{ClientRequest}`&#x20;

Creates a HTTP request and returns an instance of `ClientRequest`.

```javascript
const options = {
  hostname: 'www.somewhere.com',
  port: 80,
  path: '/',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

// Finish the request
req.end();
```

## http.get(options\[, callback])

* **`options`** `{Object}`&#x20;
  * **`host`** `{string}` A domain name or IP address of remote server.
  * **`port`** `{number}` Port of remote server.
  * **`path`** `{string}` Request path. Default: `'/'`.
  * **`headers`** `{Object}` HTTP headers.
* **`callback`** `{Function}` Added as a one-time listener to the `'response'` event.
  * **`response`** `{http.IncomingMessage}`&#x20;
* Returns: `{ClientRequest}`&#x20;

This function is same with `http.request()` except for the method is fixed to `'GET'` and automatically call `request.end()` with empty body content.

```javascript
http.get({host: 'somewhere.com', path: '/'}, function(response) {
  response.on('data', function(chunk) {
    console.log('received: ', chunk);
  });
});
```

## http.createServer(\[requestListener])

* **`requestListener`** `{Function}` Added as a listener for `'request'` event.

Creates an instance of `http.Server` and returns.

```javascript
var message = '<h1>Hello</h1>';
var port = 80;

var server = http.createServer((req, res) => {
  console.log('Request path: ' + req.url);
  response.writeHead(200, 'OK', {
    'Content-Type': 'text/html',
    'Content-Length': message.length
  });
  response.write(message);
  response.end();
});

server.listen(port, function() {
  console.log('HTTP server listening on port: ' + port);
});
```

## Class: http.OutgoingMessage

* Extends: [`{stream.Writable}`](/docs/api/stream/#class-writable)

This is an abstract class for [`http.ClientRequest`](#class-http-clientrequest) and [`http.ServerResponse`](#class-http-serverresponse).

### message.setHeader(name, value)

* **`name`** `{string}`
* **`value`** `{string}`

Sets a single header value.

### message.getHeader(name)

* **`name`** `{string}`
* Returns: `{string}`

Returns the value of a single header.

### message.removeHeader(name)

* **`name`** `{string}`

Returns a single header value.

### message.headers

* `{Object}`

Key-value pairs of header names and values.

### message.headersSent

* `{boolean}`

Indicates whether the headers were sent or not.

## Class: http.ClientRequest

* Extends: [`{http.OutgoingMessage}`](#class-http-outgoingmessage)

This object is created internally and returned by `http.request()`. Before you calling `request.end()`, you can set HTTP request headers and body.

### request.write(chunk\[, callback])

* **`chunk`** `{Uint8Array|string}` A chunk of request body data to write.
* **`callback`** `{Function}` Called when the chunk of data is handled.
* Returns: `{boolean}`

Writes a chunk of HTTP body data. The chunk of data will be appended into the internal buffer, and actually transmitted to the server when you call `request.end()` function.

### request.end(\[chunk]\[, callback])

* **`chunk`** `{Uint8Array|string}` A chunk of data to write before finish.
* **`callback`** `{Function}` Called when the request is finished.
* Returns: `{this}`&#x20;

Finishes to write HTTP headers and body. Actually the request will be sent to the server and you will be received the response via `'response'` event.

### Event: 'response'

* **`response`** `{http.IncomingMessage}`&#x20;

Emitted when the response is arrived and the headers are parsed.

## Class: http.Server

* Extends: [`{net.Server}`](/docs/api/net)

This object is instantiated by `http.createServer()` and returned.

### server.close(\[callback])

* **`callback`** `{Function}` Called when the server is closed.

Closes the HTTP server.

### server.listen(port\[, callback])

* **`port`** `{number}` Port to listen.
* **`callback`** `{Function}` Automatically added as a listener for the `'listening'` event.

Starts to listening for HTTP requests.

### Event: 'request'

* **`request`** `{http.IncomingMessage}`
* **`response`** `{http.ServerResponse}`

Emitted whenever a HTTP request is accepted. You need to send appropriate response.

### Event: 'close'

Emitted when the server closed.

### Event: 'error'

* **`err`** `{Error}`

Emitted when an error occurs.

### Event: 'listening'

Emitted when the server has started to listen for HTTP requests.

## Class: http.ServerResponse

* Extends: [`{http.OutgoingMessage}`](#class-http-outgoingmessage)

This object is created internally and passed to the event `'request'`.

### response.writeHead(statusCode\[, statusMessage]\[, headers])

* **`statusCode`** `{number}`
* **`statusMessage`** `{string}`
* **`headers`** `{Object}`
* Returns: `{this}`

Sends the response headers to the HTTTP client. If there is no `'Content-Length'` in headers, the header `'Transfer-Encoding'` is automatically set to `'chunked'`.

### response.write(chunk\[, callback])

* **`chunk`** `{Uint8Array|string}` A chunk of response body data to write.
* **`callback`** `{Function}` Called when the chunk of data is handled.
* Returns: `{boolean}`

Writes a chunk of HTTP response body. The chunk of data is automatically encoded based on the header `'Transfer-Encoding'`.

### response.end(\[chunk]\[, callback])

* **`chunk`** `{Uint8Array|string}` A chunk of data to write before finish.
* **`callback`** `{Function}` Called when the response is finished.
* Returns: `{this}`

Finishes to write HTTP response.

### Event: 'close'

Emitted when underlying connection is closed.

### Event: 'finish'

Emitted when the response has been sent.

## Class: http.IncomingMessage

* Extends: [`{stream.Readable}`](/docs/api/stream/#class-readable)

This object is created by `http.ClientRequest` or `http.Server` and passed via the event `'response'` and `'request'` respectively.

When you get this object via `'response'` event, you can get HTTP response headers and body. When you get this object via `'request'` event, you can get HTTP request headers and body.

### message.httpVersion

* `{string}`

Represents HTTP version. Probably `'1.1'` or `'1.0'`.

### message.method

* `{string}`

Represents HTTP method. It's only valid when this message is HTTP request.

### message.statusCode

* `{number}`

The 3-digit HTTP response status code. It's only valid when this message is HTTP response.

### message.statusMessage

* `{string}`

The HTTP response status message. It's only valid when this message is HTTP response.

### message.headers

* `{Object}`

The header object of HTTP request/response message. Header names are lower-cased.

### message.url

* `{string}`

Request URL string. It's only valid when this message is HTTP request.

### message.complete

* `{boolean}`

Represents whether the HTTP request/response message is completely received.

### Event: 'data'

* **`chunk`** `{Uint8Array}`&#x20;

Emitted when a chunk of body data of HTTP request or HTTP response is received.

### Event: 'end'

Emitted when the server finished to send request or response data.

### Event: 'close'

Emitted when the request or response is closed.
