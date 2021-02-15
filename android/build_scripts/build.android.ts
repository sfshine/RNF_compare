const BuildAndroid = require('./utils/build.ts');
const Config = require('./config.ts');

//eg:
//yarn build.android rnfDemo release
//yarn build.android rnfDemo releaseStaging
//yarn build.android rnfDemo debug
const variantName = process.argv[2] || 'rnf';
const buildType = process.argv[3] || 'release'; //Release, ReleaseStaging, Debug

console.log(
  'build: variantName = ' + variantName + ' buildType = ' + buildType,
);
BuildAndroid.build(
  './android/',
  variantName,
  Config[variantName],
  buildType,
).catch((e) => console.error(e));
