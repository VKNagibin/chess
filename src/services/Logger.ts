class Logger {
  static log(...messages: any) {
    console.log(...messages);
  }

  static dir(...messages: any) {
    console.dir(...messages);
  }

  static trace(...messages: any) {
    console.trace(...messages);
  }

  static error(...messages: any) {
    console.error(...messages);
  }
}

export default Logger;
