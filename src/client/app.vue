<template>
    <div>
        <HeaderComponent />
        <div class="container">
            <router-view></router-view>
        </div>
        <FooterComponent />
    </div>
</template>

<script>
import HeaderComponent from './components/header.vue';
import FooterComponent from './components/footer.vue';

export default {
    components: {
        HeaderComponent,
        FooterComponent,
    }
}
</script>

