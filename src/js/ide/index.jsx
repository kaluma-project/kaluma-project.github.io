import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Serial } from './serial';
import { Terminal } from './terminal.jsx';
import { Editor } from './editor.jsx';
import { transfer } from './ymodem';
import { delay } from './utils';

const supportedDevices = [
  { vendorId: 11914, productId: 10, vendor: 'Raspberry Pi', product: 'Pico' },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.terminal = React.createRef();
    this.editor = React.createRef();

    // detect platform
    this.platform = 'unknown';
    const p = navigator.platform.toLowerCase();
    if (p.indexOf('mac') > -1) {
      this.platform = 'darwin';
    } else if (p.indexOf('win') > -1) {
      this.platform = 'win32';
    } else if (p.indexOf('linux') > -1) {
      this.platform = 'linux';
    }

    this.state = {
      target: {
        serial: null,
        product: null,
        vendor: null,
      },
      code: '',
    };

    this.handleConnect = async () => {
      try {
        const port = await navigator.serial.requestPort();
        const serial = new Serial(port);
        const info = await serial.getInfo();
        const supported = supportedDevices.find(
          (d) =>
            d.vendorId === info.usbVendorId && d.productId === info.usbProductId
        );
        this.terminal.current.enable();
        await serial.open({ baudRate: 115200 });
        serial.on('data', (data) => {
          this.terminal.current.write(data);
        });
        serial.write('\r.hi\r');
        this.setState((prev) => {
          return {
            ...prev,
            target: {
              ...prev.target,
              serial: serial,
              vendor: supported ? supported.vendor : null,
              product: supported ? supported.product : null,
            },
          };
        });
      } catch (err) {
        console.log(err);
      }
    };

    this.handleDisconnect = async () => {
      if (this.state.target.serial) {
        await this.state.target.serial.close();
        this.terminal.current.clear();
        this.terminal.current.disable();
      }
      this.setState((prev) => {
        return {
          ...prev,
          target: {
            serial: null,
            vendor: null,
            product: null,
          },
        };
      });
    };

    this.handleData = async (data) => {
      if (this.state.target.serial) {
        this.state.target.serial.write(data);
      }
    };

    this.handleFlash = async () => {
      const code = this.editor.current.doc.getValue();
      this.terminal.current.focus();
      await this.flash(code);
    };
  }

  async flash(code) {
    const serial = this.state.target.serial;
    await serial.write('\r');
    await serial.write('.flash -w\r');
    await delay(500);
    const encoder = new TextEncoder();
    const buffer = encoder.encode(code);
    const result = await transfer(serial, 'code', buffer);
    console.log(result);
    await delay(500);
    serial.write('\r.load\r');
  }

  componentDidMount() {
    // ...
  }

  render() {
    return (
      <>
        <header>
          <div>
            <a href="/">
              <img src="/images/kaluma-logo.png" width="24" />
            </a>
          </div>
          <div>
            <button
              className="btn btn-primary me-2"
              disabled={!this.state.target.serial}
              onClick={this.handleFlash}
            >
              Flash
            </button>
            {!this.state.target.serial && (
              <button
                className="btn btn-outline-secondary"
                onClick={this.handleConnect}
              >
                Connect
              </button>
            )}
            <div className="device">
              <div className="product">{this.state.target.product}</div>
              <div className="vendor">{this.state.target.vendor}</div>
            </div>
            {this.state.target.serial && (
              <button
                className="btn btn-outline-secondary ms-2 px-1"
                onClick={this.handleDisconnect}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-x"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>
        </header>
        <aside>
          <div className="head">CODE</div>
          <div className="body">
            <Editor ref={this.editor} />
          </div>
        </aside>
        <section>
          <div className="head">TERMINAL</div>
          <Terminal
            ref={this.terminal}
            platform={this.platform}
            onData={this.handleData}
          />
        </section>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
