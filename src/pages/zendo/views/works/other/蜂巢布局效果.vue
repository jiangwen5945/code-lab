<script setup>
const baseUrl = import.meta.env.BASE_URL
</script>

<template>
    <div class="page-cell">
        <iframe :src="`${baseUrl}honeycomb.html`" frameborder="0" style="height: 100%;width: 100%;"></iframe>
    </div>
</template>