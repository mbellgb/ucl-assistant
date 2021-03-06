#!/bin/sh
set -e
NODE_ENV=${NODE_ENV:-test}
REPO=${REPO:-repo}
cd $REPO
yarn install --pure-lockfile
(cd lib && yarn install --pure-lockfile)
(cd $APP_NAME && yarn install --pure-lockfile)
yarn run eslint lib --ext .js --ext .jsx --cache --ignore-path .eslintignore
yarn run eslint $APP_NAME --ext .js --ext .jsx --cache --ignore-path .eslintignore
yarn run jest --projects $APP_NAME
