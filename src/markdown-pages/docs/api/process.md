---
layout: 'doc.js'
title: 'Process'
slug: 'docs/api/process'
category: 'api'
---

# Process

- The `process` object provide the information about the process.

## Object: process

### process.arch

- `<string>`ex) 'arm', 'x64', ...

The system architecture which the Kaluma firmware is compiled.&#x20;

### process.platform

- `<string>`ex) 'linux', 'darwin', 'unknown', ...

The OS system which the Kaluma firmware is running.

### process.version

- `<string>`version number, semver format. ex) '0.1.0', ...

### process.builtin_modules

- `<string[]>`array of built-in module names.&#x20;

There's no need to use `require` before using the built-in module.

### process.getBuiltinModule(builtin_module_name)

- **`builtin_module_name`** `<string>`
- **Returns:** `<function>`&#x20;

load the builtin module and return the module as a function

### process.binding(native_module_name)

- **`native_module_name`** `<string>`
- **Returns:** `<function>`

load a native module

Has properties : binding has native module names as properties

### process.memoryUsage()

- **Returns:** `<object>`&#x20;
  - **`heapTotal`** `<number>`&#x20;
  - **`heapUsed`** `<number>`&#x20;
  - **`heapPeak`** `<number>` &#x20;

Returns an object describing memory usage.

### process.stdin

- `<`[`Stream`](/docs/api/stream/#class-stream)`>`&#x20;

Returns a stream object connected to standard input.

```javascript
// reads 100 bytes from standard in
let size = 0;
while (size < 100) {
  let chunk = process.stdin.read();
  if (chunk) {
    let s = String.fromCharCode.apply(null, chunk);
    console.log('data = ', s);
    size += chunk.length;
  }
}
```

### process.stdout

- `<`[`Stream`](/docs/api/stream/#class-stream)`>`

Returns a stream object connected to standard output.

```javascript
let data = new Uint8Array([65, 66, 67, 68, 69]); // "ABCDE"
process.stdout.write(data);
```
