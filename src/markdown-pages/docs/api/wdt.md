---
layout: 'doc.js'
title: 'WDT'
slug: 'docs/api/wdt'
category: 'api'
---

# WDT

The `wdt` module provides the WDT(Watchdog timer) class which supports Watchdog timer. Use `require('wdt')` to access this module.

## Class: WDT

An instances of `WDT` represents a WDT object.

### new WDT(timeout)

- **`timeout`** `<number>` milliseconds of the watchdog timeout.
- **Returns:** `<object>` The return value is `WDT` object.

Start watchdog timer. the system is reset if watchdog timer is expired.

```javascript
const { WDT } = require('wdt');
var wdt = new WDT(100); // 100 ms watchdog timer settings
```

### wdt.feed()

This method reset watdog reset timer. To avoid watchdog reset, this function should be called before watchdog timer expiration.

```javascript
const { WDT } = require('wdt');
const wdt = new WDT(1000); // 1 sec watchdog timeout

var timer = 0;

var timer_id = setInterval(()=> {
    wdt.feed(); // Reset watchdog timer
    timer += 500;
    console.log("Reset watchdog timer " + timer + " ms");
    if (timer > 10000) { // Do not reset for 10 sec.
        clearInterval(timer_id);
        console.log("Watchdog reset after 1 sec.");
    }
}, 500);
```
