---
layout: 'doc.js'
title: 'GPIO'
slug: 'docs/api/gpio'
category: 'api'
---

# GPIO

The `gpio` module supports GPIO pin abstraction. Use `require('gpio')` to access this module.

## Class: GPIO

An instances of `GPIO` represents a GPIO pin.

### new GPIO(pin\[, mode])

- **`pin`** `<number>` The pin number which can support GPIO function.
- **`mode`** `<number>` The pin mode `INPUT (0)` , `OUTPUT (1)` , `INPUT_PULLUP (2)` or `INPUT_PULLDOWN (3)` . **Default:** `INPUT`

Instances of the GPIO class can be created using the new keyword.

```javascript
// Create the GPIO instance
const { GPIO } = require('gpio');
const pin = new GPIO(0, OUTPUT);
```

### gpio.read()

- **Returns:** `<number>` The return value is `HIGH (1)` or `LOW (0)`

Read the value from the GPIO pin.

```javascript
// Read value from the pin 0.
const { GPIO } = require('gpio');
const pin = new GPIO(0, INPUT);
const value = pin.read();
```

### gpio.write(value)

- **`value`** `<number>` The value could be `HIGH (1)` or `LOW (0)`.

Writes a value to the GPIO pin.

```javascript
// Write HIGH to the pin 0.
const { GPIO } = require('gpio');
const pin = new GPIO(0, OUTPUT);
pin.write(HIGH);
```

### gpio.toggle()

Toggles the output value of the GPIO pin.

```javascript
// Write LOW to the pin 0 and toggling it.
const { GPIO } = require('gpio');
const pin = new GPIO(0, OUTPUT);
pin.write(LOW); // Set to LOW
pin.toggle(); // HIGH
pin.toggle(); // LOW
```

### gpio.low()

Set the GPIO pin to `LOW`.

```javascript
const { GPIO } = require('gpio');
const pin = new GPIO(0, OUTPUT);
pin.low();
```

### gpio.high()

Set the GPIO pin to `HIGH`.

```javascript
const { GPIO } = require('gpio');
const pin = new GPIO(0, OUTPUT);
pin.high();
```

### gpio.irq(callback\[, event])

- **`callback`** `<function>(pin, event)` The function is called when the **`event`** is triggered on the **`pin`**. the pin and event are the arguments of the callback function.
- **`event`** `<number>` set the event of the `pin`. There are three events,`FALLING (4)`, `RISING (8)`, and `CHANGE (12)`. **Default:** `CHANGE`.

Add interrupt on the GPIO pin. Run the **`callback`** function when the **`event`** is triggered on the **`pin`**. There are three events for the interrupts. The `FALLING (4)` event is triggered when the **`pin`** state is changed from `HIGH` to `LOW`. The `RISING (8)` event is triggered when the **`pin`** state is changed from `LOW` to `HIGH`. The `CHANGE (12)` event is triggered when the **`pin`** state is changed to any states, which means the `CHANGE` event is the same as the `FALLING` + `RISING` events.

The interrupt does not support level triggering, you can use setWatch() function when you want to use level triggering events (`LOW_LEVEL`, `HIGH_LEVEL`).

```javascript
// Set interrupt on the GPIO0
const { GPIO } = require('gpio');
// GPIO0 and GPIO1 are connected together
const pin0 = new GPIO(0, INPUT); // GPIO0 is input port which check the state change of GPIO1
const pin1 = new GPIO(1, OUTPUT); // GPIO 1 is output
pin1.low(); // Set LOW on the GPIO1

// Callback function for the GPIO0
function callback0(pin, mode) {
  console.log('Event ' + mode + ' is triggered on the GPIO' + pin);
}

// Set interrupt callback function on GPIO01
pin0.irq(callback0, CHANGE);

pin1.high(); // Callback is called bcause GPIO0 is changed from LOW to HIGH
delay(1);
pin0.low(); // Callback is called bcause GPIO0 is changed from HIGH to LOW
```

### gpio.pin

- `<number>`

Pin number of the GPIO object.

```javascript
// Write LOW to the pin 0 and print the pin number.
const { GPIO } = require('gpio');
const gpio0 = new GPIO(0, OUTPUT);
console.log(gpio0.pin); // Print pin number 0.
```

### gpio.mode

- `<number>`

Current mode of the GPIO pin. The value is `INPUT (0)` , `OUTPUT (1)` , `INPUT_PULLUP (2)` , or `INPUT_PULLDOWN (3)` .

```javascript
// Write LOW to the pin 0 and print the mode.
const { GPIO } = require('gpio');
const gpio0 = new GPIO(0, OUTPUT);
console.log(gpio0.mode); // Print pin number 0.
```
