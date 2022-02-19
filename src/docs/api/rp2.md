---
layout: "doc.njk"
title: "RP2"
tags: "api"
---

# RP2

> **THIS IS EXPERIMENTAL AND SUBJECT OF CHANGE**

The `rp2` module includes features only for RP2 target. Use `require('rp2')` to access this module.

## dormant(pins, events)

* **`pins`** `<number[]>` An array of GPIO pin numbers for wakeup.
* **`events`** `<numbers[]>` An array of wakeup events for the `pins` parameter. The length of pins and events should be the same.

Enter dormant mode for low power consumption.

> Note that once it goes to dormant mode, the USB will be disconnected and the connection will not be recovered even when it wakes up. You need to reset the board.

```javascript
const rp2 = require('rp2');

pinMode(25, OUTPUT);      // On-board LED
pinMode(0, INPUT_PULLUP); // Button for dormant
pinMode(1, INPUT_PULLUP); // Button for wakeup

// Blinking LED
setInterval(() => {
  digitalToggle(25);
}, 200);

// Enter dormant when you press the button on GPIO 0.
setWatch(() => {
  // Wakeup when falling event detected on GPIO 1.
  rp2.dormant([1], [FALLING]);
}, 0, FALLING, 10);
```

## Object: PIO

Constants for state machine of PIO.

### PIO.FIFO\_JOIN\_NONE

* `<number>`

### PIO.FIFO\_JOIN\_TX

* `<number>`

### PIO.FIFO\_JOIN\_RX

* `<number>`

### PIO.SHIFT\_LEFT

* `<number>`

### PIO.SHIFT\_RIGHT

* `<number>`

### PIO.TX\_LESSTHAN

* `<number>`

### PIO.RX\_LESSTHAN

* `<number>`

## Class: ASM

An instances of `ASM` represents an assembly program for PIO (Programmable I/O). This object emulates the assembly language for RP2's PIO using [method chaining](https://en.wikipedia.org/wiki/Method\_chaining).

```javascript
// hello.pio
// ---------
// .program hello
// loop:
//   pull
//   out pins, 1
//   jmp loop
 
// ASM object corresponds to hello.pio
const asm = new ASM();
asm
.label('loop')
  .pull()
  .out('pins', 1)
  .jmp('loop')
```

### new ASM(options)

* **`options`** `<object>` An option object.
  * **`sideset`** `<number>` The side-set count. Default: `0`.
  * **`sidesetOpt`** `<boolean>` The side-set opt. Default: `false`.
  * **`sidesetPindirs`** `<boolean>` The side-set pindirs. Default: `false`.

Instances of the ASM class can be created.

### asm.jmp(\[cond, ]target)

* **`cond`** `<string>` One of the strings: `'!x'`, `'x--'`, `'!y'`, `'y--'`, `'x!=y'`, `'pin'`, `'!osre'`. This parameter is optional.
* **`target`** `<string>` The target label name where to jump.

### asm.wait(pol, src, idx\[, rel])

* **`pol`** `<number>`&#x20;
* **`src`** `<string>` One of the strings: `'gpio'`, `'pin'`, `'irq'`.
* **`idx`** `<number>`&#x20;
* **`rel`** `<string>` Use relative IRQ number if `'rel'` passed. this option works when `'src'` parameter is 'irq'.

### asm.in(src, bits)

* **`src`** `<string>` One of the strings: `'pins'`, `'x'`, `'y'`, `'null'`, `'isr'`, `'osr'`.
* **`bits`** `<number>`&#x20;

### asm.out(dst, bits)

* **`dst`** `<string>` One of the strings: `'pins'`, `'x'`, `'y'`, `'null'`, `'pindirs'`, `'pc'`, `'isr'`, `'exec'`.
* **`bits`** `<number>`&#x20;

### asm.push(\[iffull\[, block]])

* **`iffull`** `<number|string>` `1` or `'iffull'` to set iffull flag to `1`, otherwise set to `0`.
* **`block`** `<number|string>` `1` or `'block'` means block, otherwise non-block (recommend to use `'noblock'`). Default: `1`.

