'use strict';

module.exports = function(app, router) {
    // 独立页面
    router.get('/about', function *(next) {
        yield this.render('page/about.html', {
            currentCat: 'about',
        });
        yield next;
    });
};

/*
var fs = require('fs');
module.exports = function(app, router) {
    // 独立页面
    router.get('/page/:path', function *(next) {
        let self = this;
        let path = this.params.path;

        let files = new Promise(function(resolve, reject) {
            fs.readdir('../views/page', function(err, files) {
                if (err) {
                    reject(err);
                } else {
                    resolve(files);
                }
            });
        });

        yield files.then(function(files) {
            if (files.indexOf(path) > -1) {
                return self.render(`page/${path}.html`, {
                    user: self.session.user,
                });
            } else {
                return next;
            }
        });


        yield next;
    });
};
*/

