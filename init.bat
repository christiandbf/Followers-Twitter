@ECHO off
ECHO Get the followers of an account on Twitter in a JSON file
ECHO Made by Christian Barrios
PAUSE

set /p input=Insert screen name: 
echo the account is @%input%
pause 

@ECHO on
node index.js %input%

@ECHO off
pause