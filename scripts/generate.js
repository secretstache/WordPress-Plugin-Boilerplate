const argv = require('minimist')(process.argv.slice(2))
const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')
const replace = require('replace-in-file')
const chalk = require('chalk')

const PLUGIN_NAME = argv._[0]
if (!PLUGIN_NAME) {
  console.error(chalk.red('Plugin name not provided!'))
  process.exit(1)
}

const ROOT_PATH = path.resolve(__dirname, '..')
const SRC_PATH = path.join(ROOT_PATH, 'plugin-name')
const DEST_PATH = path.join(ROOT_PATH, PLUGIN_NAME)

console.log(chalk.yellow('Generating plugin with plugin name: ') + PLUGIN_NAME)

// copy folder
function copyDir() {
  console.log(chalk.yellow('Copying files...'))

  fs.copySync(SRC_PATH, DEST_PATH, {
    filter: (src, dest) => {
      const ignored = [
        'node_modules',
        'yarn-error.log',
        'admin/build',
        'public/build'
      ]
      return ignored.filter(w => src.includes(w)).length === 0
    }
  })
}

// rename files
function renameFiles() {
  console.log(chalk.yellow('Renaming files...'))

  const files = glob.sync(`${DEST_PATH}/**/*plugin-name*`)
  files.forEach(oldPath => {
    const newPath = oldPath.replace('plugin-name', PLUGIN_NAME)
    fs.renameSync(oldPath, newPath)
  })
}

// edit code templates
function replaceTmps() {
  console.log(chalk.yellow('Editing code templates...'))

  const pluginVar = PLUGIN_NAME.replace('-', '_')
  const pluginClass = PLUGIN_NAME.split('-')
    .map(str => str.charAt(0).toUpperCase() + str.slice(1))
    .join('_')

  replace.sync({
    files: `${DEST_PATH}/**/*.php`,
    from: [/plugin-name/g, /plugin_name/g, /PLUGIN_NAME/g, /Plugin_Name/g],
    to: [PLUGIN_NAME, pluginVar, pluginVar.toUpperCase(), pluginClass]
  })
}

function init() {
  copyDir()
  renameFiles()
  replaceTmps()
}

init()
