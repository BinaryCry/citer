#!/usr/bin/env bash


#Server
#./node_modules/.bin/babel server.js > out.js
#node out.js

#React
./node_modules/.bin/babel ./web/js/index.jsx > ./web/js/index.js

#LESS
./node_modules/less/bin/lessc ./web/style/index.less > ./web/style/index.css


echo done
