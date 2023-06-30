#!/bin/bash

cd /tmp/ ; ls -1 *.json | sed 's/.json$//' | while read col; do mongoimport -d projetoRPCW -c $col --jsonArray < $col.json; done