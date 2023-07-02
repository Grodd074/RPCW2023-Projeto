#!/bin/bash


cd Acordaos/ ; ls -1 *.json | sed 's/_acordao\(s\).json$/\1/' | while read col; do mongoimport -d projetoRPCW -c $col --jsonArray < $col.json; done