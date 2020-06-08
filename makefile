#!/usr/bin/make
include .env
export

.PHONY: help
.DEFAULT_GOAL := help

help:  ## Display this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

##@ Initialize work

init: ## Start a new develop enviroment
	cp docker-compose.yml.develop docker-compose.yml

##@ Development

dev: ## Start dev mode with terminal attached
	docker-compose up

down: ## Start dev mode with terminal attached
	docker-compose down && docker-compose rm -f

bash: ## Start dev mode with terminal attached
	docker-compose run skeleton bash

##@ Publish

build: ## Publish the app to stage environment
	docker-compose run skeleton quasar build
