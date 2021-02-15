const childProcess = require('child_process');
const util = require('util');

function exec(command, opts = {}, callback) {
  const exitHandle = typeof callback === 'function' ? callback : () => {};
  const makeProcess = childProcess.exec(command, opts, exitHandle);
  makeProcess.stdout.on('data', function (data) {
    process.stdout.write(data);
  });
}

function execSync(command, opts = {}) {
  const options = {
    ...opts,
    encoding: 'utf-8',
  };
  return childProcess.execSync(command, options).trim();
}

function execSyncSafe(...arg) {
  try {
    return execSync(...arg);
  } catch (error) {
    return '';
  }
}

const execPromise = util.promisify(childProcess.exec);

function canIUseCmd(cmd) {
  return execPromise(`${cmd} --help`)
    .then(() => true)
    .catch(() => false);
}

module.exports = {
  exec,
  execSync,
  execSyncSafe,
  execPromise,
  canIUseCmd,
};
