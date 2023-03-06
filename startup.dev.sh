#!/usr/bin/env bash
set -e

/opt/wait-for-it.sh postgresql://postgres:P46hmnusAHnDKZq8xvJq@containers-us-west-147.railway.app:5519/railway
npm run migration:run
npm run seed:run
npm run start:prod
