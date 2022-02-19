---
layout: "doc.njk"
title: "Errors"
tags: "api"
---

# Errors

## Class: SystemError

* Extends: \<Error>

This class represents internal system error. Please check all error codes in [errno.h](https://github.com/kameleon-project/kameleon/blob/master/include/errno.h).

### error.errno

* `<number>`

An error code defined in [errno.h](https://github.com/kameleon-project/kameleon/blob/master/include/errno.h).

### error.code

* `<string>`

A string representation of `errno`.

