#!/bin/bash

echo "Request to GraphQL - Mutation"
curl 'https://71pjxh7coa.execute-api.us-east-1.amazonaws.com/dev/graphql' \
  -H 'Content-Type: application/json' \
  --data-binary '{"query":"mutation {\n  createHero\n  createSkill\n}"}' --compressed

echo ""
echo "Request to GraphQL - Query"
curl 'https://71pjxh7coa.execute-api.us-east-1.amazonaws.com/dev/graphql' \
  -H 'Content-Type: application/json' \
  --data-binary '{"query":"{\n\tgetHero\n  getSkill\n}"}' --compressed

