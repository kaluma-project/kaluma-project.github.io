---
layout: "doc.njk"
title: "File system"
tags: "api"
---

# File system

> **THIS IS EXPERIMENTAL AND SUBJECT OF CHANGE**

## File system

The `fs` module supports file system API. Use `require('fs')` to access this module.

```javascript
const fs = require('fs');
```

> All file I/O functions are synchronous. Currently do not support asynchronous file I/O.

### fs.register(fstype, fsctr)

* **`fstype`** `<string>` File system type.
* **`fsctr`** `<constructor>` Virtual file system constructor. See [Virtual File System](#virtual-file-system).

Register a file system type.

```javascript
const fs = require('fs');
const {VFSLittleFS} = require('vfs_lfs');

// register lfs filesystem type
fs.register('lfs', VFSLittleFS);

// then you can mkfs or mount with a block device
const blkdev = ...
fs.mount('/', blkdev, 'lfs');
```

### fs.unregister(fstype)

* **`fstype`** `<string>` File system type.

Unregister a file system type.

### fs.mkfs(blkdev, fstype)

* **`blkdev`** `<BlockDevice>` Block device.
* **`fstype`** `<string>` File system type.

Make a file system (format) on the block device.

> Note that calling`mkfs()` will delete all files if there were already existed.

```javascript
const fs = require('fs');
const {VFSLittleFS} = require('vfs_lfs');

// register lfs filesystem type
fs.register('lfs', VFSLittleFS);

// make lfs file system (format)
const blkdev = ...
fs.mkfs(blkdev, 'lfs');
```

### fs.mount(path, blkdev, fstype\[, mkfs])

* **`path`** `<string>` A path where the block device to mount.
* **`blkdev`** `<BlockDevice>` Block device.
* **`fstype`** `<string>` File system type.
* **`mkfs`** `<boolean>` Optional. Try to call `mkfs()` first when mount failed. Default: `false`.

Mount a block device to the given path. When mount is failed, try to call `mkfs()` before mount retry if you pass `true` to `mkfs` parameter.

```javascript
const fs = require('fs');
const {VFSLittleFS} = require('vfs_lfs');

// register lfs filesystem type
fs.register('lfs', VFSLittleFS);

// mount lfs with mkfs try
const blkdev = ...
fs.mount('/', blkdev, 'lfs', true);
```

### fs.unmount(path)

* **`path`** `<string>` A path where the block device to mount.

Unmount the block device on the given path.

### fs.cwd()

* **Returns**: `<number>`&#x20;

Return the current working directory.

### fs.chdir(path)

**`path`** `<string>` A path to change.

Change the current working directory.

### fs.open(path\[, flags\[, mode]])

* **`path`** `<string>` A file path to openBinary data to encode.
* **`flags`** `<string>` File system flags. **Default:** `'r'`.
* **`mode`** `<number>` (Not supported yet).
* **Returns**: `<number>`  a file descriptor.

Open a file and returns an integer file descriptor.

Following flags are available.

* `'r'` : Open file for reading.
* `'r+'` : Open file for reading and writing. The file is created if not exists.
* `'w'` : Open file for writing. The file is created if not exists.
* `'w+'` : Open file for reading and writing. The file is created if not exists.
* `'wx'` : Open file for writing, but fails if exists.
* `'wx+'` : Open file for reading and writing, but fails if exists.
* `'a'` : Open file for appending.
* `'a+'` : Open file for reading and appending.
* `'ax'` : Open file for appending, but fails if exists.
* `'ax+'` : Open file for reading and appending, but fails if exists.

### fs.read(fd, buffer\[, offset\[, length\[, position]]])

* **`fd`** `<number>`&#x20;
* **`buffer`** `<TypedArray>` The buffer will be written.
* **`offset`** `<number>` The position in buffer to write. Default: `0`.
* **`length`** `<number>` The number of bytes to read. Default: the length of `buffer`.
* **`position`** `<number>` The position of the file to read from. Default is current position if not specified.
* **Returns**: `<number>`  The number of bytes read.

Read data from the file specified by `fd`.

```javascript
const fs = require('fs');
let fd = fs.open('file.txt');
let buffer = new Uint8Array(10);
// read 10 bytes from the start
fs.read(fd, buffer, 0, buffer.length, 0);
fs.close(fd);
```

### fs.write(fd, buffer\[, offset\[, length\[, position]]])

* **`fd`** `<number>`&#x20;
* **`buffer`** `<TypedArray>` The buffer will be read.
* **`offset`** `<number>` The position in buffer to read. Default: `0`.
* **`length`** `<number>` The number of bytes to write. Default: the length of `buffer`.
* **`position`** `<number>` The position of the file to write. Default is current position if not specified.
* **Returns**: `<number>`  The number of bytes written.

Write data to the file specified by `fd`.

```javascript
const fs = require('fs');
let fd = fs.open('file.txt');
let buffer = new Uint8Array(10);
// buffer[0] = ...
// buffer[1] = ...
// ...

// write 10 bytes
fs.write(fd, buffer, 0, buffer.length, 0);
fs.close(fd);
```

### fs.close(fd)

* **`fd`** `<number>`&#x20;

Close the file specified by `fd`.

### fs.readFile(path)

* **`path`** `<string>`&#x20;
* **Returns**: `<Uint8Array>` .

Read data from the file and return the data.

```javascript
const fs = require('fs');
let data = fs.readFile('file.txt');
```

### fs.writeFile(path, data)

* **`path`** `<string>`&#x20;
* **`data`** `<Uint8Array>`&#x20;

Write data to the file specified by `path`.

```javascript
const fs = require('fs');
let buffer = new Uint8Array(10);
// buffer[0] = ...
// buffer[1] = ...
// ..
fs.writeFile('file.txt', buffer);
```

### fs.unlink(path)

* **`path`** `<string>`&#x20;

Remove the file specified by `path`.

### fs.stat(path)

* **`path`** `<string>`&#x20;
* **Returns**: `<fs.Stats>`&#x20;

Return status of the file specified by `path`.

### fs.rename(oldPath, newPath)

* **`oldPath`** `<string>`&#x20;
* **`newPath`** `<string>`&#x20;

Rename the file or directory.

### fs.exists(path)

* **`path`** `<string>`&#x20;

Test whether or not the given path exists.

### fs.mkdir(path)

* **`path`** `<string>`&#x20;

Create a directory.

### fs.rmdir(path)

* **`path`** `<string>`&#x20;

Remove a directory.

### fs.rm(path)

* **`path`** `<string>`&#x20;

Remove a file or directory specified by the `path`.

### fs.readdir(path)

* **`path`** `<string>`&#x20;
* **Returns:** <`string[]`>

Read the contents of a directory.

### Class: fs.Stats

A class representing file status. The objects returned by `fs.stat()` are of this type.

#### stats.isDirectory()

* **Returns**: `<boolean>`

Test whether the file is directory or not.

#### stats.isFile()

* **Returns**: `<boolean>`

Test whether the file is typical file or not.

#### stats.size

* `<number>`

The size of the file.

## Virtual File System

The architecture of file system is resembles Unix's virtual file system. So you can implements your own virtual file system and register. By default, Kaluma provides two file systems: [LittleFS](https://github.com/littlefs-project/littlefs) and [FAT](http://elm-chan.org/fsw/ff/00index_e.html).

```javascript
const fs = require('fs');

// littlefs
const {VFSLittleFS} = require('vfs_lfs');
fs.register('lfs', VFSLittleFS);

// fat
const {VFSFatFS} = require('vfs_fat');
fs.register('lfs', VFSFatFS);
```

### Implementing VFS

You can also implements your own VFS and register it. The VFS class should implements below interface.

```typescript
interface VFS {
  constructor(blkdev: BlockDevice)
  mkfs(): void;
  mount(): void; // throw exception if blkdev is not formatted
  unmount(): void;
  open(path: string, flags: number, mode: number) => number; // id
  write(id: number, buffer: Uint8Array, offset: number, length: number, position: number): number // bytes written
  read(id: number, buffer: Uint8Array, offset: number, length: number, position: number): number // bytes read
  close(id: number): void;
  stat(path: string): {type:number /*1=file,2=dir*/, size:number}
  mkdir(path: string): void;
  rmdir(path: string): void;
  readdir(path: string): string[];
  rename(oldPath: string, newPath: string): void;
  unlink(path: string): void;
}
```

### Block Device

Once you have registered file systems, you can mount block devices.

```javascript
const fs = require('fs');

// block device for flash memory
const blkdev = FlashBD(0, 128); 

// format and mount littlefs
fs.mkfs(blkdev, 'lfs');
fs.mount('/', blkdev, 'lfs');

// shortly, mount (format first if not formatted)
fs.mount('/', blkdev, 'lfs', true);
```

You can implement your own block devices based on RAM, SDCard, PSRAM, and more by implementing below interface.

```javascript
interface BlockDevice {
  read(block: number, buf: Uint8Array, offset: number): void;
  write(block: number, buf: Uint8Array, offset: number): void;
  ioctl(op: number, arg: number): number;
   // op = 1: initialize the device
   // op = 2: shutdown the device
   // op = 3: synchronize the device
   // op = 4: returns the total number of blocks
   // op = 5: returns the number of bytes in a block
   // op = 6: erase a block (arg = block num)
   // op = 7: returns the buffer size
}
```

Here is an RAMBlockDev example.

```javascript
class RAMBlockDev {
  constructor() {
    this.blocksize = 4096;
    this.blockcount = 16;
    this.buffersize = 256;
    this.buf = new Uint8Array(this.blocksize * this.blockcount);
    this.buf.fill(0);
  }
  read(block, buffer, offset = 0) {
    for (let i = 0; i < buffer.length; i++) {
      buffer[i] = this.buf[block * this.blocksize + offset + i];
    }
  }
  write(block, buffer, offset = 0) {
    for (let i = 0; i < buffer.length; i++) {
      this.buf[block * this.blocksize + offset + i] = buffer[i];
    }
  }
  ioctl(op, arg) {
    switch (op) {
      case 1: // init
        return 0;
      case 2: // shutdown
        return 0;
      case 3: // sync
        return 0;
      case 4: // block count
        return this.blockcount;
      case 5: // block size
        return this.blocksize;
      case 6: // erase block
        let p = arg * this.blocksize;
        for (let i = p; i < p + this.blocksize; i++) {
          this.buf[i] = 0;
        }
        return 0;
      case 7: // buffer size
        return this.buffersize;
    }
    return -1; // unknown op
  }
}

const fs = require('fs');
const blkdev = RAMBlockDev();
fs.mount('/ram', blkdev, 'lfs', true);
```
