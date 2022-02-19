---
layout: "doc.njk"
title: "URL"
tags: "api"
---

# URL

The `url` module supports URL parsing and formatting. Use `require('url')` to access this module.

## Class: URL

A URL string is a structured string containing multiple meaningful components. For example `https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash` is consists of below components:

* protocol: `https:`
* username: `user`
* password: `pass`
* hostname: `sub.example.com`
* port: `8080`
* pathname: `/p/a/t/h`
* search: `?query=string`
* hash: `hash`

### new URL(input)

* **`input`** `<string>`

Creates a URL object by parsing the input string.

### url.hash

* `<string>`&#x20;

Gets and sets the fragment portion of the URL.

### url.host

* `<string>`&#x20;

Returns readonly host portion of the URL.

### url.hostname

* `<string>`&#x20;

Gets and sets the hostname portion of the URL.

### url.href

* `<string>`&#x20;

Returns serialized URL string.

### url.origin

* `<string>`&#x20;

Returns readonly origin portion of the URL.

### url.password

* `<string>`&#x20;

Gets and sets the password portion of the URL.

### url.pathname

* `<string>`&#x20;

Gets and sets the pathname portion of the URL.

### url.port

* `<string>`&#x20;

Gets and sets the port portion of the URL.

### url.protocol

* `<string>`&#x20;

Gets and sets the protocol portion of the URL.

### url.search

* `<string>`&#x20;

Gets and sets the search string portion of the URL.

### url.searchParams

* `<URLSearchParams>`&#x20;

Returns [URLSearchParams](url.md#class-urlsearchparams) object constructed from `search` property.

### url.username&#x20;

* `<string>`&#x20;

Gets and sets the username portion of the URL.

### url.toString()

* **Returns:** `<string>`&#x20;

Returns serialized URL string.

### url.toJSON()

* **Returns:** `<string>`&#x20;

Returns serialized URL string.

## Class: URLSearchParams

This class allows to read and write access to the query string of a URL.

### new URLSearchParams(input)

* **`input`** `<string>` A query string

Parses the input query string. A leading `'?'` characters is ignored.

### urlSearchParams.append(name, value)

* **`name`** `<string>`
* **`value`** `<string>`

Append a name-value pair.

### urlSearchParams.delete(name)

* **`name`** `<string>`

Delete all name-value pairs whose name is `name`.

### urlSearchParams.entries()

* **Returns:** `<Array>`&#x20;

Returns all name-value pairs as an array.

### urlSearchParams.get(name)

* **`name`** `<string>`
* **Returns:** `<string>`

Returns the value of first name-value pairs whose name is `name`.

### urlSearchParams.getAll(name)

* **`name`** `<string>`
* **Returns:** `<string[]>`

Returns the values of all name-value pairs whose name is `name`.

### urlSearchParams.has(name)

* **`name`** `<string>`
* **Returns:** `<boolean>`

Returns `true` if there is at least one of name-value pair whose name is `name`.

### urlSearchParams.keys()

* **Returns:** `<string[]>`

Returns all names of all name-value pairs.

### urlSearchParams.set(name, value)

* **`name`** `<string>`
* **`value`** `<string>`

Set the value of first name-value pair and deletes all other name-value pairs whose name is `name`. If not exists, append a name-value pair.

### urlSearchParams.values()

* **Returns:** `<string[]>`

Returns all values of all name-value pairs.

### urlSearchParams.toString()

* **Returns:** `<string>`

Serializes and returns a query string from all name-value pairs with percent encoding.

