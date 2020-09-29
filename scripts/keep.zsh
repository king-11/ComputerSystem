#!/bin/zsh

x=1
while [ $x -eq 1 ]
do
python3 randomize.py 
x=$?
done
