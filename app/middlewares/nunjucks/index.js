'use strict';

const nunjucks = require('nunjucks');

module.exports = function(path, opts) {
    let env = nunjucks.configure(path, opts);

    // filter
    // 获取文章概要
    // 前 300 字
    env.addFilter('summary', function(val) {
        if (val.length > 300) {
            return val.substr(0, 300) + '...';
        } else {
            return val;
        }
    });

    return function *(next) {
        this.render = (view, ctx) => {
            return new Promise((resolve, reject) => {
                nunjucks.render(view, ctx, (err, res) => {
                    if (err) {
                        return reject(err);
                    }

                    this.body = res;
                    resolve();
                });
            });
        };

        yield next;
    };
};

