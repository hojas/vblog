# vblog

A simple blog build with Koa and Vue.

## Requirements

1. Node.js v10.x
2. MongoDB
3. Koa.js
4. Vue
5. nuxt
6. Docker
7. ...

## Deploy

1. Clone project: `git clone https://github.com/hojas/vblog.git`
2. Build client in app dir: `$ npm run build`
3. Build server in server dir: `$ npm run build`
4. Install docker and docker-compose, [read more](https://www.docker.com/)
5. Run docker service: `sudo service docker start`
6. Build docker image in docker dir: `docker-compose build`
7. Run app in docker: `docker-compose up -d`
