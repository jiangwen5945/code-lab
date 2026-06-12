<!--
核心逻辑：

1. 组件级懒加载
   - IntersectionObserver 监听非首屏容器进入视口
   - defineAsyncComponent 动态导入子组件
2. 延时渲染策略
   - 进入视口后延迟 3 秒再渲染组件
   - 两个非首屏区域独立观察和渲染
-->
<template>
    <div class="page-cell">
        <div class="box">
            首屏内容
            <div class="sync-item">同步组件</div>
            <div class="sync-item">同步组件</div>
            <div class="sync-item">同步组件</div>
            <div class="sync-item">同步组件</div>
            <div class="sync-item">同步组件</div>
        </div>
        <div class="box" data-box="0" ref="asyncBox1">
            非首屏内容1
            <LazyDemo v-if="isShowBox[0]" />
        </div>
        <div class="box" data-box="1" ref="asyncBox2">
            非首屏内容2
            <LazyDemo2 v-if="isShowBox[1]" />
        </div>
    </div>
</template>

<script setup>
import { defineAsyncComponent, onMounted, reactive, ref } from 'vue';
const LazyDemo = defineAsyncComponent(() => import('../../../components/lazyDemo.vue'))
const LazyDemo2 = defineAsyncComponent(() => import('../../../components/lazyDemo.vue'))
const isShowBox = reactive([
    false, false
])
const asyncBox1 = ref()
const asyncBox2 = ref()

const ob = new IntersectionObserver((entries) => {
    for (const entry of entries) {
        // 出现在视口中
        if (entry.isIntersecting) {
            ob.unobserve(entry.target)
            console.log("Loaded new items", entry.target.dataset.box);
            setTimeout(() => {
                isShowBox[entry.target.dataset.box] = true
            }, 3000)

        }
    }
})

onMounted(() => {
    [asyncBox1, asyncBox2].forEach(e => {
        ob.observe(e.value)
    })
})



ob.observe
</script>

<style lang="scss" scoped>
.box {
    width: 100%;
    font-size: 40px;
    text-align: center;
    min-height: 500px;
    box-sizing: border-box;
    margin-bottom: 80px;
    padding: 20px;
}

.sync-item {
    width: 90%;
    height: 20vh;
    line-height: 20vh;
    background: rgb(35, 166, 253);
    margin: 20px auto;
    border-radius: 20px;
    font-size: 20px;
}
</style>
