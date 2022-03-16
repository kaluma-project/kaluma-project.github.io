---
layout: 'doc.js'
title: 'Board'
slug: 'docs/api/board'
category: 'api'
---

# Board

The `board` object provide the board specific properties which you are currently using.

## Object: board

### board.name

- `<string>`

The ID of the target board. ex) `pico`, ...

```javascript
console.log(board.name); // e.g.) 'pico' for Raspberry Pi Pico.
```

For more properties, please check the page for each board.

### board.LED

The pin number of the on-board LED.

### board.gpio(pin\[, mode])

Returns an instance of [GPIO](/docs/api/gpio) class. All arguments are passed to the constructor.

```javascript
var gpio = board.gpio(0, OUTPUT);
gpio.high();
```

### board.led(pin)

Returns an instance of [LED](/docs/api/led) class. All arguments are passed to the constructor.

```javascript
var led = board.led(25);
led.on();
```

### board.button(pin\[, options])

Returns an instance of [Button](/docs/api/button) class. All arguments are passed to the constructor.

```javascript
var btn0 = board.button(0);
btn0.on('click', () => {
  console.log('button clicked');
});
```

### board.pwm(pin\[, frequency\[, duty]])

Returns an instance of [PWM](/docs/api/pwm) class. All arguments are passed to the constructor.

```javascript
var pwm1 = board.pwm(1, 100, 0.4);
pwm1.start();
```

### board.adc(pin)

Returns an instance of [ADC](/docs/api/adc) class. All arguments are passed to the constructor.

```javascript
var adc3 = board.adc(26);
adc.read(); // Read analog value from pin 26.
```

### board.i2c(bus\[, options])

Returns an instance of [I2C](/docs/api/i2c) class. All arguments are passed to the constructor.

```javascript
var i2c0 = board.i2c(0);
i2c0.write(new Uint8Array([0x6b, 0x00]), 0x68);
i2c0.close();
```

### board.spi(bus\[, options])

Returns an instance of [SPI](/docs/api/spi) class. All arguments are passed to the constructor.

```javascript
var spi0 = board.spi(0);
spi0.send(new Uint8Array([0x6b, 0x00]));
spi0.close();
```

### board.uart(port\[, options])

Returns an instance of [UART](/docs/api/uart) class. All arguments are passed to the constructor.

```javascript
var serial0 = board.uart(0);
serial0.write('Hello, world\n');
serial0.close();
```
