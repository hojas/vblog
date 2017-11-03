<template>
    <div class="container">
        <i class="fa fa-copyright"></i> 2017
        <router-link to="/">前端日志网</router-link>
    </div>
</template>

<style scoped>
.container {
    padding: 20px 0;
    margin-top: 20px;
    font-size: 14px;
    border-top: solid 1px #eee;

    & a {
        color: #666;

        &:hover,
        &:focus {
            color: #000;
            text-decoration: none;
        }
    }
}
</style>

