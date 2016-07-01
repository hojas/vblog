import Category from '../models/category';
import Post from '../models/post';
import Tag from '../models/tag';

// 分类下的文章
const category = function *(next) {
    let cateUrl = this.params.cate;
    let page = this.params.page;
    let ptitle;

    yield Category.findByUrl(cateUrl).then(cate => {
        ptitle = cate.name;
        return Post.findByCate(cate, page);
    }).then(res => {
        return this.render('post/index.html', {
            ptitle: ptitle,
            currentCate: cateUrl,
            pagination: res,
            user: this.session.user,
        });
    }).catch(() => {
        return next;
    });

    yield next;
};

// 文章详情
const article = function *(next) {
    let id = this.params.id;

    yield Post.findById(id).then(post => {
        return post.increaseViews();
    }).then(post => {
        return this.render('post/details.html', {
            ptitle: post.title,
            currentCate: post.category.url,
            currentCateName: post.category.name,
            post: post,
            user: this.session.user,
        });
    }).catch(() => {
        return next;
    });

    yield next;
};

// 标签下的文章
const tag = function *(next) {
    let tag = this.params.tag;
    let page = this.params.page;

    yield Post.findByTag(tag, page).then(res => {
        return this.render('post/tag.html', {
            ptitle: tag,
            tag: tag,
            pagination: res,
            user: this.session.user,
        });
    }).catch(() => {
        return next;
    });

    yield next;
};

// 发表新文章
const newArticleGet = function *(next) {
    if (!this.session.user) {
        return next;
    }

    yield Category.findAll().then(cates => {
        return this.render('post/new.html', {
            ptitle: '写文章',
            cates: cates,
            user: this.session.user,
        });
    }).catch(() => {
        return next;
    });

    yield next;
};
const newArticlePost = function *(next) {
    if (!this.session.user) {
        return next;
    }

    let body = this.request.body.post;
    let tags = body.tags.split(/\s*,\s*/);
    let category = body.category.split(',');

    category = { name: category[0], url: category[1] }

    let post = new Post({
        id: 0,
        title: body.title,
        content: body.content,
        author: this.session.user.username,
        category: category,
        tags: tags,
    });

    yield Post.postCounts().then(count => {
        post.id = count + 1;
        return post.add();
    }).then(post => {
        return this.body = { next: `/${post.id}.html` };
    }).catch(() => {
        return next;
    });

    yield next;
};
const editArticleGet = function *(next) {
    if (!this.session.user) {
        return next;
    }

    let id = this.params.id;
    let oPost;

    yield Post.findById(id).then(post => {
        oPost = post;
        return Category.findAll();
    }).then(cates => {
        return this.render('post/new.html', {
            ptitle: oPost.title,
            cates: cates,
            post: oPost,
            user: this.session.user,
        });
    }).catch(() => {
        return next;
    });

    yield next;
};
const editArticlePost = function *(next) {
    if (!this.session.user) {
        return next;
    }

    let id = this.params.id;
    let update = this.request.body.post;
    let category = update.category.split(',');

    update.tags = update.tags.split(/\s*,\s*/);
    update.category = { name: category[0], url: category[1] }

    yield Post.findById(id).then(post => {
        return post.update(update);
    }).then(post => {
        return this.body = { next: '/' + post.id + '.html' };
    }).catch(() => {
        return next;
    });

    return next;
};

export default {
    category,
    article,
    tag,
    newArticleGet,
    newArticlePost,
    editArticleGet,
    editArticlePost,
}

