@ECHO off
REM Start MongoDB 
echo Starting MongoDB daemon
REM start mongo 
start /b mongo\mongod
REM Wait 5 seconds
timeout 5 >nul
REM Import data to collections from file
echo Importing Data to  collection from  file
mongo\mongoimport --db Shauli --collection Posts --type json --file server\model\Posts.json --jsonArray
mongo\mongoimport --db Shauli --collection Comments --type json --file server\model\Comments.json --jsonArray
mongo\mongoimport --db Shauli --collection Locations --type json --file server\model\Locations.json --jsonArray
mongo\mongoimport --db Shauli --collection Users --type json --file server\model\Users.json --jsonArray
REM Change to Node.JS project dir and start server
echo Starting Node.JS server on port 8080.. 
cd server
start /b node server.js > node_server.log
REM Open Chrome browser for screen number 1
echo Opening browser
start chrome.exe http://localhost:8080