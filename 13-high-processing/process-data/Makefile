.PHONY: help cat-head

.DEFAULT: help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36mmake %-20s\033[0m\n\t%s\n", $$1, $$2}'

docker-run: ## run in docker
	./run.sh

run: ## run node index.js
	node index.js

run-with-log: ## run node and log
	node index.js | tee items.json

describe-file: ## run cat survey_results_public.csv | head
	cat survey_results_public.csv|head
	@echo "cat | head executed..."


