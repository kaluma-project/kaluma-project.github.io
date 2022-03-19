---
layout: 'doc.js'
title: 'Flash'
slug: 'docs/api/flash'
category: 'api'
---

# Flash

The `flash` module provides block device for flash memory. Use `require('flash')` to access this module.

> Do not use this class without knowing about flash allocation map. Writing and erasing blocks in flash memory may broke your code, files, storage items in flash.

## Class: Flash

An instance of `Flash` represents a block device.

### new Flash(base, count)

- **`base`** `<number>` Starting block number.
- **`count`** `<number>` Number of blocks.

Returns a block device instance.

### flash.read(block, buffer\[, offset])

- **`block`** `<number>` Block number to read.
- **`buffer`** `<Uint8Array>` Buffer where the read data to be stored.
- **`offset`** `<number>` Offset of `buffer`.

Read the block data and store in `buffer`.

### flash.write(block, buffer\[, offset])

- **`block`** `<number>` Block number to write.
- **`buffer`** `<Uint8Array>` Data to write.
- **`offset`** `<number>` Offset of `buffer`.

Write the `buffer` data at the block.

### flash.ioctl(op\[, arg])

- **`op`** `<number>` I/O operation.
- **`arg`** `<number>` Argument of the `op`.

Perform an I/O operation.

I/O operations are below:

- `1` : Initialize the device (not supported)
- `2` : Shutdown the device (not supported)
- `3` : Synchronize the device (not supported)
- `4` : Returns the total number of blocks
- `5` : Returns the number of bytes in a block
- `6` : Erase a block (`arg` is the block number to erase)
- `7` : Returns the flash page size
