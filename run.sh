#!/usr/bin/env bash
set -e


npm run migration:generate src/database/migrations/InitTable
npm run migration:run
npm run seed:run