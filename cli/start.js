const {execSync, exec} = require('./utils/exec');
const {autoUsbReverse} = require('./utils/usb');
const {logger} = require('./utils/logger');

logger.info(execSync('pkill node'));
logger.info(autoUsbReverse(8081));
exec('react-native start');
