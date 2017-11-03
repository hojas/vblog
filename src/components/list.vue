<template>
    <div class="list-group">
        <router-link class="list-group-item list-group-item-action"
            v-for="post in posts"
            :to="'/p/' + post.url + '.html'"
            :key="post.id">{{ post.title }}</router-link>
    </div>
</template>

<script>
export default {
    props: ['posts']
}
</script>

