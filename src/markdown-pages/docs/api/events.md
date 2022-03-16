---
layout: 'doc.js'
title: 'Events'
slug: 'docs/api/events'
category: 'api'
---

# Events

- The `events` module supports events. Use `require('events')` to access this module.

## Class: EventEmitter

An instance of `EventEmitter` class will emits events. If you need to define a class emitting events, you can defined a class by extending from `EventEmitter`.

```javascript
const { EventEmitter } = require('events');

class MyEmitter extends EventEmitter {}

var myEmitter = new MyEmitter();

myEmitter.on('event', () => {
  console.log('event occurred!');
});

myEmitter.emit('event');
```

### emitter.addListener(eventName, listener)

- **`eventName`** `{string}` The name of event
- **`listener`** `{function}` The callback function

Add the `listener` function to the end of the listener array for the event named `eventName`.

```javascript
server.addListener('connect', function () {
  // equivalent to server.on
  console.log('server connected');
});
```

### emitter.emit(eventName\[, ...args])

- **`eventName`** `{string}` The name of event
- **`...args`** `{any}` Arguments to be passed to the listener functions.

Synchronously calls each of the listeners registered for the event named `eventName`, in the order they were registered, passing the supplied arguments to each.

```javascript
server.on('data', function (data) {
  console.log(data); // "data received"
});

var data = 'data recived';
server.emit('data', data);
```

### emitter.on(eventName, listener)

- **`eventName`** `{string}` The name of event.
- **`listener`** `{function}` The callback function.

Alias for `emitter.addListener(eventName, listener)`.

```javascript
server.on('connect', function () {
  console.log('server connected');
});
```

### emitter.once(eventName, listener)

- **`eventName`** `{string}` The name of event.
- **`listener`** `{function}` The callback function.

Add one-time `listener` for the event named `eventName`. When the event is triggered, the `listener` function is called and then removed from the listener array of the event.

```javascript
server.once('connect', function () {
  console.log('connected');
});

server.emit('connect'); // 'connected' printed
server.emit('connect'); // nothing printed
```

### emitter.removeListener(eventName, listener)

- **`eventName`** `{string}` The name of event.
- **`listener`** `{function}` The callback function.

Remove the `listener` function from the listener array of the event name `eventName`.

```javascript
function connectListener () {
  console.log('connected');
}

server.addListener('connect', connectListener); // eq to server.on
server.emit('connect'); // 'connected' printed

server.removeListener('connect' connectListener); // eq to server.off
server.emit('connect'); // nothing printed
```

### emitter.removeAllListeners(\[eventName])

- **`eventName`** `{string}`

Remove all listeners of the event named `eventName`.&#x20;

### emitter.off(eventName, listener)

- **`eventName`** `{string}` The name of event.
- **`listener`** `{function}` The callback function

Alias for `emitter.removeListener(eventName, listener)`.

### emitter.listeners(eventName)

- **`eventName`** `{string}` The name of event.
- **Returns:** `{Array<Function>}`

Return all listeners of the given event.

### emitter.listenerCount(eventName)

- **`eventName`** `{string}` The name of event.
- **Returns:** `{number}`

Return the number of listeners of the given event.
