<!--
核心逻辑：

1. iframe 内嵌页面
   - 通过 import.meta.env.BASE_URL 拼接 honeycomb.html 路径
   - iframe 绝对定位铺满容器，无边框
2. 轻量容器组件
   - 组件本身仅作为承载容器，逻辑在 iframe 内部实现
-->

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