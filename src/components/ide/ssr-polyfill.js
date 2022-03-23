if (typeof window === "undefined") {
  global.navigator = {
    platform: "",
    serial: {},
    userAgent: "",
  };
  global.window = {
    navigator: global.navigator,
    requestAnimationFrame: () => {},
    cancelAnimationFrame: () => {},
  };
  global.self = global.window;
}
