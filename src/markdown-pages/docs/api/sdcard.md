---
layout: "doc.js"
title: "SDCard"
slug: "docs/api/sdcard"
category: "api"
---

# SDCard

The `sdcard` module provides block device for sdcard memory. Use `require('sdcard')` to access this module.

> We haven't tested all types of SDCard. The SD Standard Capacity(SDSC, up to 2GB) does not work well in this version. SD High Capacity(SDHC, more than 2GB up to 32GB) are tested (But there may be some interoperability issues). Please try differnt SD Card if you have issue when you use this module.
> Do not use this class without knowing about sdcard allocation map. Writing and erasing blocks in sdcard memory may broke your code, files, storage items in sdcard.

Here is an example code to mount sdcard (connected to `SPI0`) with FAT filesystem.

```js
const fs = require("fs");
const { SDCard } = require("sdcard");
const { VFSFatFS } = require("vfs_fat");

const sdcard = new SDCard(0, { cs: 5 }); // SPI0
fs.register("fat", VFSFatFS);
fs.mount("/sd", sdcard, "fat");
```

## Class: SDCard

An instance of `SDCard` represents a block device.

### new SDCard(bus\[, options])

- **`bus`** `<number>` SPI bus number.
- **`options`** `<object>` The object of SPI options. \_Default values for sck, mosi, miso are depends on board (Check in a board page).
  - **`sck`** `<number>` SPI SCK pin number.
  - **`mosi`** `<number>` SPI MOSI (TX) pin number.
  - **`miso`** `<number>` SPI MISO (RX) pin number.
  - **`cs`** `<number>` SPI CS pin number. Default is 0.

Returns a block device instance.

### sdcard.read(block, buffer\[, offset])

- **`block`** `<number>` Block number to read.
- **`buffer`** `<Uint8Array>` Buffer where the read data to be stored.
- **`offset`** `<number>` Offset of `buffer`. Offset is ignored (always 0) for sdcard module.

Read the block data and store in `buffer`.

### sdcard.write(block, buffer\[, offset])

- **`block`** `<number>` Block number to write.
- **`buffer`** `<Uint8Array>` Data to write.
- **`offset`** `<number>` Offset of `buffer`. Offset is ignored (always 0) for sdcard module.

Write the `buffer` data at the block.

### sdcard.ioctl(op\[, arg])

- **`op`** `<number>` I/O operation.
- **`arg`** `<number>` Argument of the `op`.

Perform an I/O operation.

I/O operations are below:

- `1` : Initialize the device
- `2` : Shutdown the device (not supported)
- `3` : Synchronize the device (not supported)
- `4` : Returns the total number of blocks
- `5` : Returns the number of bytes in a block
- `6` : Erase a block (`arg` is the block number to erase)
- `7` : Returns the sdcard page size. The same as number of bytes in a block for sdcard.
