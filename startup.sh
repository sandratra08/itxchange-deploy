#!/usr/bin/env bash
set -e
# ./wait-for-it.sh postgres:5432
# docker compose up -d redis
npm run migration:run
npm run seed:run
npm run prebuild
npm run build
npm run start:prod
