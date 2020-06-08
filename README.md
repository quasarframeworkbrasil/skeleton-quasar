# This reposository is readonly now

<p align="center">
  <img
    src="https://raw.githubusercontent.com/quasarframeworkbrasil/skeleton-quasar/master/readonly.png"
    alt="readonly"
  />
</p>

> If you like this repository, you may like this organization focused on the approach used here https://github.com/devitools

[![Build Status](https://travis-ci.com/quasarframeworkbrasil/skeleton-quasar.svg?branch=master)](https://travis-ci.com/quasarframeworkbrasil/skeleton-quasar)

# Skeleton

Rapid development with Vue and Quasar

## Docs

Get started in our [docs](https://quasarframework-brasil.gitbook.io/skeleton-quasar) ; )

## How to use

### Using local

#### Install the dependencies
```bash
yarn install
```

#### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

#### Lint the files
```bash
yarn run lint
```

#### Build the app for production
```bash
quasar build
```

### Using with Docker

#### Start with docker-compose
```bash
cp docker-compose.yml.develop docker-compose.yml
docker-compose up
```

#### Lint the files
```bash
docker-compose run skeleton yarn run lint
```

#### Build the app for production
```bash
docker-compose run skeleton quasar build
```

### Play with GNU makefile
```bash
make
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
