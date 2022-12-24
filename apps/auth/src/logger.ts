export class Logger {
  private loggerName: string;

  constructor(loggerName: string) {
    this.loggerName = loggerName;
  }

  log(message: string) {
    console.log(`\x1b[33m[${this.loggerName}]\x1b[0m ${message}`);
  }

  error(message: string) {
    console.log("\x1b[31m%s\x1b[0m", `[${this.loggerName}] (ERROR) ${message}`);
  }
}

export const logger = new Logger("ETS-AUTH");
