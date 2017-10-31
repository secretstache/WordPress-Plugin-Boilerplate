const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const jsonfile = require('jsonfile');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const replace = require('replace');
const paths = require('../config/paths');

// Settings & configurations
const pluginName = 'rsd-grocery-list-react';
const pluginPath = path.join(paths.appPlugin, pluginName);
const pluginPHPPath = path.join(pluginPath, pluginName + '.php');
const assetManifestPath = path.join(paths.appBuild, 'asset-manifest.json');

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Make sure app is already built
if (!checkRequiredFiles([assetManifestPath])) {
  console.log(chalk.red('Make sure you run `npm run build` first.'));
  process.exit(1);
}

// Clean up build directory
console.log('Cleaning up plugin directory...');
fs.emptyDirSync(pluginPath);

// Read & copy assets files
console.log('Copying asset files...');
const manifest = jsonfile.readFileSync(
  path.join(paths.appBuild, 'asset-manifest.json')
);
const jsFile = manifest['main.js'];
const cssFile = manifest['main.css'];

if (jsFile) {
  console.log('Copying script file: ' + jsFile);
  fs.copySync(
    path.join(paths.appBuild, jsFile),
    path.join(pluginPath, 'js', getFilename(jsFile)),
    {}
  );
} else {
  console.log(chalk.red('Script file not found, exiting...'));
  process.exit(1);
}

if (cssFile) {
  console.log('Copying css file: ' + cssFile);
  fs.copySync(
    path.join(paths.appBuild, cssFile),
    path.join(pluginPath, 'css', getFilename(cssFile)),
    {}
  );
} else {
  console.log(chalk.red('CSS file not found, exiting...'));
  process.exit(1);
}

// Copy php file
console.log('Copying php file...');
fs.copySync(path.join(paths.appPlugin, 'plugin.php'), pluginPHPPath);

// Replace information
console.log('Updating php file...');
replace({
  regex: '{{ JS_PATH }}',
  replacement: getFilename(jsFile),
  paths: [pluginPHPPath],
  silent: true
});
replace({
  regex: '{{ CSS_PATH }}',
  replacement: getFilename(cssFile),
  paths: [pluginPHPPath],
  silent: true
});

console.log(chalk.green('Plugin successfully built.'));
console.log(
  chalk.green(
    'Copy the following directory to your Wordpress site: wp-plugin/' +
      pluginName
  )
);

//
function getFilename(filepath) {
  const arr = filepath.split('/');
  return arr[arr.length - 1];
}
