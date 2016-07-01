import Post from '../models/post';
import Category from '../models/category';
import Tag from '../models/tag';

const about = function *(next) {
    yield this.render('page/about.html', {
        ptitle: '关于',
        currentCate: 'about',
        user: this.session.user,
    });

    yield next;
};

const sitemap = function *(next) {
    let oPosts;
    let oTags;
    let pages = [{
        title: '关于',
        url: '/about',
    }];

    yield Post.findByCate().then(res => {
        oPosts = res.docs;
        return Tag.findAll();
    }).then(tags => {
        oTags = tags;
        return Category.findAll();
    }).then(cates => {
        return this.render('page/sitemap.html', {
            ptitle: '网站地图',
            posts: oPosts,
            cates: cates,
            pages: pages,
            tags: oTags,
        });
    }).catch(() => {
        return next;
    });

    yield next;
};

const nav = function *(next) {
    yield this.render('page/nav.html', {
        ptitle: '搜索',
    });

    yield next;
}

export default {
    about,
    sitemap,
    nav,
};

