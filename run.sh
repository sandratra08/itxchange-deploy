#!/usr/bin/env bash
# set -e
# ./wait-for-it.sh postgres:5432
# docker start aeasdb-api-maildev-1 aeasdb-api-redis-1
# docker start aeasdb-api-redis-1
npm run migration:run
npm run seed:run
npm run start:dev
