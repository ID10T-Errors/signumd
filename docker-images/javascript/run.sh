#!/bin/sh

printenv | while read line; do
  if [[ $line == SIGNUM_FILE_* ]]; then
    IFS='=' read -ra SECTIONS <<< "$line"
    IFS='_' read -ra FILENAME <<< "${SECTIONS[0]}"
    FILENAME="${FILENAME[2]}"
    unset SECTIONS[0]
    printf "%s" "${SECTIONS[*]}" > "${FILENAME}"
  fi
done
printf "%s" "$SIGNUM_CODE" > index.js && npm install $SIGNUM_DEPS > /dev/null && node .
