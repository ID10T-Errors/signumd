#!/usr/bin/env bash

printenv | while read line; do
  if [[ $line == SIGNUM_FILE_* ]]; then
    IFS='=' read -ra SECTIONS <<< "$line"
    IFS='_' read -ra FILENAME <<< "${SECTIONS[0]}"
    FILENAME="${FILENAME[2]}"
    unset SECTIONS[0]
    printf "%s" "${SECTIONS[*]}" > "${FILENAME}"
    sed -i "s/\\n/\n/g" "${FILENAME}"
    sed -i "s/\\\\/\\/g" "${FILENAME}"
  fi
done
printf "%s" "$SIGNUM_CODE" > "$SIGNUM_CLASSNAME".java
javac "$SIGNUM_CLASSNAME".java
java "$SIGNUM_CLASSNAME"
