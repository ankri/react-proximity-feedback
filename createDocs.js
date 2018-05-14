/* eslint-disable */
const fs = require('fs');

const paths = {
  docs: './docs',
  demo: './demo/dist'
};

// first step: clean directory
console.info('cleaning up docs/');
fs.readdirSync(paths.docs).forEach(function(fileName) {
  var file = paths.docs + '/' + fileName;
  fs.unlinkSync(file);
});

// second step: copy contents of demo/dist/ to docs/
console.info('copying contents of demo/dist to docs');
fs.readdirSync(paths.demo).forEach(function(fileName) {
  var file = paths.demo + '/' + fileName;
  fs.copyFileSync(file, paths.docs + '/' + fileName);
});

console.info('done');
