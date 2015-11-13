'use strict';

const nunjucks = require('nunjucks');

module.exports = function(path, opts) {
    let env = nunjucks.configure(path, opts);

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

        yield* next;
    };
};

