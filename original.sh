sh functions to scaffold projects from github repos
# Exposes alias "template"
# http://sudodoki.name/bash-scripts-to-automate-usage-of-starters/
# Usage:
# template https://github.com/kriasoft/react-starter-kit.git my-project  
# template roman01la/f-react-kit

cloneCleanup() {  
  # $1 - $GITREMOTE
  # $2 - $FOLDER_NAME
  echo "Will be setting up $GITREMOTE in $FOLDER_NAME"
  # Clone last commit, remove git folder, init empty git repo, save the last used template
  if git clone --depth 1 $1 $2 && cd $_ && rm -rf .git && git init 
  then
    echo "Ready to work."
  else
    echo "Something went wrong."
  fi
}

scaffoldGithub() {
  GITREMOTE=$1
  # Handle username/reponame case
  if [[ "$1" =~ ^[A-Za-z0-9_-]+\/[A-Za-z0-9_-]+$ ]]
  then
    GITREMOTE="https://github.com/$1.git"
  fi
  # capture PROJECT_NAME part of git link (right before .git)
  REGEX="([A-Za-z0-9_-]+).git$"
  [[ "$GITREMOTE" =~ $REGEX  ]];
  PROJECT_NAME="${match}"
  # use provided folder name with fallback to project name
  FOLDER_NAME="${2:-$PROJECT_NAME}"
  cloneCleanup $GITREMOTE $FOLDER_NAME
}

alias template=scaffoldGithub
