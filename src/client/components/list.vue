<template>
    <div class="list-group">
        <router-link v-for="post in posts" :to="post.url + '.html'"
            class="list-group-item">{{ post.title }}</router-link>
    </div>
</template>

<script>
export default {
    props: ['posts'],
}
</script>

