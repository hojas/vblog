import Category from '../models/category';
import Post from '../models/post';
import Tag from '../models/tag';

// 分类下的文章
export const category = function *(next) {
    let self = this;
    let catUrl = this.params.cat;
    let ptitle;

    yield Category.findByUrl(catUrl).then(cat => {
        ptitle = cat.name;
        return Post.findByCat(cat);
    }).then(posts => {
        return self.render('post/index.html', {
            ptitle: ptitle,
            currentCat: catUrl,
            posts: posts,
            user: self.session.user,
        });
    }).catch(() => {
        return next;
    });

    yield next;
};

// 文章详情
export const article = function *(next) {
    let self = this;
    let id = this.params.id;

    yield Post.findById(id).then(post => {
        return post.increaseViews();
    }).then(function(post) {
        return self.render('post/details.html', {
            ptitle: post.title,
            currentCat: post.category.url,
            post: post,
            user: self.session.user,
        });
    }).catch(() => {
        return next;
    });

    yield next;
};

// 标签下的文章
export const tag = function *(next) {
    let self = this;
    let tag = this.params.tag;

    yield Post.findByTag(tag).then(posts => {
        return self.render('post/tag.html', {
            ptitle: tag,
            tag: tag,
            posts: posts,
            user: self.session.user,
        });
    }).catch(() => {
        return next;
    });

    yield next;
};
// 发表新文章
export const newArticle = function *(next) {
    if (! this.session.user) {
        return next;
    }

    let self = this;

    yield Category.findAll().then(function(cats) {
        return self.render('post/new.html', {
            ptitle: '写文章',
            cats: cats,
            user: self.session.user,
        });
    }, function() {
        return next;
    });

    yield next;
};
export const newArticlePost = function *(next) {
    if (! this.session.user) {
        return next;
    }

    let self = this;
    let body = this.request.body.post;
    let tags = body.tags.split(/\s*,\s*/);
    let category = body.category.split(',');

    category = { name: category[0], url: category[1] }

    let post = new Post({
        id: 0,
        title: body.title,
        content: body.content,
        author: self.session.user.username,
        category: category,
        tags: tags,
    });

    yield Post.postCounts().then(function(count) {
        post.id = count + 1;
        return post.add();
    }).then(function(post) {
        return self.body = { next: '/' + post.id + '.html' };
    }).catch(function() {
        return next;
    });

    yield next;
};
export const editArticle = function *(next) {
    if (! this.session.user) {
        return next;
    }

    let self = this;
    let id = this.params.id;
    let oPost;

    yield Post.findById(id).then(function(post) {
        oPost = post;
        return Category.findAll();
    }).then(function(cats) {
        return self.render('post/new.html', {
            ptitle: oPost.title,
            cats: cats,
            post: oPost,
            user: self.session.user,
        });
    }).catch(function() {
        return next;
    });

    yield next;
};
export const editArticlePost = function *(next) {
    if (! this.session.user) {
        return next;
    }

    let self = this;
    let id = this.params.id;
    let update = this.request.body.post;
    let category = update.category.split(',');

    update.tags = update.tags.split(/\s*,\s*/);
    update.category = { name: category[0], url: category[1] }

    yield Post.findById(id).then(function(post) {
        return post.update(update);
    }).then(function(post) {
        return self.body = { next: '/' + post.id + '.html' };
    }).catch(function() {
        return next;
    });

    return next;
};

