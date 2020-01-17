#!/usr/bin/env bash

cd ${TRAVIS_BUILD_DIR}

if [[ -f .env.js.stage ]]; then
  cp .env.js.stage .env.js
fi
docker run -v "${PWD}":/app -w /app tevun/quasar:latest \
  quasar build
  cp -R dist/spa/* ./ &&\
