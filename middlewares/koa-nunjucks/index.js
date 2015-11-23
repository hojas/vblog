'use strict';

const nunjucks = require('nunjucks');

module.exports = function(path, opts) {
    let env = nunjucks.configure(path, opts);

    env.addFilter('summary', function(val) {
        if (val.length > 300) {
            return val.substr(0, 300) + '...';
        } else {
            return val;
        }
    });

    return function *(next) {
        var self = this;

        this.render = function(view, ctx) {
            return new Promise(function(resolve, reject) {
                nunjucks.render(view, ctx, function(err, res) {
                    if (err) {
                        return reject(err);
                    }

                    self.body = res;
                    resolve();
                });
            });
        };

        yield next;
    };
};

