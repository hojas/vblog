<template>
    <layout-component>
        <template slot="body">
            404, 您访问的页面不存在！
        </template>
    </layout-component>
</template>

<script>
import layout from '../components/base/layout.vue';

export default {
    components: {
        'layout-component': layout,
    },
}
</script>
