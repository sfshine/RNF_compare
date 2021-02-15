const {execSync} = require('child_process');
const CodePush = require('./codePush.ts');
const DEBUG_TYPE = 'debug';
function upperFirst(str) {
  return str.replace(/^\S/, (s) => s.toUpperCase());
}
function genVariantsCmd(variantName, variant, buildType) {
  const taskSuffix = `${upperFirst(variantName)}${upperFirst(buildType)}`;
  let cmd = `./gradlew assemble${taskSuffix}`;
  if (buildType != DEBUG_TYPE) {
    cmd += ` -x bundle${taskSuffix}JsAndAssets`;
  }
  return (
    cmd +
    Object.keys(variant)
      .map((it) => {
        if (it === 'bundleUrl') return '';
        return ` -P${it}=${variant[it]}`;
      })
      .join('')
  );
}
function execCmd(rootPath, commend) {
  function exec(cmd) {
    console.log('execSync:', cmd);
    console.log(execSync(cmd, {cwd: rootPath}).toString());
  }
  if (commend instanceof Array) {
    for (let cmd of commend) {
      exec(cmd);
    }
  } else {
    exec(commend);
  }
}

async function build(rootPath, variantName, variant, buildType) {
  execCmd(rootPath, './gradlew clean');
  if (buildType != DEBUG_TYPE) {
    await CodePush.preset(
      variant.bundleUrl,
      rootPath + 'app/build/',
      variantName,
      buildType,
    );
  }
  execCmd(rootPath, genVariantsCmd(variantName, variant, buildType));
}
module.exports = {
  build: build,
};
