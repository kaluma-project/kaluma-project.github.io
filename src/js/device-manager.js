import { EventEmitter } from 'events';
import { Device, SerialWrapper } from '../base';
import { transfer } from './ymodem';

/**
 * DeviceManager
 */
export default class DeviceManager extends EventEmitter {
  constructor() {
    super();
    this.target = null;
    this.defaultDataHandler = (data) => {
      const s = new TextDecoder().decode(data);
      this.emit('data', s);
    };
    this.serial = null;
    // this.serial = new SerialWrapper();
    // this.serial.setup();
  }

  /**
   * Connect a serial device
   * @async
   */
  async connect() {
    // const port = await navigator.serial.requestPort();
    const port = await this.serial.requestPort();
    if (port) {
      const device = new Device(port);
      device.on('disconnect', async () => {
        this.target = null;
        this.emit('change', this.target);
      });
      device.on('data', this.defaultDataHandler);
      await device.getInfo();
      await device.open();
      this.target = device;
      this.emit('change', this.target);
    }
    return this.target;
  }

  /**
   * Disconnect the serial device
   */
  async disconnect() {
    if (this.target) {
      await this.target.close();
      this.target = null;
      this.emit('change', this.target);
    }
  }

  /**
   * Write data to the serial
   */
  async write(data) {
    if (this.target) {
      this.target.write(data);
    }
  }

  /**
   * Upload code to the serial
   */
  async upload(code) {
    if (this.target) {
      // Turn to flash writing mode
      await this.target.write('\r');
      await this.target.write('.flash -w\r');
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Send the file via Ymodem protocol
      const encoder = new TextEncoder();
      const buffer = encoder.encode(code);
      const result = await transfer(this.target, 'usercode', buffer);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setTimeout(async () => {
        await this.target.write('\r.load\r');
      }, 100);
    }
  }

  handleEvents() {}

  appReady() {
    this.handleEvents();
  }
}
