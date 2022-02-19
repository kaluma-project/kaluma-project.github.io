---
layout: "doc.njk"
title: "Interrupts"
tags: "api"
---

# Interrupts

### attachInterrupt(pin, callback\[,events])

* **`pin`** `<number>` The pin number which can support GPIO function.
* **`callback`** `<function>(pin, event)` The function is called when the **`event`** is triggered on the **`pin`**. the pin and event are the arguments of the callback function.
* **`events`** `<number>` Set the events of the `pin`. There are three events,`FALLING (4)`, `RISING (8)`, and `CHANGE (12)`. **Default:** `CHANGE`.

Run the **`callback`** function when the **`events`** is triggered on the **`pin`**. There are three events for the interrupts. The `FALLING (4)` event is triggered when the **`pin`** state is changed from `HIGH` to `LOW`. The `RISING (8)` event is triggered when the **`pin`** state is changed from `LOW` to `HIGH`. The `CHANGE (12)` event is triggered when the **`pin`** state is changed to any states, which means the `CHANGE` event is the same as the `FALLING` + `RISING` events.

The interrupt does not support level triggering, you can use setWatch() function when you want to use level triggering events (`LOW_LEVEL`, `HIGH_LEVEL`).

```javascript
// Set interrupt on the GPIO0
const {GPIO} = require('gpio');
// GPIO0 and GPIO1 are connected together
pinMode(0, INPUT); // GPIO0 is input port which check the state change of GPIO1
pinMode(1, OUTPUT); // GPIO1 is output
digitalWrite(1, LOW); // Set LOW on the GPIO1

// Callback function for the GPIO0
function callback0(pin, mode)  {
  console.log("Event " + mode + " is triggered on the GPIO" + pin);
}

// Set interrupt callback function on GPIO0
attachInterrupt(0, callback0, CHANGE);

digitalWrite(1, HIGH); // Callback is called bcause GPIO0 is changed from LOW to HIGH
delay(1);
digitalWrite(1, LOW); // Callback is called bcause GPIO0 is changed from HIGH to LOW

detachInterrupt(0); // Remove the interrupt on the GOIO0

digitalWrite(1, HIGH); // No callback function call for this event
delay(1);
digitalWrite(1, LOW); // No callback function call for this event
```

### detachInterrupt(pin)

* **`pin`** `<number>` The pin number which can support GPIO function.

Remove the interrupts on the pin which is added by `attachInterrupt()` function.&#x20;

### enableInterrupts()

Enable all the interrupts which is attached by `attachInterrupt()` function. The interrupts are automatically enabled when `attachedInterrupts()` is called so it is not needed to use this function if you didn't call `disableInterrupts()` function.

### disableInterrupts()

Disable all the interrupts which is attached by `attachInterrupt()` function. The interrupts will be enabled when `enableInterrupts()` is called.

```javascript
// Set interrupt on the GPIO0
const {GPIO} = require('gpio');
// GPIO0 and GPIO1 are connected together
pinMode(0, INPUT); // GPIO0 is input port which check the state change of GPIO1
pinMode(1, OUTPUT); // GPIO1 is output
digitalWrite(1, LOW); // Set LOW on the GPIO1

// Callback function for the GPIO0
function callback0(pin, mode)  {
  console.log("Event " + mode + " is triggered on the GPIO" + pin);
}

// Set interrupt callback function on GPIO0
attachInterrupt(0, callback0, CHANGE);

digitalWrite(1, HIGH); // Callback is called bcause GPIO0 is changed from LOW to HIGH
delay(1);
digitalWrite(1, LOW); // Callback is called bcause GPIO0 is changed from HIGH to LOW

disableInterrupts(); // Disable all the interrupts

digitalWrite(1, HIGH); // No callback function call for this event
delay(1);
digitalWrite(1, LOW); // No callback function call for this event

enableInterrupts(); // Enable all the interrupts

digitalWrite(1, HIGH); // Callback is called bcause GPIO0 is changed from LOW to HIGH
delay(1);
digitalWrite(1, LOW); // Callback is called bcause GPIO0 is changed from HIGH to LOW
```
