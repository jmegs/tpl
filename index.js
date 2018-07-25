const shell = require('shelljs')
const meow = require('meow')
const log = require('@compositor/log')
log.name = 'tpl'

const scaffold = (repo, directory) => {
  // log to console we're starting REMOTE in DIRECTORY
  // try
  // run git clone --depth 1 REMOTE DIRECTORY
  shell.exec(
    `git clone --depth 1 ${repo} ${directory}`,
    { silent: true },
    code => {
      if (code !== 0) {
        shell.exit(1)
      }
      // && cd DIRECTORY $$ rm -rf .git && git init
      shell.cd(directory)
      shell.rm('-rf', '.git')
      shell.exec('git init', { silent: true })
      shell.exec('git add --all', { silent: true })
      shell.exec('git commit -m "initial commit"', { silent: true })
      log('Success, ready to work.')
    }
  )
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

if (repo.match(REPO_REGEX)) {
  repo = `https://github.com/${repo}.git`
}

if (!directory) {
  directory = repo.match(NAME_REGEX)[0]
}

try {
  log(`Setting up ${directory} from ${repo}`)
  scaffold(repo, directory)
} catch {
  log.error('Git Error')
}