### asm.pull(\[ifempty\[, block]])

* **`ifempty`** `<number|string>` `1` or `'ifempty'` to set ifempty flag to `1`, otherwise set to `0`.
* **`block`** `<number|string>` `1` or `'block'` means block, otherwise non-block (recommend to use `'noblock'`). Default: `1`.

### asm.mov(dst, src)

* **`dst`** `<string>` One of the strings: `'pins'`, `'x'`, `'y'`, `'exec'`, `'pc'`, `'isr'`, `'osr'`.
* **`src`** `<string>` One of the strings: `'pins'`, `'x'`, `'y'`, `'null'`, `'status'`, `'isr'`, `'osr'`. Additionally you can use unary operators (`'~'` and `'!'` for invert, `'::'` for bit-reverse) in this `src` parameter like `'!x'`, `'~y'` or `'::pins'`.

### asm.irq(\[cmd ,]irqnum\[, rel])

* **`cmd`** `<string>` One of the strings: `'set'`, `'nowait'`, `'wait'`, `'clear'`.
* **`irqnum`** `<number>` IRQ number to wait on.
* **`rel`** `<string>` Use relative IRQ number if `'rel'` passed.

### asm.set(dst, val)

* **`dst`** `<string>` One of the strings: `'pins'`, `'x'`, `'y'`, `'pindirs'`.
* **`val`** `<number>`&#x20;

### asm.nop()

It means no operation, so it has no side effect.

### asm.label(name)

* **`name`** `<string>`&#x20;

Creates a label at the position. It can be used as target in `jmp()`.

### asm.side(val)

* **`val`** `<number>`&#x20;

Set side-set value to the latest instruction.

```javascript
// .program spi_tx_fast
// .side_set 1
//
// loop:
//   out pins, 1 side 0
//   jmp loop side 1

// ASM object corresponds to the above
const asm = new ASM({sideset: 1});
asm
.label('loop')
  .out('pins', 1).side(0)
  .jmp('loop').side(1);
```

### asm.delay(val)

* **`val`** `<number>`&#x20;

Set delay value to the latest instruction.

### asm.wrap\_target()

Indicates the `.wrap_target` position of PIO assembly.

```javascript
// squarewave_fast.pio
// -------------------
// .program squarewave_fast
//   set pindirs, 1 ; Set pin to output
// .wrap_target
//   set pins, 1 ; Drive pin high
//   set pins, 0 ; Drive pin low
// .wrap

const squareware_fast_asm = new ASM();
squareware_fast_asm
  .set('pindirs', 1)
.wrap_target()
  .set('pins', 1)
  .set('pins', 0)
.wrap();

// You can access wrap_target and wrap offset
console.log('wrap_target:', squareware_fast_asm.labels['wrap_target']);
console.log('wrap:', squareware_fast_asm.labels['wrap']);
```

### asm.wrap()

Indicates the `.wrap` position of PIO assembly.

### asm.toBinary()

* **Returns**: `<Uint16Array>`&#x20;

Returns the encoded binary code from the assembly program.

### asm.toInst(\[idx])

* `idx` `<number>` Index of instruction to export. Default: `0`.
* **Returns:** `<number>`

Returns an instruction at the specified index from the assembly program.

### asm.labels

* `<Object<string, number>>`

A map from label name to code offset. You can find `'wrap_target'` and `'wrap'` labels if you used.

## Class: StateMachine

An instance of StateMachine represents a state machine of RP2's PIO (Programmable I/O). You can use total 8 state machines (4 in PIO0 and 4 in PIO1) in RP2.

### StateMachine.getAvailableId()

* **Returns** `<number>` An available id for state machine.

Returns an available id (0\~3 for PIO0 and 4\~7 for PIO1) for state machine. It returns an id in sequence of 0, 4, 1, 5, 2, 6, 3, 7. If a `StateMachine` is instantiated with an id, then the id will be removed from the sequence.&#x20;

