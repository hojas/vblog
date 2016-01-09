
# kblog

A simple blog build with Koajs.

Deploy:

Should install `nginx` first. If not, have to listen port 80 in `app.js`, and run pm2 by root user. Then copy `nginx.conf` to `/etc/nginx/conf.d`, and include `nginx.conf` file in `/etc/nginx/nginx.conf`:

Open `/etc/nginx/nginx.conf`, and fix

```
    include /etc/nginx/conf.d/*.conf;
```

to

```
    include /etc/nginx/conf.d/nginx.conf;
```

Run pm2:

```
$ pm2 start pm2.json
```

TODO:

- Templates management
