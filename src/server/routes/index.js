import Router from 'koa-router'
import createApi from '../api'

export default function(app) {
    const router = new Router()

    createApi(router)

    router.get('*', async (ctx, next) => {
        ctx.body = `
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <title>kblog</title>

                    <link href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
                    <link href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
                    <link href="/dist/styles.css" ref="stylesheet">

                    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
                    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
                    <!--[if lt IE 9]>
                        <script src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>
                        <script src="https://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
                    <![endif]-->
                </head>
                <body>
                    <div id="app"></div>
                    <script src="/dist/manifest.js"></script>
                    <script src="/dist/vendor.js"></script>
                    <script src="/dist/app.js"></script>
                </body>
            </html>
        `
    })

    app.use(router.routes()).use(router.allowedMethods())
}
