import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { Terminal as XTerm } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { WebLinksAddon } from "xterm-addon-web-links";

export class Terminal extends Component {
  constructor(props) {
    super(props);
    this.terminal = new XTerm({
      // allowTransparency: true,
      convertEol: true,
      cursorBlink: true,
      fontFamily:
        "Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace",
      fontSize: 12,
      windowsMode: props.platform === "win32",
      macOptionIsMeta: props.platform === "darwin",
      macOptionClickForcesSelection: props.platform === "darwin",
      theme: {
        cursor: "#00dd00",
        foreground: "#00dd00",
        background: "#000000",
      },
    });

    this.fitAddon = new FitAddon();
    this.terminal.loadAddon(this.fitAddon);
    this.webLinksAddon = new WebLinksAddon();
    this.terminal.loadAddon(this.webLinksAddon);

    this.terminal.onData((data) => {
      if (props.onData) {
        props.onData(data);
      }
    });
    this.terminal.onResize(() => {
      this.fitAddon.fit();
    });
  }

  componentDidMount() {
    window.addEventListener("resize", () => {
      this.fit();
    });
    const terminalContainer = findDOMNode(this);
    this.terminal.open(terminalContainer);
    this.fitAddon.fit();
  }

  componentWillUnmount() {
    this.terminal.dispose();
  }

  write(data) {
    this.terminal.write(data);
  }

  clear() {
    this.terminal.clear();
  }

  focus() {
    this.terminal.focus();
  }

  enable() {
    this.terminal.element.style.removeProperty("display");
  }

  disable() {
    this.terminal.element.style.display = "none";
  }

  fit() {
    if (this.fitAddon) {
      try {
        this.fitAddon.fit();
      } catch {
        // skip error handling
      }
    }
  }

  render() {
    return <div className="terminal-container" />;
  }
}
