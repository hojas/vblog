<template>
<nav v-if="pages > 1">
    <ul class="pagination">
        <li :class="{ disabled: !hasPrev }">
            <a v-if="hasPrev" :href="`${urlPrefix}${page-1}`" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
            <a v-else aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
        <li v-if="page > 7"><a :href="`${urlPrefix}1`">1</a></li>
        <li v-if="page > 7"><a>...</a></li>

        <li v-if="prevPages.length" v-for="p in prevPages"><a :href="`${urlPrefix}${p}`">{{ p }}</a></li>
        <li class="active"><a :href="`${urlPrefix}${page}`">{{ page }}</a></li>
        <li v-if="nextPages.length" v-for="p in nextPages"><a :href="`${urlPrefix}${p}`">{{ p }}</a></li>

        <li v-if="pages - page > 6"><a>...</a></li>
        <li v-if="page - page > 6"><a :href="`${urlPrefix}${pages}`">{{ pages }}</a></li>
        <li :class="{ disabled: !hasNext }">
            <a v-if="hasNext" :href="`${urlPrefix}${pages}`" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
            <a v-else aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    </ul>
</nav>
</template>

<script>
import { range } from 'lodash';

export default {
    data() {
        return {
            urlPrefix: '/page/',
            total: 0,
            page: 1,
            pages: 1,
            hasPrev: false,
            hasNext: false,
            prevPages: [],
            nextPages: [],
        };
    },
    created() {
        let data = $('#pagination').data();
        this.total = data.total;
        this.page = data.page;
        this.pages = data.pages;

        if (this.page === 1) {
            this.hasPrev = false;
        } else {
            this.hasPrev = true;
        }
        if (this.page === this.pages) {
            this.hasNext = false;
        } else {
            this.hasNext = true;
        }

        let pathname = window.location.pathname;
        if (/\/$/.test(pathname)) {
            pathname = pathname.slice(0, -1);
        }
        if (/page/.test(pathname)) {
            this.urlPrefix = window.location.pathname.replace(/\d+$/, '');
        } else {
            this.urlPrefix = pathname + '/page/';
        }

        this.prevPages = range(Math.max(1, this.page - 5), this.page);
        this.nextPages = range(this.page + 1, Math.min(this.pages + 1, this.page + 6));
    },
}
</script>

<style scoped>
</style>

