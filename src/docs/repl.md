---
layout: 'doc.njk'
title: 'REPL'
tags: 'docs'
order: 3
---

# REPL

Kaluma provides REPL (Read-Eval-Print-Loop) mode that can be used by connecting with any ANSI/VT100 serial terminal programs.

## Using CLI

If you installed [Kaluma CLI](https://github.com/kaluma-project/kaluma-cli), you can connect with CLI's `shell` command.

```bash
$ kaluma shell

# or specify a serial port
$ kaluma shell --port /dev/tty.usbmodem0000000000001

# to see all available serial ports
$ kaluma ports
```

## Using External Terminal Programs

In MacOS or Linux you can simply connect with `screen` command (Use other serial terminals in Windows like [PuTTY](https://www.putty.org/)).

```bash
# for MacOS
$ screen /dev/tty.usbmodem.. 115200

# or for Linux
$ sudo screen /dev/ttyACM.. 115200
```

When successfully connected you can see the prompt `>` (If you cannot see the prompt, press `Enter` several times).

On the prompt you can enter any JavaScript expressions or REPL commands. Type `.hi` command, you will see a welcome message.

```bash
> .hi
```

To exit the screen terminal, press `ctrl+a`, `k`, `y`.

## REPL Commands

All REPL commands are started with `.` to be distinguished from JavaScript expression. Type `.help` to see all available commands.

```plain
> .help
```

### Default commands

- `.echo [on|off]` : Echo on/off.
- `.reset` : Reset JavaScript runtime context.
- `.mem` : Print heap memory usage information (total available, used and peak).
- `.gc` : Enforce garbage collection.
- `.flash` \[options] : Read or write data to the non-versatile flash memory.
  - option `-w` : Write user code to flash via YMODEM.
  - option `-e` : Erase the user code in flash.
  - option `-t` : Get total size of flash for user code.
  - option `-s` : Get size of user code.
  - option `-r` : Print user code in textual format.
- `.load` : Load and run Javascript program stored in flash memory.
- `.hi` : Print welcome message.
- `.help` : Print all available commands.

### File system commands

- `.ls` : List files.
- `.pwd` : Print current directory.
- `.cd` : Change current directory.
- `.mkdir` : Create directory.
- `.rm` : Remove file or directory.
- `.cat` : Print the content of file.

## Special Keys

- `<ctrl>+C` To break the execution of your code.
- `<ctrl>+D` Soft reset.
- `<up>` and `<down>` Navigates in the input history.
