#!/bin/bash

NOW=$(date +"%F_%H%M%S")

cp -r $PWD /srv/expansyon-backend/build-$NOW

cp /srv/expansyon-backend/dotenv/.env.production /srv/expansyon-backend/build-$NOW/.env
cd /srv/expansyon-backend/build-$NOW

rm -r /srv/expansyon-backend/current
ln -s /srv/expansyon-backend/build-$NOW /srv/expansyon-backend/current

pm2 restart expansyon-backend
