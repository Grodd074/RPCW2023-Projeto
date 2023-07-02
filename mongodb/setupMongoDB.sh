#!/bin/bash


cd Acordaos/ ; ls -1 *.json | sed 's/_acordaos.json$/s/' | while read col; do mongoimport -d projetoRPCW -c $col --jsonArray < $col.json; done