It is useful when you writing a library based on PIO so that user don't concerns about assigning an id for state machine.

### new StateMachine(id, asm\[, options])

* **`id`** `<number>` Id of the state machine. You can use total 8 state machines (0\~7).
* **`asm` ** `<ASM>` An instance of ASM object to be executed by state machine.&#x20;
* **`options`** `<object>` An option object.
  * **`freq`** `<number>` Default: `125000000`.
  * **`inBase`** `<number>` Default: `-1`.
  * **`inCount`** `<number>` Default: `1`.
  * **`outBase`** `<number>` Default: `-1`.
  * **`outCount`** `<number>` Default: `1`.&#x20;
  * **`setBase`** `<number>` Default: `-1`.&#x20;
  * **`setCount`** `<number>` Default: `1`.
  * **`sidesetBase`** `<number>` Default: `-1`.
  * **`jmpPin`** `<number>` Default: `-1`.&#x20;
  * **`inShiftDir`** `<number>` Default: `PIO.SHIFT_RIGHT`.&#x20;
  * **`autopush`** `<boolean>` Default: `false`.&#x20;
  * **`pushThreshold`** `<number>` Default: `32`.&#x20;
  * **`outShiftDir`** `<number>` Default: `PIO.SHIFT_RIGHT`.&#x20;
  * **`autopull`** `<boolean>` Default: `false`.&#x20;
  * **`pullThreshold`** `<number>` Default: `32`.&#x20;
  * **`fifoJoin`** `<number>` Default: `PIO.FIFO_JOIN_NONE`.&#x20;
  * **`outSticky`** `<boolean>` Default: `false`.&#x20;
  * **`outEnablePin`** `<number>` Default: `-1`.&#x20;
  * **`movStatusSel`** `<number>` Default: `PIO.TX_LESSTHAN`.&#x20;
  * **`movStatusN`** `<number>` Default: `0`.&#x20;

### sm.active(value)

* **`value`** `<number>`

### sm.restart()

Restart the state machine.

### sm.exec(inst)

* **`inst`** `<number>` An instruction to execute.

Execute an PIO instruction.

```javascript
sm.exec((new ASM()).out('pins', 1).toInst());
```

### sm.get()

* **Returns**: `<number>`

Pull a data from the state machine's RX FIFO.

### sm.put(value)

* **`value`** `<number|Uint32Array>`

Push a number (32bit unsigned integer) or unsigned 32bit integer array to the state machine's TX FIFO.

### sm.setPins(value\[, mask])

* **`value`** `<number>` A value to set on all (or masked) pins.
* **`mask`** `<number>` A mask to filter pins to set the value.

Set a (32-bit) value on all (or masked) pins using the state machine.

### sm.rxfifo()

* **Returns**: `<number>`

Returns the number of elements in the state machine's RX FIFO. The size of RXFIFO is 0 in the `PIO.FIFO_JOIN_TX` mode, 4 in the `PIO.FIFO_JOIN_NONE` mode, 8 in the `PIO.FIFO_JOIN_RX` mode. This buffer size can be used to check RXFIFO full condition.

### sm.txfifo()

* **Returns**: `<number>`

Returns the number of elements in the state machine's TX FIFO. The size of RXFIFO is 0 in the `PIO.FIFO_JOIN_RX` mode, 4 in the `PIO.FIFO_JOIN_NONE` mode, 8 in the `PIO.FIFO_JOIN_TX` mode. This buffer size can be used to check TXFIFO full condition.

### sm.clearFIFOs()

Clear the state machine's TX FIFO and RX FIFO.

### sm.drainTXFIFO()

Empty out the state machine's TX FIFO.

### sm.irq(handler)

* **`handler`** `<Function>`
  * **`interrupt`**  `<value>`  interrupt value, bit0 is an interrupt to sm0, bit1 is an interrupt to sm1, bit2 is an interrupt to sm2, bit3 is an interrupt to sm3.

Binds a IRQ handler for the given PIO. PIO0 if current id is sm0\~sm3, PIO1 if current id is sm4\~sm7.

