#!/bin/bash

docker run \
    --name brewdocs-mysql \
    -p 3307:3306 \
    -v $PWD/lib/db/mysql:/var/lib/mysql \
    -e MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD \
    -e MYSQL_DATABASE=$MYSQL_DATABASE \
    -d mariadb:latest