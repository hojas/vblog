
# kblog

A simple blog build with Koa. Markdown and syntax highlight supported.

## Requirements

1. Node.js (4.4.x or 6.2.x)
2. Mongodb

## Deploy:

1. Clone project: `git clone https://github.com/hojas/kblog.git`

2. Install npm packages: `npm install` (under dir `kblog/`)

3. Install gulp: `sudo npm install -g gulp`

4. Build JavaScript and css: `gulp` (under dir `kblog/`)

5. Install pm2: `sudo npm install -g pm2`

6. Run app with pm2: `pm2 start pm2.json` (under dir `kblog/`)

7. Check app running: `pm2 list`

8. Install nginx

9. Copy `kblog/nginx.conf` to `/etc/nginx/conf.d/`

10. Restart nginx: `sudo service nginx restart`

TODO:

- Templates management
