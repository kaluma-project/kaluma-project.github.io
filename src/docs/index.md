---
layout: "doc.njk"
title: "Introduction"
tags: "docs"
---

# Introduction

Welcome to Kaluma! Kaluma is a tiny and efficient JavaScript runtime for [RP2040 (Raspberry Pi Pico)](https://www.raspberrypi.com/products/raspberry-pi-pico/). If you are a JavaScript developer familiar with Node.js, you can make electronics without learning a new language like C/C++ or Arduino sketch. Written in C99 and built on [JerryScript](https://jerryscript.net/) - A lightweight and efficient JavaScript engine.

## Main features

- <u>Small footprint</u>. Runs minimally on microcontrollers with 300KB ROM with 64KB RAM.
- Support <u>modern JavaScript</u> standards (ECMAScript 5/6/6+). Powered by [JerryScript](https://jerryscript.net/).
- Has internal event loop like as Node.js for <u>asynchronous</u>.
- Has <u>built-in modules</u> including file systems (LittleFS, FAT), graphics, networking and more.
- Support RP2's <u>PIO (Programmable I/O) assembly</u> embeddable in JavaScript code.
- Provides very friendly API that resembles <u>Node.js</u> and <u>Arduino</u>.

## Related Tools

- [Kaluma CLI](https://github.com/kaluma-project/kaluma-cli) - A command-line tool to program devices running Kaluma runtime.
- [Wokwi](https://wokwi.com/projects/new/kaluma-pi-pico) - Online microcontroller emulator supporting Kaluma.

## ECMAScript

Kaluma supporting full [ES (ECMAScript) 5.1](https://www.ecma-international.org/ecma-262/5.1/) and the most of [ES2015+](http://www.ecma-international.org/ecma-262/6.0/) standards as below:

* Arrow Functions
* Typed Arrays
  * `Int8Array`
  * `Uint8Array`
  * `Uint8ClampedArray`
  * `Int16Array`
  * `Uint16Array`
  * `Int32Array`
  * `Uint32Array`
  * `Float32Array`
  * `Float64Array`
  * `ArrayBuffer`
  * `DataView`
* Set
* Map
* Promise
* Symbol
* Constants
* Async Functions (`async` and `await`)
* `for-await-of` language element
* Iterator and `for-of` operator
* Generator Functions
* Classes
* Default Parameter Values
* Destructuring Assignment&#x20;
* Rest Parameter
* Object Initializer
* Template String
* Numeric Separators
* Nullish Coalescing Operator
