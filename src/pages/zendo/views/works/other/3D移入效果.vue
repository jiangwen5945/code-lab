<!--
核心逻辑：

1. 鼠标跟踪 3D 旋转
   - 监听 card 的 mousemove 事件，获取 offsetX/offsetY
   - 线性映射到 rotateX/rotateY 角度 (-10°~10°)
   - 通过 CSS 自定义属性 --rx/--ry 动态应用变换
2. Perspective 透视效果
   - transform: perspective(500px) 实现 3D 景深感
   - mouseleave 时归零角度恢复平面
3. 自定义指令 v-hover3d
   - 封装复用逻辑，支持多卡片同时使用
   - 多尺寸卡片演示效果一致性
-->
<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const card = ref(null)
const yRange = [-10, 10]
const xRange = [-10, 10]

// 辅助函数：计算rotate旋转角度
const getRotate = (range, value, max) => {
    return (value / max) * (range[1] - range[0]) + range[0]
}
onMounted(() => {
    card.value.onmousemove = e => {
        const { offsetX, offsetY } = e;
        const { offsetWidth, offsetHeight } = card.value
        const ry = -getRotate(yRange, offsetX, offsetWidth)
        const rx = getRotate(xRange, offsetY, offsetHeight)
        card.value.style.setProperty('--rx', `${rx}deg`)
        card.value.style.setProperty('--ry', `${ry}deg`)
    }

    card.value.onmouseleave = e => {
        card.value.style.setProperty('--rx', '0deg')
        card.value.style.setProperty('--ry', '0deg')
    }
})

onUnmounted(() => {
    // card.value.onmousemove = null
    // card.value.onmouseleave = null
})

// 引入图片方法
const requireImg = (path) => {
    return new URL(`${path}`, import.meta.url).href
}

</script>


<template>
    <div class="page-cell  flex-cc">
        <div class="card" ref="card">
            <img src="/src/pages/zendo/assets/imgs/p6.png" alt="">
        </div>
        <div class="card1" v-hover3d>
            <img src="../../../assets/imgs/p6.png" alt="">
        </div>

        <div class="card2" v-hover3d>
            <img src="../../../assets/imgs/p6.png" alt="">
        </div>
    </div>
</template>
<style scoped lang="scss">
.card {
    width: 400px;
    border-radius: 10px;
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
    transition: all 0.3s linear;
    transform: perspective(500px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));

    &:hover {
        box-shadow: rgb(0, 123, 253) 0px 20px 30px -10px;
    }

    img {
        border-radius: inherit;
        width: 100%;
        height: auto;
        vertical-align: top;
    }
}

.card1 {
    width: 200px;
    margin-left: 50px;
    border-radius: 10px;
    box-shadow: rgb(38, 57, 77) 0px 10px 15px -5px;

    &:hover {
        box-shadow: rgb(208, 249, 0) 0px 10px 15px -5px;
    }

    img {
        border-radius: inherit;
        width: 100%;
        vertical-align: top;
    }
}

.card2 {
    width: 100px;
    margin-left: 50px;
    border-radius: 10px;
    box-shadow: rgb(38, 57, 77) 0px 5px 8px -3px;

    &:hover {
        box-shadow: rgb(98, 1, 255) 0px 5px 8px -3px;
    }

    img {
        border-radius: inherit;
        width: 100%;
        vertical-align: top;
    }
}
</style>
