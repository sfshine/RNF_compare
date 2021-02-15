export class Log {
  static d(tag, ...log) {
    console.debug(tag, log);
  }
  static i(tag, ...log) {
    console.log(tag, log);
  }
  static w(tag, ...log) {
    console.warn(tag, log);
  }
  static e(tag, ...log) {
    console.error(tag, log);
  }
}
