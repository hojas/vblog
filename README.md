# kblog

A simple blog build with Koa and Vue. Server is here: [blog-server](https://github.com/hojas/blog-server)

Markdown and syntax highlight supported.

## Requirements

1. Node.js 8.x
2. MongoDB
3. Koa.js
4. Vue
5. Babel
6. Webpack
7. Docker
8. ...

## Deploy

1. Clone project: `git clone https://github.com/hojas/kblog.git`
1. Build : `$ npm run build:prod`
2. Install docker and docker-compose, [read more](https://www.docker.com/)
3. Run docker service: `sudo service docker start`
3. Build docker image: `docker-compose build`
4. Run app in docker: `docker-compose up -d`

