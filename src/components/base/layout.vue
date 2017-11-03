<template>
    <div class="layout">
        <header-component></header-component>
        <div class="container">
            <div class="row">
                <div class="col-9">
                    <slot name="body"></slot>
                </div>
                <div class="col-3">
                    <slot name="side"></slot>
                </div>
            </div>
        </div>
        <footer-component></footer-component>
    </div>
</template>

<script>
import header from './header.vue'
import footer from './footer.vue'

export default {
    components: {
        'header-component': header,
        'footer-component': footer,
    }
}
</script>

<style scoped>
.container {
    margin: 20px auto;
}
</style>
