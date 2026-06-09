<template>
    <div class="box-container">
        <div class="lazy-box">异步组件1</div>
        <div class="lazy-box">异步组件1</div>
        <div class="lazy-box">异步组件1</div>
        <div class="lazy-box">异步组件1</div>
        <div class="lazy-box">异步组件1</div>
        <div class="lazy-box">异步组件1</div>
    </div>
</template>

<script setup>


</script>

<style lang="scss" scoped>
.box-container {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

.lazy-box {
    width: 90%;
    height: 200px;
    background: teal;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: #fff;
    margin: 20px 0;
    border-radius: 20px;
}
</style>