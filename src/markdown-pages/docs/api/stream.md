---
layout: 'doc.js'
title: 'Stream'
slug: 'docs/api/stream'
category: 'api'
---

# Stream

> **THIS IS EXPERIMENTAL AND SUBJECT OF CHANGE**

This `steam` module provides abstract interfaces for working with streaming data. Use `require('stream')` to access this module.

## Class: Stream

- Extends: [`EventEmitter`](/docs/api/events/#class-eventemitter)

This is a class for stream.

### stream.readable

- `{boolean}`

Indicates whether the stream is readable or not.

### stream.writable

- `{boolean}`

Indicates whether the stream is writable.

### stream.read(\[size])

- **`size`** `{number}`&#x20;
- **Returns:** `{Uint8Array|null}`

Read data as the specified `size` from the stream. If `size` not specified, reads all data in the stream buffer.

If the size of data in the stream buffer is less then `size`, returns `null`.

### stream.write(chunk)

- **`chunk`** `{Uint8Array}`&#x20;
- **Returns:** `{number}`&#x20;

Writes `chuck` to the stream and returns the number of bytes written.

### stream.end()

Finishes to write.

### stream.destroy()

- Returns: `{this}`

Closes the stream.

## Class: Readable

> THIS CLASS WILL BE DEPRECATED

Readable streams are an abstraction for a _source_ from which data is consumed. This is a condensed version of Readable stream in [Node.js](https://nodejs.org).

### readable.readableEnded

- `{boolean}`

Becomes `true` when [`'end'`](#event-end) event is emitted.

### readable.push(chunk)

- **`chunk`** `{Uint8Array}`&#x20;

_This function should not be called in application code. It is only for stream implementors._ This should be called when a chunk of data is arrived from the stream.

### readable.destroy()

- Returns: `{this}`

Closes the stream.

### Event: 'data'

- **`chunk`** `{Uint8Array}`&#x20;

Emitted whenever a chunk of data is available to consume.

### Event: 'end'

Emitted when all data completely consumed and no more data to read.

### Event: 'error'

- **`err`** `{Error}`

Emitted when error occurred.

### Event: 'close'

Emitted when the stream is closed.

## Class: Writable

> THIS CLASS WILL BE DEPRECATED

Writable streams are an abstraction for a _destination_ to which data is written. This is a condensed version of Writable stream in [Node.js](https://nodejs.org).

### writable.writableEnded

- `{boolean}`

Becomes `true` when [`writable.end()`](#writable-end-chunk-callback) is called.

### writable.writableFinished

- `{boolean}`

Becomes `true` when [`'finish'`](#event-finish) event is emitted.

### writable.write(chunk\[, callback])

- **`chunk`** `{Uint8Array|string}` A chunk of data to write.
- **`callback`** `{Function}` Called when the chunk of data is handled.
- Returns: `{boolean}`&#x20;

Writes a chunk of data on the stream. It returns `true` if the stream is ready to handle the next chunk of data. It returns `false`, then the stream will emit [`'drain'`](#event-drain) event when the all data written are handled and the internal buffer is empty. If you write data before [`'drain'`](#event-drain) event emitted, the chunk of data will be appended to the internal buffer.

### writable.end(\[chunk]\[, callback])

- **`chunk`** `{Uint8Array|string}` A chunk of data to write before finish.
- **`callback`** `{Function}` Called when the stream is finished.
- Returns: `{this}`&#x20;

Finishes to write data on the stream. The event [`'finish'`](#event-finish) will be emitted after successfully finished.

### writable.\_write(chunk\[, callback])

- **`chunk`** `{Uint8Array|string}`&#x20;
- **`callback`** `{Function}`&#x20;

_This function should not be called in application code. It is only for stream implementors._ This function must be implemented in the inherited stream classes.

### writable.\_final(\[callback])

- **`callback`** `{Function}`&#x20;

_This function should not be called in application code. It is only for stream implementors._ This function must be implemented in the inherited stream classes.&#x20;

### writable.destroy()

- Returns: `{this}`

Closes the stream.

### Event: 'drain'

Emitted when the stream is ready to write and the internal buffer is empty.

### Event: 'finish'

Emitted when the stream is finished.

### Event: 'error'

- **`err`** `{Error}`

Emitted when error occurred.

### Event: 'close'

Emitted when the stream is closed.

## Class: stream.Duplex

Extends: [`stream.Readable`](#class-readable), [`stream.Writable`](#class-writable)

> THIS CLASS WILL BE DEPRECATED

Duplex streams are streams that implement both the [Readable](#class-readable) and [Writable](#class-writable) interfaces.
