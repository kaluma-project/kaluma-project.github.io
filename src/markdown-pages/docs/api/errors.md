---
layout: 'doc.js'
title: 'Errors'
slug: 'docs/api/errors'
category: 'api'
---

# Errors

## Class: SystemError

- Extends: \<Error>

This class represents internal system error. Please check all error codes in [err.h](https://github.com/kameleon-project/kameleon/blob/master/include/err.h).

### error.errno

- `<number>`

An error code defined in [err.h](https://github.com/kameleon-project/kameleon/blob/master/include/err.h).

### error.code

- `<string>`

A string representation of `errno`.
