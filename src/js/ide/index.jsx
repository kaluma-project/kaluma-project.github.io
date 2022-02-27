import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Serial } from './serial';
import { Terminal } from './terminal.jsx';
import { Editor } from './editor.jsx';
import { transfer } from './ymodem';
import { delay } from './utils';
import examples from '../../_data/examples.json';

const supportedDevices = [
  { vendorId: 11914, productId: 10, vendor: 'Raspberry Pi', product: 'Pico' },
];

function Spinner() {
  return (
    <div class="lds-ring me-1">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

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
      flashing: false,
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
      this.setState((prev) => {
        return {
          ...prev,
          flashing: true,
        };
      });
      await this.flash(code);
      this.setState((prev) => {
        return {
          ...prev,
          flashing: false,
        };
      });
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

  async load(url) {
    const res = await fetch(url);
    const text = await res.text();
    this.editor.current.setValue(text);
  }

  async componentDidMount() {
    /*
    console.log(window.location.search);
    const params = new URLSearchParams(window.location.search);
    const load = params.get('load');
    const res = await fetch(load);
    const text = await res.text();
    console.log(text);
    */
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
              className="btn btn-primary d-flex align-items-center me-2 "
              disabled={!this.state.target.serial}
              onClick={this.handleFlash}
            >
              {this.state.flashing && <Spinner />}
              <span>Flash</span>
            </button>
            {!this.state.target.serial && (
              <button
                className="btn btn-secondary"
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
                className="btn btn-secondary ms-2 px-1"
                onClick={this.handleDisconnect}
                title="Disconnect"
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
          <div className="head">
            <div className="px-2">CODE</div>
            <div>
              <div class="dropdown">
                <button
                  class="btn btn-text dropdown-toggle"
                  type="button"
                  id="examples-dropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Examples
                </button>
                <ul class="dropdown-menu" aria-labelledby="examples-dropdown">
                  {examples.map((ex) => (
                    <li>
                      <a
                        class="dropdown-item"
                        onClick={() => {
                          this.load(ex.url);
                        }}
                      >
                        {ex.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="body">
            <Editor ref={this.editor} />
          </div>
        </aside>
        <section>
          <div className="head">
            <div className="px-2">TERMINAL</div>
            <div></div>
          </div>
          <div className="body">
            <Terminal
              ref={this.terminal}
              platform={this.platform}
              onData={this.handleData}
            />
          </div>
        </section>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
