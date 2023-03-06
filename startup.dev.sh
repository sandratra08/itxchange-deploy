#!/usr/bin/env bash
set -e

/opt/wait-for-it.sh postgres:5519
npm run migration:run
npm run seed:run
npm run start:prod
