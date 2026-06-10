<script setup>
const baseUrl = import.meta.env.BASE_URL
</script>

<template>
    <div class="page-cell">
        <iframe :src="`${baseUrl}honeycomb.html`" frameborder="0"></iframe>
    </div>
</template>

<style scoped>
.page-cell {
    position: relative;
}

.page-cell iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
}
</style>