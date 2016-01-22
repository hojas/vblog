'use strict';

module.exports = function(app, router) {
    router.get('/about', function *(next) {
        let self = this;

        yield this.render('page/about.html', {
            currentCat: 'about',
            user: self.session.user
        });

        yield next;
    });
};

