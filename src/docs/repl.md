---
layout: "doc.njk"
title: "REPL"
tags: "docs"
---

# REPL

## Connect via Terminal

You can use REPL via any ANSI/VT100 terminal programs.

```bash
# for MacOS
$ screen /dev/tty.usbmodem? 115200

# or for Linux
$ sudo screen /dev/ttyACM? 115200

# To quit the screen session, press ctrl+a, k, y.
```

For Windows, [PuTTY](https://www.putty.org) can be used as a terminal.

## Special Keys

* `<ctrl>+C` To break the execution of your code.
* `<up>` and `<down>` Navigates in the input history.

## REPL Commands

### Default commands

* `.echo [on|off]` -- Echo on/off
* `.reset` -- Reset JavaScript runtime context.
* `.mem` -- Print heap memory usage information (total available, used and peak).
* `.gc` -- Enforce garbage collection.
* `.flash` \[options] -- Read or write data to the non-versatile flash memory.
  * option `-w` -- Write user code to flash via YMODEM.
  * option `-e` -- Erase the user code in flash.
  * option `-t` -- Get total size of flash for user code.
  * option `-s` -- Get size of user code.
  * option `-r` -- Print user code in textual format.
* `.load` -- Load and run Javascript program stored in flash memory.
* `.hi` -- Print welcome message.
* `.help` -- Print all available commands.

### File system commands

* `.ls` -- List files
* `.pwd` -- Print current directory
* `.cd` -- Change current directory
* `.mkdir` -- Create directory
* `.rm` -- Remove file or directory
* `.cat` -- Print the content of file

