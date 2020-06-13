#!/bin/bash

echo "Request to GraphQL"
curl 'https://71pjxh7coa.execute-api.us-east-1.amazonaws.com/dev/graphql' \
  -H 'Content-Type: application/json' \
  --data-binary '{"query":"{\n\tgetHero\n  getSkill\n}"}' --compressed