#!/bin/sh

printf "%s" "$SIGNUM_CODE" > index.js && npm install $SIGNUM_DEPS > /dev/null && node .
