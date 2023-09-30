#!/bin/bash

REPOSITORY=/home/ubuntu/CafeFlow_Front

cd $REPOSITORY 

sudo npm install

sudo npx pm2 reload all