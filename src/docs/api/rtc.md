---
layout: "doc.njk"
title: "RTC"
tags: "api"
---

# RTC

The `rtc` module supports RTC (Real Time Clock). Use `require('rtc')` to access this module.

## setTime(time)

* **`time`** `<number>`

Set RTC time to the number of milliseconds since Unix Epoch (UTC 1970/1/1-00:00).

## getTime()

* **Returns** `<number>`&#x20;

Read RTC time and returns the time as the number of milliseconds since Unix Epoch (UTC 1970/1/1-00:00).

This is equivalent to `Date.now()`.
