#!/usr/bin/env bash

# die on error
set -e

# cd to node_modules/bin
cd node_modules/.bin

# login to expo
node exp login -u $EXPO_USERNAME -p $EXPO_PASSWORD

# publish to expo
node exp publish
