---
layout: "doc.njk"
title: "Global"
tags: "api"
---

# Global

The objects are available in a global scope. The objects in the Global are not need to have a require function call before using it.

## Object: global

### require(module\_name)

* **`module_name`** `<string>`Module Name which would be used in the script.
* **Returns:** `<any>` Return `exports` object of the loaded module.

```javascript
var graphics = require('graphics') // Load a builtin module
```

### print(\[...data])

* **`...data`**  `<any>`Data which is shown in the console.

Print out data to the console. The main difference from [console.log()](console.md#log) is that it do not print a carriage return and a new line character (`\r\n`) in the end.

```javascript
// print out "100 string value true 1,2,3"
var number = 100;
var result = true;
var arr = [1, 2, 3];
print (number, "string value", result, arr);
```

### seed(seed)

* **`seed`** `<number>` A seed number to initialize.

Initializes the pseudo-random number generator. When you use `Math.random()`, it generate always the same random sequence. If you want to generate different random number sequence, you need to provide different seed number.

```javascript
// Seeding by millisecond time
seed(millis());

// Seeding by analog input
seed(analogRead(26) * 10000); // GPIO26 = ADC0
```

### btoa(data)

* **`data`** `<Uint8Array|string>` Binary data to encode.
* **Returns**: `<string>`  Base64 encoded string.

Returns a base64 encoded string from binary data.

### atob(encodedData)

* **`encodedData`** `<string>` Base64 encoded string data.
* **Returns**: `<Uint8Array>`  Decoded binary data.

Returns a decoded binary data from a base64 encoded string.

### encodeURIComponent

* **`data`** `<string>` Data to encode.
* **Returns:** `<string>` Encoded data.

Encodes URI (Uniform Resource Identifier) component using [percent-encoding](https://en.wikipedia.org/wiki/Percent-encoding). This function escapes all characters excepts `A-Z a-z 0-9 - _ . ! ~ * ' ( )`.

### decodeURIComponent

* **`data`** `<string>` Data to decode.
* **Returns:** `<string>` Decoded data.

Decodes URI (Uniform Resource Identifier) component using [percent-encoding](https://en.wikipedia.org/wiki/Percent-encoding).

### LOW

* `<number>` = `0`

### HIGH

* `<number>` = `1`

### INPUT

* `<number>` = `0`

### OUTPUT

* `<number>` = `1`

### INPUT\_PULLUP

* `<number>` = `2`

### INPUT\_PULLDOWN

* `<number>` = `3`

### LOW\_LEVEL

* `<number>` = `1`

### HIGH\_LEVEL

* `<number>` = `2`

### FALLING

* `<number>` = `4`

### RISING

* `<number>` = `8`

### CHANGE

* `<number>` = `12`

### Digital I/O Functions

All the functions in the [Digital I/O](digital\_io.md) are in the global scope.

### Analog I/O Functions

All the functions in the [Analog I/O](analog\_io.md) are in the global scope.

### Timers Functions

All the functions in the [Timers](timers.md) are in the global scope.

### Interrupt Functions

All the functions in the [Interrupts](interrupts.md) are in the global scope.

### console

* `<Object>`

[Console](console.md) object is a global object.

### process

* `<Object>`

[process ](process.md)object is a global object.

### board object

* `<Object>`

[board ](board.md)object is a global object.

### storage object

* `<Object>`

[storage](storage.md) object is a global.

### Class: TextEncoder

#### new TextEncoder(\[label])

* **`label`** `<string>` Encoding type. Default: `'utf-8'`. Currently supported encoding types are `'ascii'` and `'utf-8'`.

#### textEncoder.encode(input)

* **`input`** `<string>`&#x20;
* Returns: `<Uint8Array>`&#x20;

Encodes the input string and returns the encoded buffer.

```javascript
var encoder = new TextEncoder();
var buf = encoder.encode('abc'); // [97, 98, 99]
```

### textEncoder.encoding

* `<string>`&#x20;

Encoding type.

### Class: TextDecoder

#### new TextDecoder(\[label])

* **`label`** `<string>` Encoding type. Default: `'utf-8'`. Currently supported encoding types are `'ascii'` and `'utf-8'`.

#### textDecoder.decode(input)

* **`input`** `<Uint8Array>`&#x20;
* Returns: `<string>`&#x20;

Decodes the input buffer and returns the decoded string.

### textDecoder.encoding

* `<string>`&#x20;

Encoding type.

### Class: [SystemError](errors.md#class-systemerror)

* Extends: `{Error}`

Represents internal system error.
