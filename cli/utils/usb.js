const {logger} = require('./logger');

const {execPromise, canIUseCmd} = require('./exec');

async function reverseAndroid(port) {
  const supported = await canIUseCmd('adb');
  if (!supported) {
    logger.warn(
      '如需自动 "adb reverse" 命令，请先安装 adb 工具: https://www.google.com/search?q=install%20adb%20macos',
    );
    return;
  }
  const result = await execPromise('adb devices');
  const devicesList = result.stdout
    .split(/\n/)
    .slice(1)
    .map((line) => line.split(/\s+/)[0])
    .filter(Boolean);

  for (const device of devicesList) {
    const cmd = `adb -s ${device} reverse tcp:${port} tcp:${port}`;
    logger.info(`自动执行: ${cmd}`);
    await execPromise(cmd);
  }
}

async function autoReverse(port) {
  try {
    await reverseAndroid(port);
    // TODO iOS 上暂时没有工具可以 reverse
  } catch (err) {}
}

async function autoUsbReverse(port) {
  if (!port) {
    return;
  }

  // 立即自执行一次
  await autoReverse(port);

  try {
    const usb = require('usb');
    if (usb && usb.on) {
      // 监听设备插入
      usb.on('attach', () => {
        // 等个 2s 让设备建立好联接
        setTimeout(() => autoReverse(port), 2000);
      });
    }
  } catch (error) {
    logger.error('node usb 模块安装失败');
  }
}

module.exports = {
  autoUsbReverse,
};
