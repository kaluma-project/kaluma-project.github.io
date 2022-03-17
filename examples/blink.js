/**
 * Example: Blink
 * Blinking the on-board LED every 1 second.
 */

const led = 25;
pinMode(led, OUTPUT);
setInterval(() => {
  digitalToggle(led);
}, 1000);
