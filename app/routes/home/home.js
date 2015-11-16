module.exports = function(app, router) {
    app.use(router.routes());

    router.get('/', function *(next) {
        yield this.render('home/index.html', {
            title: 'home page'
        });
        yield next;
    });
};

