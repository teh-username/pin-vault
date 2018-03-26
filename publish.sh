#!/usr/bin/env bash

# die on error
set -e

# login to expo
node node_modules/.bin/exp login -u $EXPO_USERNAME -p $EXPO_PASSWORD

# publish to expo
node node_modules/.bin/exp publish
