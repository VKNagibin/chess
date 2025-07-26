class Logger {
  static log(...messages: any) {
    console.log(...messages);
  }

  static error(...messages: any) {
    console.error(...messages);
  }
}

export default Logger;
