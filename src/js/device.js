import { EventEmitter } from 'events';
import { SerialPortWrapper } from '.';

const supportedDevices = [
  { vendorId: 11914, productId: 10, vendor: 'Raspberry Pi', product: 'Pico' },
];

/**
 * Device class
 */
export default class Device extends EventEmitter {
  constructor(port) {
    super();
    this.serialport = port;
    this.vendorId = null;
    this.productId = null;
    this.vendor = 'Unknown';
    this.product = 'Unknown';
    this.reader = null;
    if (this.serialport) {
      this.serialport.on('disconnect', () => {
        this.emit('disconnect');
      });
      this.serialport.on('data', (data) => {
        this.emit('data', data);
      });
    }
  }

  async getInfo() {
    if (this.serialport) {
      const info = await this.serialport.getInfo();
      const supported = supportedDevices.find(
        (d) =>
          d.vendorId === info.usbVendorId && d.productId === info.usbProductId
      );
      if (supported) {
        Object.assign(this, supported);
      }
    }
  }

  async open() {
    const options = {
      baudRate: 115200,
    };
    if (this.serialport) {
      await this.serialport.open(options);
      /*
      await this.serialport.open(options);
      const readLoop = () => {
        const reader = this.serialport.readable.getReader();
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
      */
    }
  }

  async close() {
    if (this.serialport) {
      await this.serialport.close();
      /*
      if (this.reader) await this.reader.cancel();
      await this.serialport.close();
      this.reader = null;
      */
    }
  }

  async write(data, encoding = 'string') {
    if (this.serialport) {
      await this.serialport.write(data, encoding);
    }
    /*
    if (this.serialport.writable) {
      const writer = this.serialport.writable.getWriter();
      if (encoding === 'string') {
        const encoder = new TextEncoder();
        await writer.write(encoder.encode(data));
      } else if (encoding === 'binary') {
        await writer.write(data);
      }
      writer.releaseLock();
    }
    */
  }
}
