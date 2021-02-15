const https = require('https');
const compressing = require('compressing');
const fs = require('fs');
const path = require('path');
const TAG = 'CodePush';

function unzipFile(source, dest) {
  console.log(TAG, 'unzipFile: source =' + source + ' dest = ' + dest);
  return compressing.zip.uncompress(source, dest);
}
function downloadBundle(uri, filePath) {
  console.log(TAG, 'downloadBundle: uri =' + uri + ' filePath = ' + filePath);
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    https.get(uri, (res) => {
      if (res.statusCode !== 200) {
        reject('download error' + res.statusCode);
      } else {
        res.on('end', () => {
          console.log('download success');
          resolve(filePath);
        });
        res.on('error', () => {
          reject('download failed');
        });
        file
          .on('finish', () => {
            file.close();
          })
          .on('error', (err) => {
            fs.unlink(filePath);
          });
        res.pipe(file);
      }
    });
  });
}
function moveFileToBuildGeneratePath(
  tmpPath,
  generatedPath,
  variantName,
  buildType,
) {
  console.log(
    TAG,
    'moveFileToBuildGeneratePath: tmpPath =' +
      tmpPath +
      ' generatedPath = ' +
      generatedPath +
      ' buildType = ' +
      buildType,
  );
  // const assetsPath = generatedPath + 'assets/react/' + buildType;
  // const resPath = generatedPath + 'res/react/' + buildType;
  const assetsPath = `${generatedPath}assets/react/${variantName}/${buildType}/`;
  const resPath = `${generatedPath}res/react/${variantName}/${buildType}/`;
  fs.mkdirSync(assetsPath, {recursive: true});
  fs.mkdirSync(resPath, {recursive: true});
  fs.renameSync(
    tmpPath + 'CodePush/index.android.bundle',
    assetsPath + 'index.android.bundle',
  );
  fs.renameSync(tmpPath + 'CodePush/', resPath);
}

module.exports = {
  preset: async (uri, buildPath, variantName, buildType) => {
    const tmpPath = buildPath + 'tmp/';
    fs.mkdirSync(tmpPath, {recursive: true});
    const filePath = tmpPath + 'code_push.zip';
    await downloadBundle(uri, filePath);
    await unzipFile(filePath, tmpPath);
    moveFileToBuildGeneratePath(
      tmpPath,
      buildPath + 'generated/',
      variantName,
      buildType,
    );
  },
};
