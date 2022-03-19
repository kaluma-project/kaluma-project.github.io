if (typeof window === "undefined") {
  global.navigator = {
    platform: "",
    serial: {},
    userAgent: "",
  };
  global.window = {
    navigator: global.navigator,
  };
  global.self = global.window;
}
