/* eslint-disable max-classes-per-file */
import { EventEmitter } from 'events';
import io from 'socket.io-client';

const AGENT_URL = 'http://127.0.0.1:54094';

export class SerialPortWrapper extends EventEmitter {
  constructor(webseria, socket, agentserial) {
    super();
    this.webserial = webserial;
    this.reader = null;
    this.socket = socket;
    this.agentserial = agentserial;
  }

  async getInfo() {
    if (this.webserial) {
      return this.webserial.getInfo();
    }
    return {
      usbVendorId: parseInt(this.agentserial.vendorId, 16),
      usbProductId: parseInt(this.agentserial.productId, 16),
    };
  }

  open(options) {
    return new Promise((resolve, reject) => {
      if (this.webserial) {
        this.webserial
          .open(options)
          .then(() => {
            const readLoop = () => {
              const reader = this.webserial.readable.getReader();
              this.reader = reader;
              reader
                .read()
                .then(({ value, done }) => {
                  reader.releaseLock();
                  if (value) {
                    this.emit('data', value);
                  }
                  if (done) {
                    // disconnect
                    // console.log('disconnect in readLoop()');
                  } else {
                    readLoop();
                  }
                })
                .catch((err) => {
                  console.log(err);
                  this.emit('disconnect');
                });
            };
            readLoop();
            this.emit('connect');
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        this.socket.on('event:open', (path) => {
          if (this.agentserial.path === path) {
            this.emit('connect');
          }
        });

        this.socket.on('event:close', (path) => {
          if (this.agentserial.path === path) {
            this.emit('disconnect');
          }
        });

        this.socket.on('event:close-disconnected', (path) => {
          if (this.agentserial.path === path) {
            this.emit('disconnect', path);
          }
        });

        this.socket.on('event:data', (path, data) => {
          if (this.agentserial.path === path) {
            const encoder = new TextEncoder();
            this.emit('data', encoder.encode(data));
          }
        });

        this.socket.emit('cmd:open', this.agentserial.path, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      if (this.webserial) {
        if (this.reader) {
          this.reader
            .cancel()
            .then(() => this.webserial.close())
            .then(() => resolve())
            .catch((err) => reject(err));
        } else {
          this.reader = null;
          this.webserial
            .close()
            .then(() => resolve())
            .catch((err) => reject(err));
        }
      } else {
        this.socket.emit('cmd:close', this.agentserial.path, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }
    });
  }

  write(data, encoding = 'string') {
    return new Promise((resolve, reject) => {
      if (this.webserial) {
        const writer = this.webserial.writable.getWriter();
        if (encoding === 'string') {
          const encoder = new TextEncoder();
          writer
            .write(encoder.encode(data))
            .then(() => resolve())
            .catch((err) => reject(err));
        } else if (encoding === 'binary') {
          writer
            .write(data)
            .then(() => resolve())
            .catch((err) => reject(err));
        }
        writer.releaseLock();
      } else {
        this.socket.emit('cmd:write', this.agentserial.path, data, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }
    });
  }
}

export class SerialWrapper extends EventEmitter {
  constructor() {
    super();
    this.socket = null;
    this.injectPort = null;
  }

  /**
   * Setup socket
   */
  setup() {
    const opt = {
      withCredentials: true,
    };

    fetch(`${AGENT_URL}/ping`, {
      method: 'GET',
      mode: 'cors',
    })
      .then((res) => {
        if (res.ok) {
          console.log('Local agent is connected');
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          this.socket = io(AGENT_URL, opt);
          this.socket.on('connect_failed', () => {
            console.log('err...');
          });
          this.socket.on('connect', () => {
            this.emit('connect');
          });
          this.socket.on('disconnect', (reason) => {
            this.emit('disconnect', reason);
          });
          this.socket.on('connect_error', (err) => {
            // this.emit('connect_error', err);
          });
          this.socket.on('connect_timeout', () => {
            this.emit('connect_error');
          });
        }
      })
      .catch(() => {
        console.log('Local agent not found (Web Serial API will be used)');
      });
  }

  requestPort() {
    return new Promise((resolve, reject) => {
      if (this.socket && this.socket.connected) {
        this.socket.emit('cmd:list', (err, ports) => {
          if (err) {
            reject(err);
          } else {
            // ------------------------------
            this.socket.emit(
              'cmd:write-binary',
              '-path-',
              new Uint8Array([0, 1, 2, 3]),
              (err) => {
                console.log('done...');
              }
            );
            // ------------------------------
            this.injectPort = (port) => {
              resolve(new SerialPortWrapper(null, this.socket, port));
            };
            this.emit('list', ports);
          }
        });
      } else {
        navigator.serial
          .requestPort()
          .then((port) => {
            if (port) {
              resolve(new SerialPortWrapper(port, null, null));
            } else {
              resolve(null);
            }
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  }
}
