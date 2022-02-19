---
layout: "doc.njk"
title: "Path"
tags: "api"
---

# Path

## Path

The `path` module provides functions for file and directory paths. Use `require('path')` to access this module.

### isAbsolute(path)

* **`path`** `<string>`&#x20;
* **Returns:** `<boolean>`&#x20;

Determines if the given path is absolute or not.

### format(pathObj)

* **`pathObj`** `<object>`&#x20;
  * **`root`** `<string>`
  * **`dir`** `<string>`
  * **`base`** `<string>`
  * **`name`** `<string>`
  * **`ext`** `<string>`
* **Returns:** `<string>`&#x20;

Returns a formatted path string from a given path object.

### parse(path)

* **`path`** `<string>`&#x20;
* **Returns:** `<object>`
  * **`root`** `<string>`
  * **`dir`** `<string>`
  * **`base`** `<string>`
  * **`name`** `<string>`
  * **`ext`** `<string>`

Returns a path object parsed from a given path string.

### normalize(path)

* **`path`** `<string>`&#x20;
* **Returns:** `<string>`

Normalizes the given path, resolving `'.'` and `'..'` segments.

### join(...paths)

* **`...paths`** `<string[]>`&#x20;
* **Returns:** `<string>`

Joins all path segments together.

### resolve(...paths)

* **`...paths`** `<string[]>`&#x20;
* **Returns:** `<string>`

Resolves a sequence of path segments into an absolute path.

### sep

* `<string>`

Path segment separator.
