# TPL

Quickly start up new projects from examples on Github.
![gif of tpl in action](/tpl.gif)

## Installing

install tpl globally so you can access it on the command line

```sh
npm install -g @jmegs/tpl
# or yarn global add @jmegs/tpl
```

## What it does

tpl will shallow clone a repository and re-initialize git, so you have a clean start to your project, without any of the authors commits to worry about.

It basically wraps this squence of commands so you don't have to remember them.

```sh
git clone --depth 1 <repo> <directory> && cd <directory> && rm -rf .git && git init && git add -all && git commit -m 'initial commit'
```

## Usage

tpl accepts two arguments

1.  the repo you want a copy of
2.  the directory you want to put it in (optional)

the repo can either be a full github link or the shorthand `<user>/<repo>`

```sh
# make a fresh copy of static-starter in my-new-site
tpl jmegs/static-starter my-new-site
```

```sh
# make a fresh copy of react-website-starter in a directory of the same name
tpl https://github.com/broccolini/react-website-starter.git
```

## Made With

[ShellJS](https://github.com/shelljs/shelljs)
[Log](https://github.com/c8r/log)
[Meow](https://github.com/sindresorhus/meow)
[Chalk](https://github.com/chalk/chalk)
