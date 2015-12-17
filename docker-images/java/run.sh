#!/bin/sh

printf "%s" "$SIGNUM_CODE" > "$SIGNUM_CLASSNAME".java
javac "$SIGNUM_CLASSNAME".java
java "$SIGNUM_CLASSNAME"
