---
layout: 'doc.js'
title: 'SDCard'
slug: 'docs/api/sdcard'
category: 'api'
---

# SDCard

The `sdcard` module provides block device for sdcard memory. Use `require('sdcard')` to access this module.

> We haven't tested all types of SDCard. The SD Standard Capacity(SDSC, up to 2GB) does not work well in this version. SD High Capacity(SDHC, more than 2GB up to 32GB) are tested (But there may be some interoperability issues). Please try differnt SD Card if you have issue when you use this module.
> Do not use this class without knowing about sdcard allocation map. Writing and erasing blocks in sdcard memory may broke your code, files, storage items in sdcard.

## Class: SDCard

An instance of `SDCard` represents a block device.

### new SDCard(bus\[, options])

- **`bus`** `<number>` SPI bus number.
- **`options`** `<object>` The object of SPI options. _Default values for sck, mosi, miso are depends on board (Check in a board page).
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

## Example code for FAT file system
### System setup
- Pico GP2 -> SDCARD clock (SD_SCK)
- Pico GP3 -> SDCARD MOSI (SD_MOSI)
- Pico GP4 -> SDCARD MISO (SD_MISO)
- Pico GP5 -> SDCARD chip select(SD_CS)
- Pico 3V3(OUT), pin 36 -> SDCARD VCC
- Pico GND, pin 38 -> SDCARD GND

```
const fs = require('fs');
const { SDCard } = require('sdcard');
const { VFSFatFS } = require("vfs_fat");

const sd_options = {
    cs: 5, // GP5 for chip select
    sck: 2, // GP2 for SPI SCK
    mosi: 3, // GP3 for SPI MOSI
    miso: 4, // GP4 for SPI MISO
}
const sdcard = new SDCard(0, sd_options);

// register fat filesystem type
fs.register('fat', VFSFatFS);

// Mount FAT file system at /sdcard
fs.mount('/sdcard', sdcard, 'fat');

// Change directory to /sdcard
fs.chdir("/sdcard")

const fname = 'file.txt';

// file write (create)
let fd_write = fs.open(fname, 'w');
let buf_write = new Uint8Array([60, 61, 62, 63, 64, 65, 66, 67, 68, 69]);
fs.write(fd_write, buf_write, 0, buf_write.length, 0);
fs.close(fd_write);

// file read
let fd_read = fs.open(fname, 'r');
let buf_read = new Uint8Array(10);
fs.read(fd_read, buf_read, 0, buf_read.length, 0);
fs.close(fd_read);
console.log(buf_read);
```