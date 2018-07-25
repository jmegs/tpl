#! /usr/bin/env node
const shell = require('shelljs')
const meow = require('meow')
const log = require('@compositor/log')
const chalk = require('chalk')

// config
log.name = 'tpl'
shell.config.silent = true
shell.config.fatal = true

// shallow clone the repo, re-initialize git
const asyncScaffold = async (repo, directory) => {
  log(`Setting up ${directory} from ${repo}`)
  try {
    await shell.exec(`git clone --depth 1 ${repo} ${directory}`)
    await shell.cd(directory)
    await shell.rm('-rf', '.git')
    shell.exec('git init')
    shell.exec('git add --all')
    shell.exec('git commit -m "initial commit"')
    const formattedCommand = chalk.cyan(`cd ${directory}`)
    log(`Ready to go! Type ${formattedCommand} to get started`)
  } catch (error) {
    log.error(error.message)
  }
}

const REPO_REGEX = /^[A-Za-z0-9_-]+\/[A-Za-z0-9_-]+$/
const NAME_REGEX = /([A-Za-z0-9_-]+).git$/

const cli = meow(`
    Usage
      $ tpl <repo> <directory>

    Examples
      $ tpl my-site jmegs/static-starter
      $ tpl my-project https://github.com/broccolini/react-website-starter
`)

let repo = cli.input[0]
let directory = cli.input[1]

// handles case of user/repo input
if (repo.match(REPO_REGEX)) {
  repo = `https://github.com/${repo}.git`
}

// uses the repo name if no directory is specified
if (!directory) {
  directory = repo.match(NAME_REGEX)[0]
}

asyncScaffold(repo, directory)
