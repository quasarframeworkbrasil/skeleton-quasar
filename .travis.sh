#!/usr/bin/env bash

cd ${TRAVIS_BUILD_DIR}

cp .env.js.stage .env.js
docker run -v "${PWD}":/app -w /app tevun/quasar:latest quasar build

rm -rf node_modules/
rm -rf .quasar/
rm -rf .bin/
rm -rf src/

rm -rf .env
rm -rf .eslintignore
rm -rf .eslintrc.js
rm -rf .gitignore
rm -rf .postcssrc.js
rm -rf .stylintrc
rm -rf .travis.deploy.sh
rm -rf .travis.yml
rm -rf babel.config.js
rm -rf command.sh
rm -rf docker-compose.yml
rm -rf package.json
rm -rf quasar.conf.js
rm -rf README.md
rm -rf version.ejs
rm -rf yarn.lock

cp -R dist/spa/* ./

rm -rf dist/
