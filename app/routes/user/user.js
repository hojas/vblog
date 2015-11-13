module.exports = function(app, router) {
    app.use(router.routes());

    router.get('/user', function *(next) {
        this.body = 'user';
        yield next;
    });
};

