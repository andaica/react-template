import { LOG_LEVEL } from "core/config";

export enum LogLevel {
  DEBUG,
  INFO,
  WARN,
  ERROR,
  TRACE,
}

const logLevelMap = {
  [LogLevel.DEBUG]: console.debug,
  [LogLevel.INFO]: console.info,
  [LogLevel.WARN]: console.warn,
  [LogLevel.ERROR]: console.error,
  [LogLevel.TRACE]: console.trace,
};

const getLogLevel = (config: string): LogLevel => {
  const level = config.toLowerCase();
  switch (level) {
    case "debug":
      return LogLevel.DEBUG;
    case "info":
      return LogLevel.INFO;
    case "warn":
      return LogLevel.WARN;
    case "error":
      return LogLevel.ERROR;
    case "trace":
      return LogLevel.TRACE;
    default:
      return LogLevel.INFO;
  }
};

const configLevel = getLogLevel(LOG_LEVEL);

export class Logger {
  protected namespace: string;

  constructor(namespace: string) {
    this.namespace = namespace;
  }

  public log(level: LogLevel, ...args: any[]): void {
    if (level < configLevel) {
      return;
    }
    const logFunc = logLevelMap[level];
    logFunc(LogLevel[level], `[${this.namespace}]`, ...args);
  }

  public debug(message?: any, ...optionalParams: any[]): void {
    return this.log(LogLevel.DEBUG, message, ...optionalParams);
  }

  public info(message?: any, ...optionalParams: any[]): void {
    return this.log(LogLevel.INFO, message, ...optionalParams);
  }

  public warn(message?: any, ...optionalParams: any[]): void {
    return this.log(LogLevel.WARN, message, ...optionalParams);
  }

  public error(message?: any, ...optionalParams: any[]): void {
    return this.log(LogLevel.ERROR, message, ...optionalParams);
  }

  public trace(message?: any, ...optionalParams: any[]): void {
    return this.log(LogLevel.TRACE, message, ...optionalParams);
  }
}

const loggerInstances = new Map<string, Logger>();

function createLogger(namespace: string): Logger {
  let logger = loggerInstances.get(namespace);
  if (!logger) {
    logger = new Logger(namespace);
    loggerInstances.set(namespace, logger);
  }
  return logger;
}

export const logger = createLogger("app");

export default createLogger;
