---
layout: "doc.njk"
title: "Analog I/O"
tags: "api"
---

# Analog I/O

## analogRead(pin) <a href="#analogread" id="analogread"></a>

* **`pin`** `<number>` The pin number which can support ADC function.
* **Returns:** `<number>`, the value is in between `0.0` \~ `1.0`

Read and return analog signal value from the ADC **`pin`**. A `RangeError` will be thrown if the **`pin`** does not support ADC function.

```javascript
// Read analog value on pin 26.
var pin = 26;
var value = analogRead(pin);
```

## analogWrite(pin\[, duty\[, frequency]]) <a href="#analogwrite" id="analogwrite"></a>

* **`pin`** `<number>` The pin number which can support PWM function.
* **`duty`** `<number>` The PWM duty cycle between `0.0` and `1.0`. **Default:** `0.5`
* **`frequency`** `<number>` The PWM frequency in Hz. **Default:** `490`Hz

Generate PWM signal with specific **`frequency`** and **`duty`** to the PWM **`pin`**. A `RangeError` will be thrown if **`pin`** does not support PWM function.

```javascript
// Generate 490 Hz 50% duth PWM signal.
var pin = 0;
analogWrite(pin, 0.5);
```

## tone(pin\[, frequency\[, options]]) <a href="#tone" id="tone"></a>

* **`pin`** `<number>` The pin number which can support PWM function.
* **`frequency`** `<number>` The PWM frequency in Hz. **Default:** `261.626`Hz (C Key)
* **`options`** `<object>`
  * **`duration`** `<number>` The duration in milliseconds if a duration is not 0, duration 0 is forever. **Default:** `0`
  * **`duty`** `<number>` The PWM duty cycle between `0.0` and `1.0`. **Default:** `0.5`
  * **`inversion`** `<number>` The pin number where an inverted signal to be generated. **Default:** `-1`.

Generate sound tone(PWM) on the PWM **`pin`** for **`duration`**. A **`frequency`** and **`duty`** can be set. A `RangeError` will be thrown if **`pin`** does not support PWM function.

```javascript
// Generate 300 Hz tone on the pin 0 for 1sec.
tone(0, 300, {duration: 1000}); // Generate 300Hz tone on the pin 0 for 1sec.
```

You can generate an inverted signal of the original PWM signal on another pin. Using this you can generate louder sound on a speaker by wiring two wires of the speaker to the two pins of a same PWM slice instead of wiring to one of PWM pin and GND.

> Note that the inversion pin should be the different channel of the same slice. For example, pin 9 can be used for inversion for the pin 8. See [here](../boards/raspberry-pi-pico.md#pwm) for more about PWM slide and channels.

```javascript
// Generate 300 Hz tone on the pin 8 and the inverted signal on the pin 9.
tone(8, 300, {inversion: 9});
```

## noTone(pin) <a href="#notone" id="notone"></a>

* **`pin`** `<number>` The pin number which can support PWM function.

Stop the tone one the PWM **`pin`**. A `RangeError` will be thrown if **`pin`** does not support PWM function.

```javascript
// Generate 200 Hz tone to the pin 0 and stop the tone after 1sec.
tone(0, 200); // Generate 200Hz tone on the pin 0.
delay(1000); // Wait for 1000ms (1sec)
noTone(0); // Stop the tone on the pin 0
```
