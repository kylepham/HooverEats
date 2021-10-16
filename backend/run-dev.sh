#!/bin/sh
PORT="$1"
kill $(lsof -t -i:$PORT)
mvn clean package &&  java -jar target/HooverEats-0.0.1.jar &
tail -f log/hoovereats.log
