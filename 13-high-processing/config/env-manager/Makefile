.PHONY: help run test

.DEFAULT: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36mmake %-20s\033[0m\n\t%s\n", $$1, $$2}'

run: ## Set ENVs on Parameter Store at AWS Systems Manager
	node manage-envs.js
	@echo "ENVs pushed to AWS Systems Manager"

