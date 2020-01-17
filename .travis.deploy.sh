#!/usr/bin/env bash

cd ${TRAVIS_BUILD_DIR}
cp .env.js.stage .env.js
quasar build
cp -R dist/spa/* docs
