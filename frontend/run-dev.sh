#!/bin/sh
PORT="$1"
if [ -z "$1" ]
  then PORT="3001"
fi
echo $PORT
kill $(lsof -t -i:$PORT)
PORT=$PORT HTTPS=true npm run start&
