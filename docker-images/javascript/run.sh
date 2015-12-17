#!/bin/sh

printf "%s" "$SIGNUM_CODE" > index.js
node .
